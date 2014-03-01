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

  var DoubleProjectile = Projectile.extend({

    __init__: function(game, ship, settings) {
      settings.color = Color.purple;
      this.supr(game, ship, settings);
    },

    initInstances: function() {
      var cross = new Three.Vector3().copy(this.vel).normalize();
      cross.cross(new Three.Vector3(0, 0, 1.0));
      cross.multiplyScalar(0.2);

      var instance = new Three.Mesh(this.getGeometry(), this.getMaterial());
      instance.position.set(this.startX, this.startY, 0);
      instance.position.add(cross);
      this.addInstance(instance);

      instance = new Three.Mesh(this.getGeometry(), this.getMaterial());
      instance.position.set(this.startX, this.startY, 0);
      instance.position.add(cross.multiplyScalar(-1.0));
      this.addInstance(instance);
    },

    update: function() {
      this.supr();
    },

  });



  return DoubleProjectile;
});