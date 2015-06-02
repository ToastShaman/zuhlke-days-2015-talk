var less = require('gulp-less');
var postcss = require('gulp-postcss');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('autoprefixer-core');

var config = require('./config.js');
var paths = config.paths;

module.exports = function(gulp) {
  return function() {
    return gulp.src(paths.less.src)
      .pipe(less({compress: true}))
      .pipe(postcss([autoprefixer({browsers: ['last 2 version']})]))
      .pipe(minifyCSS({keepBreaks: false}))
      .pipe(gulp.dest(paths.less.dest));
  };
};