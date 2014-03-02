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

      this.width = settings.width || 1.0;
      this.height = settings.height || 1.0;

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

      this.counter += Time.elapsed * 0.1;

      var color = Color.lerp(Color.green, Color.red, this.counter);

      this.material.color.setHex(color);
      this.material.ambient.setHex(color);
      this.material.specular.setHex(color);
    },


  });
  
  return StaticBox;
});