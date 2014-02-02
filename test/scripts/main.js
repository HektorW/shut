require.config({
  shim: {
    threejs: {
      exports: 'THREE'
    }
  },

  paths: {
    dev: '../../dev/',
    vendor: 'dev/bower_components/',

    mocha: '../bower_components/mocha/mocha',
    chai: '../bower_components/chai/chai'
  }
});

require(['tests'], function(tests) {

  tests.run();

});