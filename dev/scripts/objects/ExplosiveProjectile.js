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
      this.explosionDuration = 1.0;
      this.explosionRadiusInc = 20.0;
    },

    getMaterial: function() {
      this.projectileMaterial = new Three.MeshPhongMaterial({
        ambient: Color.green,
        color: Color.green, 
        specular: Color.green, 
        shading: Three.FlatShading
      });
      this.explosionMaterial = new Three.MeshPhongMaterial({
        ambient: Color.orange,
        color: Color.orange, 
        specular: Color.orange, 
        shading: Three.FlatShading
      });
      this.explosionMaterial.wireframe = true;

      return this.projectileMaterial;
    },

    update: function() {
      if(this.explosionDelay > 0.0) {
        this.explosionDelay -= Time.elapsed;
        this.supr();

        if(this.explosionDelay < 0.0) {
          this.instance.material = this.explosionMaterial;
        }
      } else {
        this.explosionDuration -= Time.elapsed;

        this.explosionRadius += this.explosionRadiusInc * Time.elapsed;

        // this.instance.geometry.size.set(this.explosionRadius, this.explosionRadius, this.explosionRadius);
        this.instance.scale.set(this.explosionRadius, this.explosionRadius, this.explosionRadius);
        // this.instance.geometry.radius = this.explosionRadius;

        if(this.explosionDuration < 0.0) {
          this.alive = false;
        }
      }

    },

  });



  return ExplosiveProjectile;
});