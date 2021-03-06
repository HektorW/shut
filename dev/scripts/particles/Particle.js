define([
  'threejs',

  'util/Color',
  'util/Random',

  'objects/BaseObject',
], function(
  Three,

  Color,
  Random,

  BaseObject
) {

  var _gravity_y = 9.82;

  var Particle = BaseObject.extend({

    __init__: function(ops) {

      this.startX = ops.x || 0;
      this.startY = ops.y || 0;
      this.angle = ops.angle || 0;
      this.speed = ops.speed || 1;
      this.color = ops.color || Color.random();
      this.size = ops.size || 0.1;

      this.liveCounter = ops.duration || 1;
      this.alive = true;

      this.direction = new Three.Vector2(Math.cos(this.angle), Math.sin(this.angle));

      this.instance = new Three.Mesh(
        new Three.BoxGeometry(this.size, this.size, this.size),
        new Three.MeshPhongMaterial({
          ambient: this.color,
          color: this.color,
          specular: this.color,
          shading: Three.FlatShading
        })
      );

      this.instance.position.set(this.startX, this.startY, 0);
    },


    update: function(time) {

      this.liveCounter -= time.elapsed;

      if(this.liveCounter < 0.0)
        this.alive = false;

      this.instance.position.x += this.direction.x * _gravity_y * this.speed * time.elapsed;
      this.instance.position.y += this.direction.y * _gravity_y * this.speed * time.elapsed;

    }

  });


  Particle.scatter = function(particleManager, x, y) {
    var count = 15;

    for(var i = count; i--; ) {
      var p = new Particle({
        x: x,
        y: y,
        angle: Random.randomfloat(0, Math.PI *2),
        size: Random.randomfloat(0.08, 0.15),
        speed: Random.randomfloat(0.5, 1.2)
      });
      particleManager.addParticle(p);
    }
  };

  Particle.directedScatter = function(particleManager, x, y, angle) {
    var count = 5;
    var variance = 0.8;
    var minAngle = angle - variance;
    var maxAngle = angle + variance;

    for (var i = count; i--; ) {
      particleManager.addParticle(new Particle({
        x: x,
        y: y,
        angle: Random.randomfloat(minAngle, maxAngle),
        size: Random.randomfloat(0.08, 0.15),
        speed: Random.randomfloat(0.8, 1.8),
        duration: Random.randomfloat(0.1, 0.2)
      }));
    }
  };


  return Particle;
});
