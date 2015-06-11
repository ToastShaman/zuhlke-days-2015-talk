var jshint = require('gulp-jshint');
var gulp   = require('gulp');

module.exports = function(gulp) {
  return function() {
    return gulp.src('./src/**/*.es6')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
    }
};
