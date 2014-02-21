/* global requestAnimationFrame */

define([
	'threejs',
	'underscore',
	'util/Color',
	'controls/keyboard',
	'controls/mouse',
	'controls/gamepad',
	'time',
	'camera',
	'objects/BaseObject'
], function(
	Three,
	_,
	Color,
	Keyboard,
	Mouse,
	Gamepad,
	Time,
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

		this.time = new Time();

		var light = new Three.PointLight(Color.white, 1, 100);
		light.position.set(0, 0, -10);
		this.scene.add(light);

		light = new Three.PointLight(Color.white, 1, 100);
		light.position.set(0, 0, 10);
		this.scene.add(light);


		this.strafe = 0.0;
		this.velY = 0.0;
		this.velX = 0.0;
		this.vel = 0.0;

		var keyboard = this.keyboard = new Keyboard({ baseObject: this.cube });
		keyboard.on('up:start', function() { this.velY = -1; this.vel = 1.0; }, this);
		keyboard.on('down:start', function() { this.velY = 1; this.vel = 1.0; }, this);
		keyboard.on('right:start', function() { this.velX = 1; this.vel = 1.0; }, this);
		keyboard.on('left:start', function() { this.velX = -1; this.vel = 1.0; }, this);


		this.mouse = new Mouse({ baseObject: this.cube });
		_.bindAll(this, 'update');
		this.time.start();
		requestAnimationFrame(this.update);
	};


	App.prototype.update = function( /*time*/ ) {
		requestAnimationFrame(this.update);
		this.time.update();

		// this.gamepad.update();

		// this.cube.instance.position.x += this.strafe * 0.016;
		var dx = Math.cos(this.cube.instance.rotation.z);
		var dy = Math.sin(this.cube.instance.rotation.z);
		var pos = this.cube.instance.position;

		var vel = new Three.Vector2(this.velX, this.velY);
		vel.setLength(this.vel);

		var speed = 20;
		pos.x += vel.x * speed * 0.016;
		pos.y += vel.y * speed * 0.016;

		if(!this.keyboard.isKeyDown('w') && !this.keyboard.isKeyDown('s') && !this.keyboard.isKeyDown('a') && !this.keyboard.isKeyDown('d'))
			this.vel *= 0.9;
		if(Math.abs(this.vel) < 0.01)
			this.vel = 0.0;

		window.DEBUG('position', pos.x, pos.y, pos.z);

		var s = (1 + (Math.cos(this.time.sinceStart*5.0) * 0.4));
		this.cube.instance.scale.x = s;
		this.cube.instance.scale.y = s;
		this.cube.instance.scale.z = s;

		this.draw();
	};

	App.prototype.draw = function() {
		this.renderer.render(this.scene, this.camera.camera);
	};

	return App;
});