define([
  'threejs',
  'util/Color',

  'objects/BaseObject',
  'objects/Projectile',
  'objects/DoubleProjectile',
  'objects/ExplosiveProjectile',

  'controls/keyboard',
  'controls/mouse',
  'controls/gamepad'
], function(
  Three,
  Color,

  BaseObject,
  Projectile,
  DoubleProjectile,
  ExplosiveProjectile,

  Keyboard,
  Mouse,
  Gamepad
) {

  var Ship = BaseObject.extend({


    // methods
    __init__: function(game) {
      this.supr(game);

      window.ship = this;

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
        speed: 20.0,
        size: 0.15,
        color: 'yellow'
      };
      this.shootCounter = 0.0;

      this.bindEvents();
      this.loadFire();

      this.activeProjectile = Projectile;

      // three instance
      this.width = 1.0;
      this.height = 1.0;
      this.geometry = new Three.CubeGeometry(this.width, this.height, 1.0);
      this.loadMaterials();

      this.instance = new Three.Mesh(this.geometry, this.material);
      this.instance.position.z = 1.0;
      this.game.scene.add(this.instance);


      this.xRotationTarget = 0.0;
      this.xRotation = 0.0;
      this.xRotationSpeed = 8.0;

      this.color = this.shooting.color;
      this.targetColor = this.color;

      this.animationCount = 0.0;
      this.animationCountDelay = 0.5;
    },



    bindEvents: function() {
      Keyboard.on('key:1:down', function() {
        this.activeProjectile = Projectile;
        this.xRotationTarget += Math.PI * 1;
        this.targetColor = 'yellow';
        this.animationCount = this.animationCountDelay;
      }, this);
      Keyboard.on('key:2:down', function() {
        this.activeProjectile = DoubleProjectile;
        this.xRotationTarget += Math.PI * 1;
        this.targetColor = 'purple';
        this.animationCount = this.animationCountDelay;
      }, this);
      Keyboard.on('key:3:down', function() {
        this.activeProjectile = ExplosiveProjectile;
        this.xRotationTarget += Math.PI * 1;
        this.targetColor = 'maroon';
        this.animationCount = this.animationCountDelay;
      }, this);
    },



    loadMaterials: function() {
      this.materials = {
        ship1: new Three.MeshPhongMaterial({
          map: Three.ImageUtils.loadTexture('res/mockups/ship1.png'),
          transparent: true
        }),
        ship2: new Three.MeshPhongMaterial({
          map: Three.ImageUtils.loadTexture('res/mockups/ship2.png'),
          transparent: true
        }),
        ship3: new Three.MeshPhongMaterial({
          map: Three.ImageUtils.loadTexture('res/mockups/ship3.png'),
          transparent: true
        }),
        ship4: new Three.MeshPhongMaterial({
          map: Three.ImageUtils.loadTexture('res/mockups/ship4.png'),
          transparent: true
        }),
        ship5: new Three.MeshPhongMaterial({
          map: Three.ImageUtils.loadTexture('res/mockups/ship5.png'),
          transparent: true
        }),
        default: new Three.MeshPhongMaterial({
          map: Three.ImageUtils.loadTexture('res/ship.png'),
          transparent: true
        }),
        orange: new Three.MeshPhongMaterial({
          color: Color.orange,
          ambient: Color.orange,
          specular: Color.orange,
          shading: Three.FlatShading
        })
      };

      this.material = this.materials.orange;
    },


    loadFire: function() {
      this.fires = [
        new Three.MeshPhongMaterial({
          map: Three.ImageUtils.loadTexture('res/mockups/fire1.png'),
          transparent: true
        }),
        new Three.MeshPhongMaterial({
          map: Three.ImageUtils.loadTexture('res/mockups/fire2.png'),
          transparent: true
        }),
        new Three.MeshPhongMaterial({
          map: Three.ImageUtils.loadTexture('res/mockups/fire3.png'),
          transparent: true
        })
      ];
      this.fire = new Three.Mesh(
        new Three.CubeGeometry(0.5, 0.5, 0.5),
        this.fires[0]
      );
      this.game.scene.add(this.fire);

      this.fireIndex = 0;
      this.fireDelay = 0.1;
      this.fireCounter = 0.0;
    },


    update: function(time) {
      this.supr();

      this.updateMovement(time);
      this.updateControls(time);

      this.instance.matrixAutoUpdate = false;


      var mz = new Three.Matrix4();
      mz.makeRotationZ(this.angle);
      var mx = new Three.Matrix4();

      if (this.xRotation < this.xRotationTarget) {
        this.xRotation += time.elapsed * this.xRotationSpeed;
        if (this.xRotation > this.xRotationTarget) {
          this.xRotation = this.xRotationTarget;
        }


        mx.makeRotationX(this.xRotation);
      }


      if (this.animationCount > 0.0) {
        this.animationCount -= time.elapsed;

        var color, delta;

        if (this.animationCount <= 0.0) {
          this.animationCount = 0.0;
          this.color = this.targetColor;
          color = Color[this.color];
          delta = 1;
        } else {
          delta = 1 - this.animationCount / this.animationCountDelay;
          color = Color.lerp(Color[this.color], Color[this.targetColor], delta);
        }


        // window.DEBUG('color', Color.toHexStr(color));

        this.material.color.setHex(color);
        this.material.ambient.setHex(color);
        this.material.specular.setHex(color);
      }



      var mt = new Three.Matrix4();
      mt.makeTranslation(this.instance.position.x, this.instance.position.y, 0);


      var m = new Three.Matrix4();
      m.multiply(mt);
      m.multiply(mz);
      m.multiply(mx);


      this.instance.matrixWorld = m;
      this.instance.updateMatrixWorld();


      this.checkBounds();
      this.updateFireAnimation(time);

      this.updateShooting(time);
    },

    updateMovement: function(time) {
      var instance = this.instance,
        position = instance.position,
        elapsed = time.elapsed;

      var dir = new Three.Vector3(0, 0, 0);

      if (Keyboard.actionDuration('up') > 0.0)
        dir.y -= 1.0;
      if (Keyboard.actionDuration('down') > 0.0)
        dir.y += 1.0;
      if (Keyboard.actionDuration('left') > 0.0)
        dir.x -= 1.0;
      if (Keyboard.actionDuration('right') > 0.0)
        dir.x += 1.0;


      if (Gamepad.isConnected()) {
        dir.x = Gamepad.getLeftX() || 0.0;
        dir.y = Gamepad.getLeftY() || 0.0;
      }

      // window.DEBUG('dir', dir.x, dir.y);
      // window.DEBUG('dirlen', dir.length());


      dir.normalize();
      this.previousVel.lerp(dir, this.move.lerp);
      position.add(this.previousVel.clone().multiplyScalar(elapsed * this.move.speed));

      // flag if user is moving
      this.moving = dir.length() > 0.0;
    },

    updateControls: function() {
      var position = this.instance.position;

      // mouse
      var mouseCoords = this.game.camera.screenToWorldPosition(Mouse.x, Mouse.y);
      var v = new Three.Vector2(mouseCoords[0] - position.x, mouseCoords[1] - position.y);
      v.normalize();
      var angle = this.angle = Math.atan2(v.y, v.x);

      this.angle = angle;

      // this.instance.rotation.z = angle;
      // this.instance.rotateZ(angle);
    },

    updateFireAnimation: function(time) {
      var elapsed = time.elapsed,
        angle = this.angle,
        position = this.instance.position;

      this.fireCounter -= elapsed;
      if (this.fireCounter < 0.0) {
        this.fireCounter += this.fireDelay;
        this.fireIndex = ++this.fireIndex % this.fires.length;
        this.fire.material = this.fires[this.fireIndex];
      }

      this.fire.visible = this.moving && false;
      this.fire.rotation.z = angle;
      this.fire.position.x = position.x - Math.cos(angle) * (this.width - 0.25);
      this.fire.position.y = position.y - Math.sin(angle) * (this.width - 0.25);
    },


    updateShooting: function(time) {
      var elapsed = time.elapsed;

      if (this.shootCounter > 0.0)
        this.shootCounter -= elapsed;

      if (Mouse.isButtonDown('left') || Gamepad.isButtonDown('RIGHT_SHOULDER_BOTTOM') > 0.0) {
        this.shoot();
      }
    },

    checkBounds: function() {
      var bounds = this.game.camera.getFrustumBounds(),
        position = this.instance.position;

      if (position.x - this.width < bounds.x) {
        position.x = bounds.x + this.width;
      }
      if (position.x + this.width > bounds.x + bounds.width) {
        position.x = bounds.x + bounds.width - this.width;
      }
      if (position.y - this.height < bounds.y) {
        position.y = bounds.y + this.height;
      }
      if (position.y + this.height > bounds.y + bounds.height) {
        position.y = bounds.y + bounds.height - this.height;
      }
    },


    shoot: function() {
      if (this.shootCounter > 0.0)
        return;
      // this.shootCounter = this.shooting.delay;
      this.shootCounter = this.activeProjectile.delay;

      var instance = this.instance,
        position = instance.position,
        angle = this.angle; //instance.rotation.z;
      var p = new this.activeProjectile(this.game, this, {
        x: position.x + (Math.cos(angle) * (this.width / 2)),
        y: position.y + (Math.sin(angle) * (this.width / 2)),
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