define([
	'threejs',
	'classy'
], function(Three, Classy) {
	var Camera = Classy.extend({

		__init__: function() {
			this.camera = new Three.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
			this.camera.position.z = 7.0;
		},

		update: function(time) {}
	});

	return Camera;
});