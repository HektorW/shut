
require.config({
  shim: {
    threejs: {
      exports: 'THREE'
    }
  },

  paths: {
    jquery: '../bower_components/jquery/jquery',
    underscore: '../bower_components/underscore/underscore',
    threejs: '../bower_components/threejs/build/three',

    classy: '../libs/Classy.js/src',

    text: '../bower_components/requirejs-text/text',
    templates: '../templates'
  }
});

require([
  'prefixer',
  'app'
], function(Prefixer, App) {

  Prefixer.prefixAll();

  new App().init();
});

