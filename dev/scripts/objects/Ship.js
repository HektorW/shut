define([
  'threejs',
  'util/Color',
  'time',

  'objects/BaseObject',
  'objects/Projectile',
  'objects/DoubleProjectile',
  'objects/ExplosiveProjectile',

  'controls/keyboard',
  'controls/mouse'
], function(
  Three,
  Color,
  Time,

  BaseObject,
  Projectile,
  DoubleProjectile,
  ExplosiveProjectile,

  Keyboard,
  Mouse
) {

  var Ship = BaseObject.extend({

    // vars


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
      this.loadCrosshair();

      this.activeProjectile = Projectile;

      // three instance
      this.width = 1.0;
      this.height = 1.0;
      this.geometry = new Three.CubeGeometry(this.width, this.height, 1.0);
      this.loadMaterials();

      this.instance = new Three.Mesh(this.geometry, this.material);
      this.instance.position.z = 1.0;
      this.game.scene.add(this.instance);
    },



    bindEvents: function() {
      Keyboard.on('key:1:down', function() {
        this.activeProjectile = Projectile;
      }, this);
      Keyboard.on('key:2:down', function() {
        this.activeProjectile = DoubleProjectile;
      }, this);
      Keyboard.on('key:3:down', function() {
        this.activeProjectile = ExplosiveProjectile;
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


    loadCrosshair: function() {
      this.crossHair = new Three.Mesh(
        new Three.CubeGeometry(0.7, 0.7, 0.7),
        new Three.MeshPhongMaterial({
          // map: Three.ImageUtils.loadTexture('res/mockups/crossHair.png'),
          map: Three.ImageUtils.loadTexture('res/crosshair4.png'),
          transparent: true
        })
      );
      this.game.scene.add(this.crossHair);
    },

    update: function() {
      this.supr();

      this.updateMovement();
      
      this.checkBounds();

      this.updateControls();

      this.updateFireAnimation();

      this.updateShooting();
      
    },

    updateMovement: function() {
      var instance = this.instance,
        position = instance.position,
        elapsed = Time.elapsed;

      var dir = new Three.Vector3(0, 0, 0);

      if (Keyboard.actionDuration('up') > 0.0)
        dir.y -= 1.0;
      if (Keyboard.actionDuration('down') > 0.0)
        dir.y += 1.0;
      if (Keyboard.actionDuration('left') > 0.0)
        dir.x -= 1.0;
      if (Keyboard.actionDuration('right') > 0.0)
        dir.x += 1.0;

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

      this.instance.rotation.z = angle;

      this.crossHair.position.x = mouseCoords[0];
      this.crossHair.position.y = mouseCoords[1];
    },

    updateFireAnimation: function() {
      var elapsed = Time.elapsed,
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


    updateShooting: function() {
      var elapsed = Time.elapsed;

      if (this.shootCounter > 0.0)
        this.shootCounter -= elapsed;

      if (Mouse.isButtonDown('left')) {
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
          angle = instance.rotation.z;
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