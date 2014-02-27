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



    // method
    __init__: function(game, ship, settings) {
      this.supr(game);

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
      this.material.wireframe = true;
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
      this.game.scene.add(instance);
    },

    update: function() {

      for(var i = this.instances.length; i--; ) {
        var instance = this.instances[i],
            pos = instance.position;

        pos.add(this.vel.clone().multiplyScalar(Time.elapsed));
        instance.rotation.y = Time.sinceStart * 1.5;
        instance.rotation.x = Time.sinceStart * 1.5;

        if(!this.game.camera.isPointInFrustum(pos.x, pos.y)) {
          this.alive = false;
        }
      }

      
    },

    draw: function() {},


    remove: function() {
      for(var i = this.instances.length; i--; ) {
        this.game.scene.remove(this.instances[i]);
      }
    },

  });
  _.extend(Projectile.prototype, Events);


  return Projectile;
});