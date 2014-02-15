
require.config({
  shim: {
    threejs: {
      exports: 'THREE'
    },
    underscore: {
      exports: '_'
    }
  },

  paths: {
    jquery: '../bower_components/jquery/jquery',
    underscore: '../bower_components/underscore/underscore',
    threejs: '../bower_components/threejs/build/three',

    // own
    classy: '../libs/Classy.js/src/classy',
    events: '../libs/events/dev/scripts/events',
    dom: '../libs/HeQuery/src/HeQuery',

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

