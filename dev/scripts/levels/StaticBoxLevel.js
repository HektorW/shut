define([
  'threejs',
  'util/Color',

  'levels/BaseLevel',

  'objects/StaticBox',

  'particles/Particle'
], function(
  Three,
  Color,

  BaseLevel,

  StaticBox,

  Particle
) {

  var StaticBoxLevel = BaseLevel.extend({

    __init__: function(game) {
      this.supr(game);
    },


    // @Override
    init: function() {
      this.supr();

      var numBoxes = 128;
      for(var i = 0; i < numBoxes; i++) {
        this.addStaticBox(4 + parseInt(i / 16, 10), (i % 16) - 7.5);
      }

      this.initLights();
    },

    initLights: function() {
      var ambientLight = new Three.AmbientLight(Color.white);
      this.scene.add(ambientLight);

      var pointLight = new Three.PointLight(Color.white);
      pointLight.position.z = -20.0;
      this.scene.add(pointLight);
    },


    // @Override
    updateLevel: function(time) { },


    addStaticBox: function(x, y) {
      this.enemies.push(
        new StaticBox(this, {
          size: 0.4,
          life: 10,
          x: x,
          y: y
        }).on('dead', this.onBoxDead, this)
      );
    },

    onBoxDead: function(data) {
      var position = data.object.instance.position;
      Particle.scatter(position.x, position.y, this.particleManager);

      var that = this;
      setTimeout(function() {
        that.addStaticBox(position.x, position.y);
      }, 3000);
    },

  });

  return StaticBoxLevel;
});