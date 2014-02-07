/* global requestAnimationFrame */

define(['threejs'], function(Three) {
	function App() {

	}


	App.prototype.init = function() {

		this.scene = new Three.Scene();
		this.camera = new Three.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.camera.position.z = 5.0;

		this.renderer = new Three.CanvasRenderer();
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		this.rootElement = document.getElementById('root');
		this.rootElement.appendChild(this.renderer.domElement);

		var geometry = new Three.CubeGeometry(1, 1, 1);
		var material = new Three.MeshPhongMaterial({
			color: 0xFF4136
		});
		material.wireframe = true;
		material.side = Three.DoubleSide;
		this.cube = new Three.Mesh(geometry, material);
		this.scene.add(this.cube);


		this.light = new Three.PointLight(0xffffff, 1, 100);
		this.light.position.set(5, 5, 5);
		this.scene.add(this.light);

		this._boundUpdate = this.update.bind(this);
		requestAnimationFrame(this._boundUpdate);
	};


	App.prototype.update = function( /*time*/ ) {
		this.draw();

		this.cube.rotation.x += 0.01;
		this.cube.rotation.y += 0.01;

		requestAnimationFrame(this._boundUpdate);
	};

	App.prototype.draw = function() {
		this.renderer.render(this.scene, this.camera);
	};

	return App;
});