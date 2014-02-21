define([
  'dom',
  'underscore',
  'threejs',
  'controls/controls'
], function($, _, Three, Controls) {

  var Mouse = Controls.extend({
    __init__: function(opt) {
      this.supr(opt);

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
      this.triggerDirection(event.pageX, event.pageY);
    },
    contextmenu: function(event) {
      event.preventDefault();
    },

    triggerDirection: function(mouseX, mouseY) {
      var v = new Three.Vector2(
        mouseX - this._baseObject.instance.position.x,
        mouseY - this._baseObject.instance.position.y
      );
      v.normalize();

      var angle = Math.atan2(v.y, v.x);

      this.trigger('direction', {
        dirX: v.x,
        dirY: v.y,
        angle: angle
      });
    }

  });


  return Mouse;
});