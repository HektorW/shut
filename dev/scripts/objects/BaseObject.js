define([
	'threejs',
	'classy'
], function(Three, Classy) {


	var BaseObject = Classy.extend({
		// Vars
		_active: false,

		// Methods
		__init__: function(game) {
			this.game = game;
			this.activate();
		},

		activate: function() {
			this._active = true;
		},

		deactivate: function() {
			this._active = false;
		},

		update: function() {
		},

		draw: function() {
			// calculate some world matrix
			// and update animations
		}
	});

	return BaseObject;
});