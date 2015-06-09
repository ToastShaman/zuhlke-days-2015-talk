'use strict';

var gulp = require('gulp');
var paths = require('./gulp-tasks/config.js').paths;
var browserSync = require('browser-sync');

gulp.task('fonts', require('./gulp-tasks/fonts.js')(gulp));
gulp.task('images', require('./gulp-tasks/images.js')(gulp));
gulp.task('jquery', require('./gulp-tasks/jquery.js')(gulp));
gulp.task('vendor', require('./gulp-tasks/vendor.js')(gulp));
gulp.task('minify-html', require('./gulp-tasks/html.js')(gulp));
gulp.task('less', require('./gulp-tasks/less.js')(gulp));
gulp.task('build', require('./gulp-tasks/build.js')(gulp));
gulp.task('js-watch', ['build'], browserSync.reload);
gulp.task('less-watch', ['less'], browserSync.reload);
gulp.task('build-all', ['vendor', 'build', 'less', 'minify-html', 'fonts', 'images', 'jquery']);
gulp.task('default', ['serve']);

gulp.task('serve', ['build-all'], function() {
  browserSync({
    server: './dist',
    browser: "google chrome",
    notify: false,
    minify: false,
    open: false
  });
  gulp.watch(paths.js.watch, ['js-watch']);
  gulp.watch(paths.less.watch, ['less-watch']);
});

gulp.task('test', function(done) {
  var karma = require('karma').server;
  karma.start({
    configFile: __dirname + '/test/karma.conf.js',
    singleRun: true
  }, done);
});