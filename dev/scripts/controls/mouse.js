define([
  'dom',
  'underscore',
  'threejs',
  'controls/controls'
], function($, _, Three, Controls) {

  var Mouse = Controls.extend({

    // vars
    x: -1,
    y: -1,

    // methods
    __init__: function() {
      this.supr();
    },

    init: function () {
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

      this.x = event.pageX;
      this.y = event.pageY;

      this.trigger('mouse:up', {
        x: this.x,
        y: this.y
      });
    },
    mousedown: function(event) {
      event.preventDefault();

      this.x = event.pageX;
      this.y = event.pageY;

      this.trigger('mouse:down', {
        x: this.x,
        y: this.y
      });
    },
    mousemove: function(event) {
      event.preventDefault();

      this.x = event.pageX;
      this.y = event.pageY;

      this.trigger('mouse:move', {
        x: this.x,
        y: this.y
      });
      // this.triggerDirection(event.pageX, event.pageY);
    },
    contextmenu: function(event) {
      event.preventDefault();
    },

    triggerDirection: function(mouseX, mouseY) {
      var ox = this._baseObject.instance.position.x;
      var oy = this._baseObject.instance.position.y;

      ox = window.innerWidth / 2;
      oy = window.innerHeight / 2;

      var v = new Three.Vector2(
        mouseX - ox,
        mouseY - oy
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


  return new Mouse();
});