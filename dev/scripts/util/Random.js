define([], function() {
  var random = Math.random,
      floor = Math.floor;

  var Random = {
    randomint: function(min, max) {
      return floor(randomfloat(min, max));
    },

    randomfloat: function(min, max) {
      return random() * (max - min) + min;
    }
  };

  return Random;
});