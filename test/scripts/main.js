require.config({
  shim: {
    mocha: {
      exports: 'mocha'
    }
  },

  paths: {
    dev: '../../dev/',
    vendor: 'dev/bower_components/',

    mocha: '../bower_components/mocha/mocha',
    chai: '../bower_components/chai/chai'
  }
});

require(['mocha', 'tests'], function(mocha, tests) {

  mocha.setup('bdd');

  tests.run();

});