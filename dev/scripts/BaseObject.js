define([
  'classy'
], function(Classy) {
  var GameObject = Classy({
    // Vars
    _active: false,


    // Methods
    activate: function() {
      this._active = true;
    },

    deactivate: function() {
      this._active = false;
    },

    update: function(time) {},  

    draw: function() {}
  });

  return GameObject;
})