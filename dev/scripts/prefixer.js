define([], function() {
  
  var _vendors = ['o', 'ms', 'moz', 'webkit'],
      _all_prefixed = false;

  function capitalize(str) {
    return str[0].toUpperCase() + str.substr(1);
  }

  function prefix(obj, functionName, fallback) {
    var i, fn, cap;

    obj = obj || {};

    // if it already exists we are cool
    if(obj[functionName])
      return;

    cap = capitalize(functionName);

    for(i = _vendors.length; i--; ) {
      fn = obj[_vendors[i] + cap];

      if(fn) {
        obj[functionName] = fn;
        return;
      }
    }

    obj[functionName] = fallback;
  }

  function prefixAll() {
    if(_all_prefixed)
      return;

    prefix(window, 'requestAnimationFrame', function(callback) {
      setTimeout(function() {
        callback(window.performance.now());
      }, 16);
    });
    prefix(window, 'cancelAnimationFrame', function(id) {
      clearTimeout(id);
    });

    prefix(window.performance, 'now', Date.now);

    prefix(window.navigator, 'getGamepads', function() {});

    _all_prefixed = true;
  }

  function prefixedCss(property, value) {
    var res = '', i, cap;
    cap = capitalize(property);
    for(i = _vendors.length; i--; )
      res += '-' + _vendors[i] + '-' + cap + ':' + value + ';';
    return res + property + ':' + value + ';';
  }
  
  return {
    prefix: prefix,
    prefixAll: prefixAll,
    prefixedCss: prefixedCss
  };
});