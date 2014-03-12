define([
  'controls/controls'
], function(Controls) {

  var Gamepad = Controls.extend({

    // vars
    lastButtonState: [],
    lastAxesState: [],

    epsilon: 0.2,


    // methods
    __init__: function(opt) {
      this.supr(opt);

      this.connected = false;
    },


    update: function() {
      this.supr();

      var pad = (window.navigator.getGamepads() || {})[0];

      if (pad) {
        this.connected = true;

        var axes = pad.axes;
        this.triggerLeftStick(axes);
        this.triggerRightStick(axes);
        this.triggerButtons(pad.buttons);
      }
    },

    triggerLeftStick: function(axes) {
      var x = axes[AXES.LEFT_ANALOGUE_HOR];
      var y = axes[AXES.LEFT_ANALOGUE_VERT];
      var abs = Math.abs,
        epsilon = this.epsilon;
      if (abs(x) < epsilon)
        x = 0.0;
      if (abs(y) < epsilon)
        y = 0.0;

      // check change
      this.leftX = x;
      this.leftY = y;

      this.trigger('move', {
        dirX: x,
        dirY: y
      });
    },

    triggerRightStick: function(axes) {
      var x = axes[AXES.RIGHT_ANALOGUE_HOR];
      var y = axes[AXES.RIGHT_ANALOGUE_VERT];
      var abs = Math.abs,
        epsilon = this.epsilon;
      if (abs(x) < epsilon)
        x = 0.0;
      if (abs(y) < epsilon)
        y = 0.0;
      var angle = Math.atan2(y, x);

      // check change

      this.trigger('direction', {
        angle: angle,
        dirX: x,
        dirY: y
      });
    },

    triggerButtons: function(buttons) {
      var t = performance.now();

      var i = 0,
        b;
      for (var btn in BUTTONS) {
        b = BUTTONS[btn];
        this.pressedDuration[btn] = buttons[b] > 0.0 ? t : -1;
      }
    },

    getLeftX: function() {
      return this.leftX;
    },

    getLeftY: function() {
      return this.leftY;
    },

    isConnected: function() {
      return this.connected;
    }

  });



  // constants
  var BUTTONS = {
    FACE_1: 0, // Face (main) buttons
    FACE_2: 1,
    FACE_3: 2,
    FACE_4: 3,
    LEFT_SHOULDER: 4, // Top shoulder buttons
    RIGHT_SHOULDER: 5,
    LEFT_SHOULDER_BOTTOM: 6, // Bottom shoulder buttons
    RIGHT_SHOULDER_BOTTOM: 7,
    SELECT: 8,
    START: 9,
    LEFT_ANALOGUE_STICK: 10, // Analogue sticks (if depressible)
    RIGHT_ANALOGUE_STICK: 11,
    PAD_TOP: 12, // Directional (discrete) pad
    PAD_BOTTOM: 13,
    PAD_LEFT: 14,
    PAD_RIGHT: 15
  };

  var AXES = {
    LEFT_ANALOGUE_HOR: 0,
    LEFT_ANALOGUE_VERT: 1,
    RIGHT_ANALOGUE_HOR: 2,
    RIGHT_ANALOGUE_VERT: 3
  };

  return new Gamepad();
});