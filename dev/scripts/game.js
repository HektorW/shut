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

  'objects/Ship'
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

  Ship
) {
  
  var Game = Classy.extend({

    // vars
    width: null,
    height: null,

    ship: null,
    projectiles: [],

    // methods
    __init__: function() {
      this.scene = new Three.Scene();
      this.camera = new Camera(this);

      this.renderer = new Three.WebGLRenderer();

      this.$root = $('#root').append(this.renderer.domElement);      

      // init controls
      Keyboard.init();
      Mouse.init();

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
    },

    initLight: function() {
      var ambientLight = new THREE.AmbientLight( Color.white );
      this.scene.add( ambientLight );
    },


    /**
     * update
     */
    update: function() {
      requestAnimationFrame(this.update);
      Time.update();

      this.ship.update();

      this.updateProjectiles();

      DEBUG('projectiles', this.projectiles.length);
      DEBUG('objects', this.scene.children.length);

      // update controls last
      Keyboard.update();
      Mouse.update();

      this.draw();
    },


    updateProjectiles: function() {
      var i, projectile,
          projectiles = this.projectiles;
      for(i = projectiles.length; i--; ) {
        projectile = projectiles[i];

        projectile.update();

        if(!projectile.alive) {
          this.scene.remove(projectile.instance);
          projectiles.splice(i, 1);
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