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

      // movement move
      this.move = window.move = {
        acceleration: 1.0,
        deacceleration: 1.0,
        maxSpeed: 5.0,
        speed: 10.0,
        lerp: 0.05
      };
      this.speed = 0.0;
      this.previousVel = new Three.Vector3(0, 0, 0);

      // shoot
      this.shooting = window.shooting = {
        delay: 0.15,
        speed: 18.0,
        size: 0.15,
        color: 'lime'
      };
      this.shootCounter = 0.0;


      // three instance
      this.geometry = new Three.CubeGeometry(1, 1, 1);
      this.material = new Three.MeshPhongMaterial({
        ambient: Color.orange,
        color: Color.orange,
        specular: Color.orange,
        shading: Three.FlatShading
      });
      this.material = new Three.MeshPhongMaterial({
        map: Three.ImageUtils.loadTexture('res/ship.png'),
        transparent: true
      });

      this.instance = new Three.Mesh(this.geometry, this.material);
      this.instance.position.z = 1.0;
      this.game.scene.add(this.instance);
    },


    update: function() {
      this.supr();

      var instance = this.instance,
          position = instance.position,
          elapsed = Time.elapsed;

      var dir = new Three.Vector3(0, 0, 0);

      if(Keyboard.actionDuration('up') > 0.0)
        dir.y -= 1.0;
      if(Keyboard.actionDuration('down') > 0.0)
        dir.y += 1.0;
      if(Keyboard.actionDuration('left') > 0.0)
        dir.x -= 1.0;
      if(Keyboard.actionDuration('right') > 0.0)
        dir.x += 1.0;

      dir.normalize();

      this.previousVel.lerp(dir, move.lerp);
      DEBUG('prevVel', this.previousVel.x, this.previousVel.y);
      
      position.add(this.previousVel.clone().multiplyScalar(elapsed * this.move.speed));







      // mouse
      var mouseCoords = this.game.camera.screenToWorldPosition(Mouse.x, Mouse.y);
      var v = new Three.Vector2(mouseCoords[0] - position.x, mouseCoords[1] - position.y);
      v.normalize();
      var angle = Math.atan2(v.y, v.x);

      instance.rotation.z = angle;

      if(this.shootCounter > 0.0)
        this.shootCounter -= elapsed;

      if(Mouse.isButtonDown('left')) {
        this.shoot();
      }
    },

    draw: function() {},



    shoot: function() {
      if(this.shootCounter > 0.0)
        return;
      this.shootCounter = this.shooting.delay;

      var instance = this.instance,
          position = instance.position,
          angle = instance.rotation.z;
      var p = new Projectile(this.game, this, {
        x: position.x,
        y: position.y,
        dirX: Math.cos(angle),
        dirY: Math.sin(angle),
        size: this.shooting.size,
        speed: this.shooting.speed,
        color: this.shooting.color === 'random' ? Color.random() : Color[this.shooting.color]
      });

      this.game.projectiles.push(p);
    }

  });

  return Ship;
});