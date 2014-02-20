define([
  'underscore',
  'classy',
  'events'
], function(
  _,
  Classy,
  Events
  ) {
  
  var Controls = Classy.extend({
    __init__: function() {}
  });
  _.extend(Controls.prototype, Events);

  return Controls;  

});