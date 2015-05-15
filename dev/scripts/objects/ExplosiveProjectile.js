define([
  'threejs',

  'objects/Projectile',

  'util/Color'
], function(
  Three,
  Projectile,
  Color
) {

  var ExplosiveProjectile = Projectile.extend({

    __init__: function(game, ship, settings) {
      settings.speed = 10.0;

      this.supr(game, ship, settings);

      this.explosionDelay = 1.0;
      this.explosionRadius = 0.1;
      this.explosionDuration = 0.8;
      this.explosionRadiusInc = 30.0;
    },

    getMaterial: function() {
      this.projectileMaterial = new Three.MeshPhongMaterial({
        ambient: Color.maroon,
        color: Color.maroon,
        specular: Color.maroon,
        shading: Three.FlatShading
      });
      this.explosionMaterial = new Three.MeshPhongMaterial({
        ambient: Color.red,
        color: Color.red,
        specular: Color.red,
        shading: Three.FlatShading
      });
      this.explosionMaterial.wireframe = true;

      return this.projectileMaterial;
    },

    update: function(time) {
      if (this.explosionDelay > 0.0) {
        this.explosionDelay -= time.elapsed;
        this.supr(time);

      } else {
        this.instance.material = this.explosionMaterial;
        this.explosionDuration -= time.elapsed;

        this.explosionRadius += this.explosionRadiusInc * time.elapsed;
        this.instance.scale.set(this.explosionRadius, this.explosionRadius, this.explosionRadius);
        this.instance.rotation.z = time.sinceStart * 3.0;
        this.instance.rotation.y = time.sinceStart * 3.0;
        this.instance.rotation.x = time.sinceStart * 3.0;

        if (this.explosionDuration < 0.0) {
          this.alive = false;
        }
      }

    },

    onHit: function() {
      this.explosionDelay = -1;
    },

    getCollisionBounds: function() {
      if (this.explosionDelay > 0.0)
        return this.supr();

      return {
        type: 'circle',
        x: this.instance.position.x,
        y: this.instance.position.y,
        radius: this.explosionRadius / 7
      };
    }

  });

  ExplosiveProjectile.delay = 1.0;



  return ExplosiveProjectile;
});