'use strict';
var gulp = require('gulp');
var browserify = require('browserify');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var minifyHTML = require('gulp-minify-html');
var browserSync = require('browser-sync');

var libs = [
    'jqlite',
    'crossroads',
    'ractive',
    'hasher',
    'lodash',
    'preconditions',
    'signals',
    'rsvp'
];

gulp.task('vendor', function () {
    var b = browserify({
        debug: true,
        require: libs
    });

    return b.bundle()
        .on('error', gutil.log)
        .pipe(source('vendors.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('minify-html', function () {
    return gulp.src('./client/index.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('build', function () {
    var ractivate = require('ractivate');
    var babelify = require('babelify');
    var b = browserify({
        debug: true
    });

    libs.forEach(function (lib) {
        b.external(lib);
    });

    b.add('./client/js/app.es6');
    b.transform({
        extensions: ['.ract']
    }, ractivate);
    b.transform({
        extensions: ['.es6']
    }, babelify);

    return b.bundle()
        .on('error', gutil.log)
        .pipe(source('app.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('js-watch', ['build'], browserSync.reload);

gulp.task('serve', function () {
    browserSync({
        server: './dist'
    });
    gulp.watch(['./client/**/*.es6', './client/**/*.ract'], ['js-watch']);
});

gulp.task('default', ['vendor', 'build', 'minify-html', 'serve']);