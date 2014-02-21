/* global requestAnimationFrame */

define([
	'threejs',
	'util/Color',
	'controls/keyboard',
	'controls/mouse',
	'controls/gamepad',
	'camera',
	'objects/BaseObject'
], function(
	Three,
	Color,
	Keyboard,
	Mouse,
	Gamepad,
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


		var light = new Three.PointLight(Color.white, 1, 100);
		light.position.set(0, 0, -10);
		this.scene.add(light);

		light = new Three.PointLight(Color.white, 1, 100);
		light.position.set(0, 0, 10);
		this.scene.add(light);


		this.strafe = 0.0;
		this.vel = 0.0;

		var keyboard = this.keyboard = new Keyboard({ baseObject: this.cube });
		keyboard.on('up:start', function() { this.vel = 1; }, this);
		// keyboard.on('up:end', function() { this.vel -= speed; }, this);
		// keyboard.on('down:start', function() { this.vel -= speed; }, this);
		// keyboard.on('down:end', function() { this.vel += speed; }, this);
		// keyboard.on('right:start', function() { this.strafe += speed; }, this);
		// keyboard.on('right:end', function() { this.strafe -= speed; }, this);
		// keyboard.on('left:start', function() { this.strafe -= speed; }, this);
		// keyboard.on('left:end', function() { this.strafe += speed; }, this);


		//var mouse = this.mouse = new Mouse({ baseObject: this.cube });
		//mouse.on('direction', function(data) { 
		//	window.DEBUG('angle', data.angle);
		//	this.cube.instance.rotation.z = data.angle;
		//}, this);
		var gamepad = this.gamepad = new Gamepad({ baseObject: this.cube });
		gamepad.on('direction', function(data) {
			this.cube.instance.rotation.z = data.angle;
			window.DEBUG('angle', data.angle);
		}, this);
		gamepad.on('move', function(data) {
			this.vel = -data.dirY;
		}, this);

		this._boundUpdate = this.update.bind(this);
		requestAnimationFrame(this._boundUpdate);
	};


	App.prototype.update = function( /*time*/ ) {

		this.gamepad.update();

		if(!this.keyboard.isKeyDown('w')) {
			this.vel -= 0.25;
			if(this.vel < 0.0)
				this.vel = 0.0;
		}

		// this.cube.instance.position.x += this.strafe * 0.016;
		var dx = Math.cos(this.cube.instance.rotation.z);
		var dy = Math.sin(this.cube.instance.rotation.z);
		var pos = this.cube.instance.position;

		var speed = 7.5;
		pos.x += this.vel * dx * speed * 0.016;
		pos.y += this.vel * dy * speed * 0.016;

		window.DEBUG('position', pos.x, pos.y, pos.z);

		this.draw();

		requestAnimationFrame(this._boundUpdate);
	};

	App.prototype.draw = function() {
		this.renderer.render(this.scene, this.camera.camera);
	};

	return App;
});