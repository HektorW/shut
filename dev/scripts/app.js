/* global requestAnimationFrame */

define([
	'threejs',
	'util/Color',
	'controls/keyboard',
	'camera',
	'objects/BaseObject'
], function(
	Three,
	Color,
	Keyboard,
	Camera,
	BaseObject
	) {



	function App() {}


	App.prototype.init = function() {

		this.scene = new Three.Scene();
		this.camera = new Camera();

		this.renderer = new Three.CanvasRenderer();
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		this.rootElement = document.getElementById('root');
		this.rootElement.appendChild(this.renderer.domElement);


		this.cube = new BaseObject();
		this.scene.add(this.cube.instance);


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

		// this.cube.position.x += this.velx * 0.016;
		// this.cube.position.y += this.vely * 0.016;

		this.draw();

		requestAnimationFrame(this._boundUpdate);
	};

	App.prototype.draw = function() {
		this.renderer.render(this.scene, this.camera.camera);
	};

	return App;
});