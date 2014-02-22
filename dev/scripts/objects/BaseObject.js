define([
	'threejs',
	'classy',
	'util/color'
], function(Three, Classy, Color) {


	var BaseObject = Classy.extend({
		// Vars
		_active: false,

		// Methods
		__init__: function(game) {
			this.game = game;
		},

		activate: function() {
			this._active = true;
		},

		deactivate: function() {
			this._active = false;
		},

		update: function(time) {
		},

		draw: function() {
			// calculate some world matrix
			// and update animations
		}
	});

	return BaseObject;
});