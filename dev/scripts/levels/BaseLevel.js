define([
  'threejs',
  'util/Color',

  'classy',

  'camera',
  'collisions',

  'particles/ParticleManager',

  'objects/Ship'
], function(
  Three,
  Color,

  Classy,

  Camera,
  Collision,

  ParticleManager,

  Ship
) {

  var BaseLevel = Classy.extend({

    __init__: function(game) {
      this.game = game;

      this.scene = null;
      this.camera = null;
      this.particleManager = null;

      this.ship = null;

      this.projectiles = null;
      this.enemies = null;
    },


    init: function() {
      this.scene = new Three.Scene();
      this.camera = new Camera();
      this.particleManager = new ParticleManager(this.scene);

      this.ship = new Ship(this);

      this.projectiles = [];
      this.enemies = [];
    },

    resize: function() {
      this.camera.updateProjection();
    },


    update: function(time) {
      this.ship.update(time);
      this.updateEnemies(time);

      this.updateProjectiles(time);

      this.particleManager.update(time);

      this.updateLevel(time);
    },

    draw: function(renderer) {
      renderer.render(this.scene, this.camera.camera);
    },


    // Override to update level specific logic
    updateLevel: function(time) {},


    updateEnemies: function(time) {
      var enemies = this.enemies;
      var scene = this.scene;

      for (var i = enemies.length; i--; ) {
        var enemy = enemies[i];

        enemy.update(time);

        if (!enemy.alive) {
          scene.remove(enemy.instance);
          enemies.splice(i, 1);
        }
      }
    },

    updateProjectiles: function(time) {
      var i, projectile,
        projectiles = this.projectiles;
      for (i = projectiles.length; i--;) {
        projectile = projectiles[i];

        projectile.update(time);

        this.checkProjectileCollisions(projectile);

        if (!projectile.alive) {
          projectile.remove();
          projectiles.splice(i, 1);
        }
      }
    },

    checkProjectileCollisions: function(projectile) {
      var p_bounds = projectile.getCollisionBounds();
      var enemies = this.enemies;

      for (var i = enemies.length; i--;) {
        var enemy = enemies[i];

        if (!enemy.alive) continue;

        var b_bounds = enemy.getCollisionBounds();

        if (Collision.collision(p_bounds, b_bounds)) {
          projectile.onHit(enemy);
          enemy.onHit(projectile);
        }
      }
    },

  });

  return BaseLevel;
});