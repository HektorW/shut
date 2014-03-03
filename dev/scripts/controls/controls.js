define([
  'underscore',
  'classy',
  'events'
], function(
  _,
  Classy,
  Events
) {

  var Controls = Classy.extend({

    pressedDuration: {},
    lastPressedDuration: {},

    __init__: function() {},

    init: function(game) {
      this.game = game;
    },

    update: function() {


      _.each(this.pressedDuration, function(value, key) {
        this.lastPressedDuration[key] = value;
      }, this);

    },

    // return true if buttons is currently down
    isButtonDown: function(btn) {
      return this.pressedDuration[btn] > 0.0;
    },

    isButtonDownLast: function(btn) {
      return this.lastPressedDuration[btn] > 0.0;
    },

    // return true if button is up but was down last frame
    isButtonPressed: function(btn) {
      return !this.isButtonDown(btn) && this.isButtonDownLast(btn);
    },

    buttonDownDuration: function(btn) {
      var t = this.pressedDuration[btn];
      return t > 0.0 ? performance.now() - t : 0.0;
    }

  });
  _.extend(Controls.prototype, Events);

  return Controls;

});