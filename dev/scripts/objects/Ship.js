define([
  'threejs',
  'util/Color',
  'time',

  'objects/BaseObject',
  'objects/Projectile',

  'controls/keyboard',
  'controls/mouse'
], function(
  Three,
  Color,
  Time,

  BaseObject,
  Projectile,

  Keyboard,
  Mouse
) {
  
  var Ship = BaseObject.extend({

    // vars


    // methods
    __init__: function(game) {
      this.supr(game);

      this.geometry = new Three.CubeGeometry(1, 1, 1);
      this.material = new Three.MeshPhongMaterial({
        ambient: Color.orange,
        color: Color.orange,
        specular: Color.orange,
        shading: Three.FlatShading
      });

      this.instance = new Three.Mesh(this.geometry, this.material);
      this.instance.position.z = 1.0;
      this.game.scene.add(this.instance);
    },


    update: function() {
      this.supr();

      var instance = this.instance,
          position = instance.position;

      var vel = new Three.Vector3(0, 0);
      var speed = 4.0;

      if(Keyboard.actionDuration('up') > 0.0)
        vel.y -= 1.0;
      if(Keyboard.actionDuration('down') > 0.0)
        vel.y += 1.0;
      if(Keyboard.actionDuration('left') > 0.0)
        vel.x -= 1.0;
      if(Keyboard.actionDuration('right') > 0.0)
        vel.x += 1.0;

      vel.normalize();

      // mouse
      var mouseCoords = this.game.camera.screenToWorldPosition(Mouse.x, Mouse.y);
      var v = new Three.Vector2(mouseCoords[0] - position.x, mouseCoords[1] - position.y);
      v.normalize();
      var angle = Math.atan2(v.y, v.x);

      instance.rotation.z = angle;

      vel.multiplyScalar(Time.elapsed * speed);
      position.add(vel);

      if(Mouse.isButtonDown('left')) {
        this.shoot();
      }
    },

    draw: function() {},



    shoot: function() {
      var instance = this.instance,
          position = instance.position,
          angle = instance.rotation.z;
      var p = new Projectile(this.game, this, {
        x: position.x,
        y: position.y,
        dirX: Math.cos(angle),
        dirY: Math.sin(angle),
        speed: 12
      });

      this.game.projectiles.push(p);
    }

  });

  return Ship;
});