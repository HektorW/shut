define([
	'threejs',
	'classy',
	'util/color'
], function(Three, Classy, Color) {


	var BaseObject = Classy.extend({
		// Vars
		_active: false,

		// Methods
		__init__: function() {

			var geometry = new Three.CubeGeometry(1, 1, 1);
			var material = new Three.MeshPhongMaterial({
				color: Color.orange
			});
			
			this.instance = new Three.Mesh(geometry, material);
		},

		activate: function() {
			this._active = true;
		},

		deactivate: function() {
			this._active = false;
		},

		update: function( /*time*/ ) {},

		draw: function() {}
	});

	return BaseObject;
});