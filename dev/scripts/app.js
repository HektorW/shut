/* global requestAnimationFrame */

define([
	'threejs',
	'util/Color',
	'controls/keyboard'
], function(
	Three,
	Color,
	Keyboard
	) {



	function App() {}


	App.prototype.init = function() {

		this.scene = new Three.Scene();
		this.camera = new Three.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
		// this.camera = new Three.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 0.1, 1000 );
		this.camera.position.z = 7.0;

		this.renderer = new Three.CanvasRenderer();
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		this.rootElement = document.getElementById('root');
		this.rootElement.appendChild(this.renderer.domElement);

		var geometry = new Three.CubeGeometry(1, 1, 1);
		var material = new Three.MeshPhongMaterial({
			color: Color.orange
		});
		material.wireframe = false;
		// material.side = Three.DoubleSide;
		this.cube = new Three.Mesh(geometry, material);
		this.scene.add(this.cube);


		this.light = new Three.PointLight(Color.white, 1, 100);
		this.light.position.set(5, 5, 5);
		this.scene.add(this.light);


		this.velx = 0.0;
		this.vely = 0.0;

		var keyboard = this.keyboard = new Keyboard();
		var speed = 1.5;
		keyboard.on('up:start', function() { this.vely += speed; }, this);
		keyboard.on('up:end', function() { this.vely -= speed; }, this);
		keyboard.on('down:start', function() { this.vely -= speed; }, this);
		keyboard.on('down:end', function() { this.vely += speed; }, this);
		keyboard.on('right:start', function() { this.velx += speed; }, this);
		keyboard.on('right:end', function() { this.velx -= speed; }, this);
		keyboard.on('left:start', function() { this.velx -= speed; }, this);
		keyboard.on('left:end', function() { this.velx += speed; }, this);


		this._boundUpdate = this.update.bind(this);
		requestAnimationFrame(this._boundUpdate);
	};


	App.prototype.update = function( /*time*/ ) {

		this.cube.position.x += this.velx * 0.016;
		this.cube.position.y += this.vely * 0.016;

		this.draw();

		requestAnimationFrame(this._boundUpdate);
	};

	App.prototype.draw = function() {
		this.renderer.render(this.scene, this.camera);
	};

	return App;
});