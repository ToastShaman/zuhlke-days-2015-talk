var minifyHTML = require('gulp-minify-html');

var config = require('./config.js');
var paths = config.paths;

module.exports = function(gulp) {
  return function() {
    return gulp.src(paths.html.src)
      .pipe(minifyHTML())
      .pipe(gulp.dest(paths.html.dest));
  };
};