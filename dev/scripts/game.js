define([
  'dom',
  'threejs',
  'underscore',
  'classy',

  'controls/keyboard',
  'controls/mouse',
  'controls/gamepad',

  'time',
  'util/Color',

  'levels/StaticBoxLevel',
  'levels/MovingBoxLevel'
], function(
  $,
  Three,
  _,
  Classy,

  Keyboard,
  Mouse,
  Gamepad,

  Time,
  Color,

  StaticBoxLevel,
  MovingBoxLevel
) {

  var Game = Classy.extend({

    // vars
    width: null,
    height: null,

    time: null,


    // methods
    __init__: function() {
      this.renderer = new Three.WebGLRenderer();
      this.renderer.setClearColor(Color.darken(Color.navy, 0.3));

      this.$root = $('#root').append(this.renderer.domElement);

      this.time = new Time();

      // init controls
      Keyboard.init(this);
      Mouse.init(this);
      Gamepad.init(this);

      // objects
      this.initLevel();

      _.bindAll(this, 'update', 'onresize');
      $(window).on('resize', this.onresize);
      this.onresize();

      this.time.start();
      requestAnimationFrame(this.update);
    },



    initLevel: function() {
      this.setLevel(new MovingBoxLevel(this));
    },


    setLevel: function(level) {
      if (this.activeLevel) {
        // Destroy level
      }

      this.activeLevel = level;
      this.activeLevel.init();

      Mouse.setScene(this.activeLevel.scene);
    },



    /**
     * update
     */
    update: function() {
      requestAnimationFrame(this.update);

      this.time.update();

      this.activeLevel.update(this.time);

      // update controls last
      Keyboard.update();
      Mouse.update();
      Gamepad.update();

      Mouse.updateCursor(this.activeLevel.camera);

      this.draw();
    },


    /**
     * draw
     */
    draw: function() {
      this.activeLevel.draw(this.renderer);
    },


    /**
     * events
     */
    onresize: function() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      this.renderer.setSize(this.width, this.height);

      this.activeLevel.resize();
    }

  });


  return Game;
});