define([], function() {
  'use strict';

  var _slice = Array.prototype.slice,

      _formatRgx = /\{(\d*)\}/g;

  var StringUtil = {
    format: function(str /*, arg1, arg2 ... */) {
      var args;

      args = _slice.call(arguments, 1);

      return str.replace(_formatRgx, function(match, p1) {
        return p1 in args ? args[p1] : match;
      });
    }
  };
  
  return StringUtil;
});

