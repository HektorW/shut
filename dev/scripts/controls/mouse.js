define([
  'dom',
  'underscore',
  'controls/controls'
], function($, _, Controls) {

  var Mouse = Controls.extend({
    __init__: function() {
      this.supr();

      this.bindEvents();
    },

    bindEvents: function() {
      this.$window = $(window);

      _.bindAll(this, 
        'mouseup',
        'mousedown',
        'mousemove',
        'contextmenu'
      );

      this.$window
        .on('mouseup', this.mouseup)
        .on('mousedown', this.mousedown)
        .on('mousemove', this.mousemove)
        .on('contextmenu', this.contextmenu);
    },

    mouseup: function(event) {
      event.preventDefault();

      this.trigger('mouse:up', {
        x: event.pageX,
        y: event.pageY
      });
    },
    mousedown: function(event) {
      event.preventDefault();

      this.trigger('mouse:down', {
        x: event.pageX,
        y: event.pageY
      });
    },
    mousemove: function(event) {
      event.preventDefault();

      this.trigger('mouse:move', {
        x: event.pageX,
        y: event.pageY
      });
    },

    contextmenu: function(event) {
      event.preventDefault();
    }

  });


  return Mouse;
});