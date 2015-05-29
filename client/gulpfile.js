'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var minifyHTML = require('gulp-minify-html');
var browserSync = require('browser-sync');
var karma = require('karma').server;
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var minifyCSS = require('gulp-minify-css');
var less = require('gulp-less');

var libs = [
  'jquery',
  'crossroads',
  'ractive',
  'hasher',
  'lodash',
  'preconditions',
  'signals',
  'rsvp',
  'bootstrap',
  'parsleyjs',
  'store'
];

var paths = {
  js: {
    src: './src/js/app.es6',
    dest: './dist/js/',
    watch: ['./src/**/*.es6', './src/**/*.ract']
  },
  html: {
    src: './src/index.html',
    dest: './dist/'
  },
  fonts: {
    src: ['./node_modules/bootstrap/dist/fonts/*'],
    dest: './dist/fonts/'
  },
  less: {
    src: './src/css/styles.less',
    dest: './dist/css/',
    watch: ['./src/**/*.less']
  },
  test: {
    watch: ['./src/**/*.es6', './src/**/*.ract', './test/unit/**/*.es6']
  }
};

gulp.task('fonts', function() {
  paths.fonts.src.forEach(function(src) {
    gulp.src(src)
      .pipe(gulp.dest(paths.fonts.dest));
  });
});

gulp.task('vendor', function() {
  var b = browserify({
    insertGlobals: true,
    require: libs
  });

  return b.bundle()
    .on('error', gutil.log)
    .pipe(source('vendors.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(paths.js.dest));
});

gulp.task('minify-html', function() {
  return gulp.src(paths.html.src)
    .pipe(minifyHTML())
    .pipe(gulp.dest(paths.html.dest));
});

gulp.task('less', function() {
  return gulp.src(paths.less.src)
    .pipe(less({compress: true}))
    .pipe(postcss([autoprefixer({browsers: ['last 2 version']})]))
    .pipe(minifyCSS({keepBreaks: false}))
    .pipe(gulp.dest(paths.less.dest));
});

gulp.task('build', function() {
  var ractivate = require('ractivate');
  var babelify = require('babelify');
  var b = browserify({
    insertGlobals: true
  });

  libs.forEach(function(lib) {
    b.external(lib);
  });

  b.add(paths.js.src);
  b.transform({extensions: ['.ract']}, ractivate);
  b.transform({extensions: ['.es6']}, babelify);

  return b.bundle()
    .on('error', gutil.log)
    .pipe(source('app.js'))
    //.pipe(streamify(uglify()))
    .pipe(gulp.dest(paths.js.dest));
});

gulp.task('js-watch', ['build'], browserSync.reload);
gulp.task('less-watch', ['less'], browserSync.reload);

gulp.task('serve', ['build-all'], function() {
  browserSync({server: './dist'});
  gulp.watch(paths.js.watch, ['js-watch']);
  gulp.watch(paths.less.watch, ['less-watch']);
});

gulp.task('test', function(done) {
  karma.start({
    configFile: __dirname + '/test/karma.conf.js',
    singleRun: true
  }, done);
  gulp.watch(paths.test.watch, ['test']);
});

gulp.task('build-all', ['vendor', 'build', 'less', 'minify-html', 'fonts']);
gulp.task('default', ['serve']);
