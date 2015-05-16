define([
  'threejs',

  'util/Color',
  'util/Random',

  'objects/BaseObject',

  'particles/Particle'
], function(
  Three,
  Color,
  Random,

  BaseObject,

  Particle
) {

  var MovingBox = BaseObject.extend({

    __init__: function(level, settings) {
      this.supr(level);

      this.alive = true;
      this.life = this.maxLife = settings.life || 50.0;

      this.width = settings.width || settings.size || 1.0;
      this.height = settings.height || settings.size || 1.0;

      this.x = settings.x || 0.0;
      this.y = settings.y || 0.0;

      this.color = Color.green;

      this.speed = Random.randomfloat(1, 2);
      this.vel = new Three.Vector3(-1 * this.speed, 0, 0);

      this.initInstance();
    },

    initInstance: function() {
      this.geometry = new Three.CubeGeometry(this.width, this.height, 1.0);
      this.material = new Three.MeshPhongMaterial({
        color: this.color,
        ambient: this.color,
        specular: this.color,
        shading: Three.FlatShading
      });

      this.instance = new Three.Mesh(this.geometry, this.material);
      this.instance.position.x = this.x;
      this.instance.position.y = this.y;
      this.level.scene.add(this.instance);
    },


    update: function(time) {
      var hpLevel = this.life / this.maxLife;
      var color = Color.darken(this.color, hpLevel);

      this.material.color.setHex(color);
      this.material.ambient.setHex(color);
      this.material.specular.setHex(color);

      this.instance.position.add(this.vel.clone().multiplyScalar(time.elapsed));

      if (this.instance.position.x < (this.level.camera.width * -0.5)) {
        this.alive = false;
      }
    },

    getCollisionBounds: function() {
      var w = this.width;
      var h = this.height;

      return {
        type: 'rectangle',
        x: this.instance.position.x - w / 2,
        y: this.instance.position.y - h / 2,
        width: w,
        height: h
      };
    },

    onHit: function(other) {
      this.life -= other.damage;

      Particle.directedScatter(this.level.particleManager, this.instance.position.x, this.instance.position.y, other.angle - Math.PI);

      if(this.life <= 0.0 && this.alive) {
        this.life = 0.0;
        this.alive = false;
        this.trigger('dead', {
          object: this
        })
      }
    }


  });

  return MovingBox;
});