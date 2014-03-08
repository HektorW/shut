define([
	'threejs',
	'underscore',

	'events',
	'classy'
], function(Three, _, Events, Classy) {


	var BaseObject = Classy.extend({
		// Vars
		_active: null,

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

		update: function() {},

		draw: function() {
			// calculate some world matrix
			// and update animations
		},


		// retuns an object with our collisionbounds
		getCollisionBounds: function() {
			return {};
		},


		onHit: function( /*other*/ ) {
			// called when colliding with other object
		}

	});

	// Events
	_.extend(BaseObject.prototype, Events);


	return BaseObject;
});