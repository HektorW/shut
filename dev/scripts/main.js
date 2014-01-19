
require.config({

  paths: {
    jquery: '../bower_components/jquery/jquery',
    underscore: '../bower_components/underscore/underscore',
    threejs: '../bower_components/threejs/threejs',

    classy: '../libs/Classy.js/src',

    text: '../bower_components/requirejs-text/text',
    templates: '../templates'
  }
});

require([
  'app'
], function(App) {
  new App();
});

