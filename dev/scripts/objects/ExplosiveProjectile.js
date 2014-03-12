define([
  'threejs',

  'objects/Projectile',

  'util/Color',
  'time'
], function(
  Three,
  Projectile,
  Color,
  Time
) {

  var ExplosiveProjectile = Projectile.extend({

    __init__: function(game, ship, settings) {
      this.supr(game, ship, settings);

      this.explosionDelay = 0.50;
      this.explosionRadius = 0.1;
      this.explosionDuration = 0.8;
      this.explosionRadiusInc = 30.0;
    },

    getMaterial: function() {
      this.projectileMaterial = new Three.MeshPhongMaterial({
        ambient: Color.green,
        color: Color.green,
        specular: Color.green,
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

    update: function() {
      if (this.explosionDelay > 0.0) {
        this.explosionDelay -= Time.elapsed;
        this.supr();

      } else {
        this.instance.material = this.explosionMaterial;
        this.explosionDuration -= Time.elapsed;

        this.explosionRadius += this.explosionRadiusInc * Time.elapsed;
        this.instance.scale.set(this.explosionRadius, this.explosionRadius, this.explosionRadius);
        this.instance.rotation.z = Time.sinceStart * 3.0;
        this.instance.rotation.y = Time.sinceStart * 3.0;
        this.instance.rotation.x = Time.sinceStart * 3.0;

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

      // var s = this.explosionRadius / 3;
      // var hs = s / 2;

      /*return {
        type: 'rectangle',
        x: this.instance.position.x - hs,
        y: this.instance.position.y - hs,
        width: s,
        height: s
      };*/
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