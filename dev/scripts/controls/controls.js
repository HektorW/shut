define([
  'underscore',
  'classy',
  'events'
], function(
  _,
  Classy,
  Events
  ) {
  
  var Controls = Classy.extend({});
  _.extend(Controls, Events);

  return Controls;  

});