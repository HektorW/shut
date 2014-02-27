define([
  'threejs',

  'objects/Projectile',

  'util/Color',
  'time'
], function(
  Three,
  Projectile,
  Color,
  Time
) {
  
  var ExplosiveProjectile = Projectile.extend({

    __init__: function(game, ship, settings) {
      this.supr(game, ship, settings);
    },

    initInstances: function() {

    },

    update: function() {
      this.supr();
    },

  });



  return ExplosiveProjectile;
});