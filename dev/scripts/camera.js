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
			var w = this.width = 30;// this.game.width / 100;
			var h = this.height = window.innerHeight / window.innerWidth  * w;// this.game.height / 100;

			var pos;
			if(this.camera)
				pos = this.camera.position;

			this.camera = new Three.OrthographicCamera(w / -2, w / 2, h / -2, h / 2, 1, 100);
			// this.camera = new Three.PerspectiveCamera(60, w / h, 1, 1000);

			if(pos)
				this.camera.position = pos;
		},


		screenToWorldPosition: function(screenX, screenY) {
			var x = screenX / window.innerWidth;
			var y = screenY / window.innerHeight;

			x *= this.width;
			y *= this.height;

			x -= this.width / 2;
			y -= this.height / 2;

			x += this.camera.position.x;
			y += this.camera.position.y;

			return [x, y];
		},

		isPointInFrustum: function(posx, posy) {
			//posx -= this.width / 2;
			//posy -= this.height / 2;
			
			var w = this.width;
			var h = this.height;

			var cx = this.camera.position.x - w / 2;
			var cy = this.camera.position.y - h / 2;

			return (posx > cx && posx < cx + w && posy > cy && posy < cy + h);
		}
	});

	return Camera;
});