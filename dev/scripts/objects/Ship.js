define([
  'threejs',
  'util/Color',
  'time',
  'objects/BaseObject',
  'controls/keyboard',
  'controls/mouse'
], function(
  Three,
  Color,
  Time,
  BaseObject,
  Keyboard,
  Mouse
) {
  
  var Ship = BaseObject.extend({

    // vars


    // methods
    __init__: function(game) {
      this.supr(game);

      this.geometry = new Three.CubeGeometry(1, 1, 1);
      this.material = new Three.MeshPhongMaterial({ color: Color.orange });

      this.instance = new Three.Mesh(this.geometry, this.material);
      this.game.scene.add(this.instance);
    },


    update: function() {
      this.supr();

      var vel = new Three.Vector3(0, 0);
      var speed = 4.0;

      if(Keyboard.actionDuration('up'))
        vel.y -= 1.0;
      if(Keyboard.actionDuration('down'))
        vel.y += 1.0;
      if(Keyboard.actionDuration('left'))
        vel.x -= 1.0;
      if(Keyboard.actionDuration('right'))
        vel.x += 1.0;

      vel.normalize();

      vel.multiplyScalar(Time.elapsed * speed);
      this.instance.position.add(vel);

    },

    draw: function() {}

  });

  return Ship;
});