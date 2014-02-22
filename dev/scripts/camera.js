define([
	'threejs',
	'classy'
], function(Three, Classy) {
	var Camera = Classy.extend({

		__init__: function(game) {
			this.game = game;

			this.updateProjection();
			this.camera.position.z = 40.0;
		},

		update: function() {},


		updateProjection: function() {
			var w = this.game.width / 100;
			var h = this.game.height / 100;

			var pos;
			if(this.camera)
				pos = this.camera.position;

			this.camera = new Three.OrthographicCamera(w / -2, w / 2, h / -2, h / 2, 1, 100);

			if(pos)
				this.camera.position = pos;
		}
	});

	return Camera;
});