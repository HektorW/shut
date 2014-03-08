define([
  'threejs',
  'util/Color',
  'time',

  'objects/BaseObject'
], function(
  Three,
  Color,
  Time,

  BaseObject
) {

  var StaticBox = BaseObject.extend({

    __init__: function(game, settings) {
      this.supr(game);

      this.alive = true;
      this.life = this.maxLife = settings.life || 100.0;

      this.width = settings.width || settings.size || 1.0;
      this.height = settings.height || settings.size || 1.0;

      this.x = settings.x || 0.0;
      this.y = settings.y || 0.0;

      this.geometry = new Three.CubeGeometry(this.width, this.height, 1.0);
      this.material = new Three.MeshPhongMaterial({
        color: Color.green,
        ambient: Color.green,
        specular: Color.green,
        shading: Three.FlatShading
      });

      this.instance = new Three.Mesh(this.geometry, this.material);
      this.instance.position.x = this.x;
      this.instance.position.y = this.y;
      this.game.scene.add(this.instance);

      this.counter = 0.0;
    },


    update: function() {

      this.counter = 1 - this.life / this.maxLife;
      var color = Color.lerp(Color.green, Color.red, this.counter);

      this.material.color.setHex(color);
      this.material.ambient.setHex(color);
      this.material.specular.setHex(color);
    },

    getCollisionBounds: function() {
      var w = this.width;
      var h = this.height;

      return {
        type: 'rectangle',
        x: this.instance.position.x - w / 2,
        y: this.instance.position.y - h / 2,
        width: w,
        height: h
      };
    },

    onHit: function(other) {
      this.life = Math.max(this.life - other.damage, 0);

      if(this.life <= 0.0 && this.alive) {
        this.alive = false;
        this.trigger('dead', {
          object: this
        })
      }
    }


  });

  return StaticBox;
});