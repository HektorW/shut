define([
  'threejs',
  'underscore',
  'events',

  'objects/BaseObject',

  'util/Color',
  'time'
], function(
  Three,
  _,
  Events,

  BaseObject,

  Color,
  Time
) {
  
  var Projectile = BaseObject.extend({

    __init__: function(game, ship, settings) {
      this.supr(game);

      this.ship = ship;

      this.x = settings.x;
      this.y = settings.y;
      this.size = settings.size || 0.1;
      this.speed = settings.speed;
      this.dirX = settings.dirX;
      this.dirY = settings.dirY;
      this.angle = Math.atan2(this.dirY, this.dirX);
      this.vel = new Three.Vector3(this.dirX * this.speed, this.dirY * this.speed, 0);

      this.geometry = new Three.SphereGeometry(this.size);
      var color = settings.color || Color.random();
      this.material = new Three.MeshPhongMaterial({
        ambient: color,
        color: color,
        specular: color,
        shading: Three.FlatShading
      });

      this.instance = new Three.Mesh(this.geometry, this.material);
      this.instance.position.x = settings.x;
      this.instance.position.y = settings.y;
      this.instance.rotation.z = this.angle;
      this.game.scene.add(this.instance);

      this.alive = true;
    },

    update: function() {
      var pos = this.instance.position;

      pos.add(this.vel.clone().multiplyScalar(Time.elapsed));

      if(!this.game.camera.isPointInFrustum(pos.x, pos.y)) {
        this.alive = false;
      }
    },

    draw: function() {}

  });
  _.extend(Projectile.prototype, Events);


  return Projectile;
});