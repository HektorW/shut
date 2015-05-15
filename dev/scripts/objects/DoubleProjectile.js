define([
  'threejs',

  'objects/Projectile',

  'util/Color'
], function(
  Three,
  Projectile,
  Color
) {

  var DoubleProjectile = Projectile.extend({

    __init__: function(game, ship, settings) {
      settings.color = Color.purple;

      var cross = new Three.Vector3().copy(new Three.Vector3(settings.dirX, settings.dirY, 0)).normalize();
      cross.cross(new Three.Vector3(0, 0, 1.0));
      cross.multiplyScalar(0.2);

      settings.x += cross.x;
      settings.y += cross.y;

      this.supr(game, ship, settings);

      settings.x -= cross.x * 2;
      settings.y -= cross.y * 2;

      game.projectiles.push(new Projectile(game, ship, settings));
    },

    /*initInstances: function() {
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
    },*/

    update: function(time) {
      this.supr(time);
    },

    /*getCollisionBounds: function() {
      var x = (this.instances[0].position.x + this.instances[1].position.x) / 2;
      var y = (this.instances[0].position.y + this.instances[1].position.y) / 2;

      return {
        type: 'rectangle',
        x: x,
        y: y,
        width: this.size,
        height: this.size * 2 + 0.4
      };
    }*/
  });


  DoubleProjectile.delay = 0.2;


  return DoubleProjectile;
});