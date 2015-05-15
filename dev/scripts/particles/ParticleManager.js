define([
  'threejs',
  'util/Color',

  'classy',

  'particles/Particle'
], function(
  Three,
  Color,

  Classy,

  Particle
) {

  var ParticleManager = Classy.extend({

    __init__: function(scene) {
      this.scene = scene;

      this.reset();
    },

    reset: function() {
      this.particles = [];
    },

    addParticle: function(particle) {
      this.particles.push(particle);
      this.scene.add(particle.instance);
    },


    update: function(time) {
      var particle;
      var particles = this.particles
      var scene = this.scene;

      for(var i = particles.length; i--; ) {
        particle = particles[i];
        particle.update(time);

        if(!particle.alive) {
          scene.remove(particle.instance);
          particles.splice(i, 1);
        }
      }
    }

  });

  return ParticleManager;
});