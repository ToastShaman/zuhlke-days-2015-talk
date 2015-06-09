var _ = require('lodash');
var packageJson = require('../package.json');

module.exports.libs = _(packageJson.dependencies)
  .keys()
  .remove(function(n) {
    return n !== 'jquery'
  })
  .value();

module.exports.paths = {
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
  images: {
    src: ['./src/img/*'],
    dest: './dist/img/'
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
