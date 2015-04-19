define([
  'dom',
  'threejs',
  'underscore',
  'classy',

  'controls/keyboard',
  'controls/mouse',
  'controls/gamepad',

  'camera',
  'time',
  'util/Color',

  'collisions',

  'particles/Particle',

  'objects/Ship',
  'objects/StaticBox'
], function(
  $,
  Three,
  _,
  Classy,

  Keyboard,
  Mouse,
  Gamepad,

  Camera,
  Time,
  Color,

  Collision,

  Particle,

  Ship,
  StaticBox
) {

  var Game = Classy.extend({

    // vars
    width: null,
    height: null,

    ship: null,
    projectiles: null,
    boxes: null,


    // methods
    __init__: function() {
      this.scene = new Three.Scene();
      this.camera = new Camera(this);

      this.renderer = new Three.WebGLRenderer();
      this.renderer.setClearColor(Color.darken(Color.navy, 0.3));
      // this.renderer.setClearColor(Color.darken(Color.white));

      this.$root = $('#root').append(this.renderer.domElement);

      // init controls
      Keyboard.init(this);
      Mouse.init(this);
      Gamepad.init(this);

      this.projectiles = [];
      this.boxes = [];
      this.particles = [];

      // objects
      this.initObjects();
      this.initLight();

      _.bindAll(this, 'update', 'onresize');
      $(window).on('resize', this.onresize);
      this.onresize();

      Time.start();
      requestAnimationFrame(this.update);
    },


    initObjects: function() {
      this.ship = new Ship(this);

      var numBoxes = 128;
      for(var i = 0; i < numBoxes; i++) {
        this.addStaticBox(4 + parseInt(i / 16, 10), (i % 16) - 7.5);
      }
    },

    onBoxDead: function(data) {
      var position = data.object.instance.position;
      Particle.scatter(position.x, position.y, this);

      var that = this;
      setTimeout(function() {
        that.addStaticBox(position.x, position.y);
      }, 3000);
    },

    initLight: function() {
      var ambientLight = new Three.AmbientLight(Color.white);
      this.scene.add(ambientLight);

      var pointLight = new Three.PointLight(Color.white);
      pointLight.position.z = -20.0;
      this.scene.add(pointLight);
    },

    addParticle: function(particle) {
      this.particles.push(particle);
    },

    addStaticBox: function(x, y) {
      this.boxes.push(
        (new StaticBox(this, {
          size: 0.4,
          life: 10,
          x: x,
          y: y
        }))
          .on('dead', this.onBoxDead, this)
      );
    },


    /**
     * update
     */
    update: function() {
      requestAnimationFrame(this.update);
      Time.update();

      this.ship.update();

      this.updateProjectiles();

      // window.DEBUG('objects', this.scene.children.length);

      // update controls last
      Keyboard.update();
      Mouse.update();
      Gamepad.update();

      this.boxes = _.filter(this.boxes, function(box) {
        box.update();

        if(!box.alive) {
          this.scene.remove(box.instance);
        }

        return box.alive;
      }, this);

      this.updateParticles();

      this.draw();
    },


    updateParticles: function() {
      var particles = this.particles, particle;
      for(var i = particles.length; i--; ) {
        particle = particles[i];
        particle.update();

        if(!particle.alive) {
          this.scene.remove(particle.instance);
          particles.splice(i, 1);
        }
      }
    },

    updateProjectiles: function() {
      var i, projectile,
        projectiles = this.projectiles;
      for (i = projectiles.length; i--;) {
        projectile = projectiles[i];

        projectile.update();

        this.checkProjectileCollisions(projectile);

        if (!projectile.alive) {
          projectile.remove();
          projectiles.splice(i, 1);
        }
      }
    },

    checkProjectileCollisions: function(projectile) {
      var p_bounds = projectile.getCollisionBounds();
      for (var i = this.boxes.length; i--;) {
        var box = this.boxes[i];
        var b_bounds = box.getCollisionBounds();

        if (Collision.collision(p_bounds, b_bounds)) {
          projectile.onHit(box);
          box.onHit(projectile);
        }
      }
    },


    /**
     * draw
     */
    draw: function() {
      this.renderer.render(this.scene, this.camera.camera);
    },



    /**
     * events
     */
    onresize: function() {

      this.width = window.innerWidth;
      this.height = window.innerHeight;

      this.renderer.setSize(this.width, this.height);

      this.camera.updateProjection();
    }

  });


  return Game;
});