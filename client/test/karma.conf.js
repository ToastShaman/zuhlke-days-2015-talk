module.exports = function(config) {
  'use strict';

  config.set({
    basePath: '',

    frameworks: ['browserify', 'jasmine'],

    preprocessors: {
      '../src/**/*.es6': ['browserify'],
      'unit/**/*.es6': ['browserify']
    },

    browserify: {
      debug: true,
      paths: ['../node_modules', '../src/js'],
      transform: [['ractivate', {extensions: ['.ract']}], 'babelify'],
      extensions: ['.ract', '.es6'],
      configure: function(bundle) {
        bundle.on('prebundle', function() {
          bundle.add('../config-dev.es6', {expose: 'configuration'});
        });
      }
    },

    files: [
      '../node_modules/jasmine-ajax/lib/mock-ajax.js',
      '../node_modules/jquery/dist/jquery.min.js',
      '../src/**/*.es6',
      'unit/**/*.es6'
    ],

    exclude: [],

    port: 9876,

    reporters: ['progress'],

    browsers: [
      'PhantomJS'
    ],

    plugins: [
      'karma-phantomjs-launcher',
      'karma-browserify',
      'karma-jasmine'
    ],

    singleRun: false,

    colors: true
  });
};
