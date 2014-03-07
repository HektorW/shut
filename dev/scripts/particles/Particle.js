define([
  'threejs',

  'util/Color',
  'time',

  'objects/BaseObject',
], function(Three, Color, Time, BaseObject) {
  
  var _gravity_y = 9.82;

  var Projectile = BaseObject.extend({

    __init__: function(game, ops) {
      this.supr(game);

      this.startX = ops.x || 0;
      this.startY = ops.y || 0;
      this.angle = ops.angle || 0;
      this.speed = ops.speed || 1;
      this.color = ops.color || Color.random();
      this.size = ops.size = 1;

      this.liveCounter = ops.duration || 1;
      this.alive = true;

      this.direction = new Three.Vector2(Math.cos(this.angle), Math.sin(this.angle));

      this.instance = new Three.Mesh(
        new Three.PlaneGeometry(this.size, this.size),
        new Three.MeshPhongMaterial({
          ambient: this.color,
          color: this.color,
          specular: this.color,
          shading: Three.FlatShading
        })
      );
      this.game.scene.add(this.instance);
    },


    update: function() {

      this.liveCounter -= Time.elapsed;

      if(this.liveCounter < 0.0)
        this.alive = false;

      this.instance.position.x += this.direction.x * _gravity_y * this.speed * Time.elapsed;
      this.instance.position.y += this.direction.y * _gravity_y * this.speed * Time.elapsed;

    }

  });
  
  return Projectile;
});