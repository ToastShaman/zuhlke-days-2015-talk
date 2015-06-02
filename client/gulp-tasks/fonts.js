var config = require('./config.js');
var paths = config.paths;

module.exports = function(gulp) {
  return function() {
    paths.fonts.src.forEach(function(src) {
      gulp.src(src).pipe(gulp.dest(paths.fonts.dest));
    });
  }
};