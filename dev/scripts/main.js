/**
 * Main entry point of app
 * configures and creates an app
 */

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
    // jquery: '../bower_components/jquery/jquery',
    underscore: '../bower_components/underscore/underscore',
    // threejs: '../bower_components/threejs/build/three',
    threejs: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r71/three',

    // own
    classy: '../libs/Classy/src/classy',
    events: '../libs/events/dev/scripts/events',
    dom: '../libs/HeQuery/src/HeQuery',

    // text: '../bower_components/requirejs-text/text',
    // templates: '../templates'
  }
});

require([
  'dom',
  'app'
], function($, App) {

  // DEBUG
  window.DEBUG = (function(){
    var _slice = [].slice;

    var $e = $('<div>');
    $e.css({
      position: 'fixed',
      left: '10px',
      top: '10px',
      fontFamily: 'monospace'
    });
    $e.attr('id', 'debug');
    $(document.body).append($e);

    var d = function(id, message) {
      if(message === undefined) {
        message = id;
        id = null;
      }

      if(id) {
        var name = id;
        id = id.replace(' ', '-');
        var $id = $e.find('#'+id);
        if(!$id.length) {
          var $temp = $('<p>'+name+': <span id="'+id+'"></span></p>');
          $e.append($temp);
          $id = $temp.find('#'+id);
        }
        message = _slice.call(arguments, 1).join(', ');
        $id.html(message);
      } else {
        $e.append('<p>'+message+'</p>');
      }
    };

    return d;
  }());

  window.app = new App().init();

  // window.DEBUG('Initialized');
  window.DEBUG('Move: [w, a, s, d]');
  window.DEBUG('Shoot: [left mouse]');
  window.DEBUG('Change: [1, 2, 3]');

});

