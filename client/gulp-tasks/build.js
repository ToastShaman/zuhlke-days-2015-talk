var ractivate = require('ractivate');
var babelify = require('babelify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');

var config = require('./config.js');
var libs = config.libs;
var paths = config.paths;
var environment = gutil.env.env ? gutil.env.env : 'dev';
var isProduction = environment === 'production';

module.exports = function(gulp) {
  return function() {
    var b = browserify({
      debug: true
    });

    libs.forEach(function(lib) {
      b.external(lib);
    });

    b.add(paths.js.src);
    b.require('./config-' + environment + '.es6', {expose: 'configuration'});
    b.transform({extensions: ['.ract']}, ractivate);
    b.transform({extensions: ['.es6']}, babelify);

    return b.bundle()
      .on('error', gutil.log)
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(gulpif(isProduction, uglify()))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.js.dest));
  }
};