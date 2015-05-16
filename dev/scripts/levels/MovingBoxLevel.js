define([
  'threejs',

  'util/Color',
  'util/Random',

  'levels/BaseLevel',

  'objects/MovingBox',

  'particles/Particle'
], function(
  Three,

  Color,
  Random,

  BaseLevel,

  MovingBox,

  Particle
) {

  var MovingBoxLevel = BaseLevel.extend({

    __init__: function(game) {
      this.supr(game);
    },


    // @Override
    init: function() {
      this.supr();

      setInterval(this.addMovingBox.bind(this), 500);

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


    addMovingBox: function() {
      this.enemies.push(
        new MovingBox(this, {
          size: 0.4,
          life: 25,
          x: this.camera.width / 2,
          y: Random.randomfloat(-this.camera.height, this.camera.height),
        }).on('dead', this.onBoxDead, this)
      );
    },

    onBoxDead: function(data) {
      var position = data.object.instance.position;
      Particle.scatter(this.particleManager, position.x, position.y);

      var that = this;
      setTimeout(function() {
        that.addMovingBox();
      }, 3000);
    },

  });

  return MovingBoxLevel;
});