define([
  'dom',
  'underscore',
  'controls/controls',
], function(
  $,
  _,
  Controls
  ) {

  var Keyboard = Controls.extend({

    // vars
    $window: null,
    //------

    // functions
    __init__: function() {
      this.supr();

      this.bindEvents();
    },

    bindEvents: function() {
      this.$window = $(window);
      
      _.bindAll(this,
        'keyup',
        'keydown'
      );

      this.$window
        .on('keyup', this.keyup)
        .on('keydown', this.keydown);
    },


    // event listeners
    keydown: function(event) {

    },
    keyup: function(event) {

    }
  });

  return Keyboard;
});