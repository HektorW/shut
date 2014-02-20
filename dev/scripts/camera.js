define([
	'threejs',
	'classy'
], function(Three, Classy) {
	var Camera = Classy.extend({

		__init__: function() {
			var w = window.innerWidth / 100;
			var h = window.innerHeight / 100;

			// this.camera = new Three.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
			this.camera = new Three.OrthographicCamera(w / -2, w / 2, h / -2, h / 2, 1, 20);
			this.camera.position.z = 7.0;
		},

		update: function(time) {}
	});

	return Camera;
});