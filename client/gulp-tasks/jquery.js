var config = require('./config.js');
var paths = config.paths;

module.exports = function(gulp) {
  return function() {
    gulp.src('./node_modules/jquery/dist/jquery.min.js').pipe(gulp.dest(paths.js.dest));
  }
};