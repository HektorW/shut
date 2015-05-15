define([
  'threejs',
  'underscore',
  'events',

  'objects/BaseObject',

  'util/Color'
], function(
  Three,
  _,
  Events,

  BaseObject,

  Color
) {

  var Projectile = BaseObject.extend({



    // method
    __init__: function(level, ship, settings) {
      this.supr(level);

      this.damage = 10.0;

      this.ship = ship;

      this.startX = this.x = settings.x;
      this.startY = this.y = settings.y;
      this.size = settings.size || 0.1;
      this.color = settings.color;
      this.speed = settings.speed;
      this.dirX = settings.dirX;
      this.dirY = settings.dirY;
      this.angle = Math.atan2(this.dirY, this.dirX);
      this.vel = new Three.Vector3(this.dirX * this.speed, this.dirY * this.speed, 0);

      this.instances = [];

      this.initInstances();

      this.alive = true;
    },

    getGeometry: function() {
      this.geometry = new Three.SphereGeometry(this.size);
      return this.geometry;
    },

    getMaterial: function() {
      var color = typeof this.color === 'number' ? this.color : Color.random();
      this.material = new Three.MeshPhongMaterial({
        ambient: color,
        color: color,
        specular: color,
        shading: Three.FlatShading
      });
      // this.material.wireframe = true;
      return this.material;
    },

    initInstances: function() {
      this.instance = new Three.Mesh(this.getGeometry(), this.getMaterial());

      this.instance.position.x = this.startX;
      this.instance.position.y = this.startY;
      this.instance.rotation.z = this.angle;

      this.addInstance(this.instance);
    },

    addInstance: function(instance) {
      this.instances.push(instance);
      this.level.scene.add(instance);
    },

    update: function(time) {

      for (var i = this.instances.length; i--;) {
        var instance = this.instances[i],
          pos = instance.position;

        pos.add(this.vel.clone().multiplyScalar(time.elapsed));
        instance.rotation.y = time.sinceStart * 1.5;
        instance.rotation.x = time.sinceStart * 1.5;

        if (!this.level.camera.isPointInFrustum(pos.x, pos.y)) {
          this.alive = false;
        }
      }


    },

    draw: function() {},


    getCollisionBounds: function() {
      var s = this.size;
      var hs = s / 2;

      return {
        type: 'rectangle',
        x: this.instance.position.x - hs,
        y: this.instance.position.y - hs,
        width: s,
        height: s
      };
    },


    onHit: function( /*other*/ ) {
      this.alive = false;
    },


    remove: function() {
      for (var i = this.instances.length; i--;) {
        this.level.scene.remove(this.instances[i]);
      }
    },

  });
  _.extend(Projectile.prototype, Events);

  Projectile.delay = 0.10;


  return Projectile;
});