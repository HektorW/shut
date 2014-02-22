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

  Ship
) {
  
  var Game = Classy.extend({

    // vars
    width: null,
    height: null,


    // methods
    __init__: function() {
      this.scene = new Three.Scene();
      this.camera = new Camera(this);

      this.renderer = new Three.CanvasRenderer();

      this.$root = $('#root').append(this.renderer.domElement);      

      // init controls
      Keyboard.init();
      Mouse.init();

      // objects
      this.initObjects();

      _.bindAll(this, 'update', 'onresize');
      this.onresize();

      Time.start();
      requestAnimationFrame(this.update);
    },


    initObjects: function() {
      this.ship = new Ship(this);
    },



    /**
     * update
     */
    update: function() {
      requestAnimationFrame(this.update);
      Time.update();

      this.ship.update();

      Keyboard.update();
      Mouse.update();

      this.draw();
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