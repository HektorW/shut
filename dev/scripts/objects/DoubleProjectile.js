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
      instance.position.add(cross.multiplyScalar(-1));
      this.addInstance(instance);
    },

    update: function() {
      this.supr();
    },

    getCollisionBounds: function() {
      var x = (this.instances[0].position.x + this.instances[1].position.x) / 2;
      var y = (this.instances[0].position.y + this.instances[1].position.y) / 2;

      return {
        type: 'rectangle',
        x: x,
        y: y,
        width: this.size * 2 + 0.4,
        height: this.size
      };
    }

  });


  DoubleProjectile.delay = 0.2;


  return DoubleProjectile;
});