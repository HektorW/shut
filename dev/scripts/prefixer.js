define([], function() {
  
  var vendors = ['o', 'ms', 'moz', 'webkit'];

  function capitalize(str) {
    return str[0] + str.substr(1);
  }

  function prefix(obj, functionName, fallback) {
    var i, fn, cap;

    obj = obj || {};

    if(obj[functionName]) {
      // if it already exists we are cool
      return;
    }

    cap = capitalize(functionName);

    for(i = vendors.length; i--; ) {
      fn = obj[vendors[i] + cap];

      if(fn) {
        obj[functionName] = fn;
        return;
      }
    }

    obj[functionName] = fallback;
  }

  function prefixAll() {
    prefix(window, 'requestAnimationFrame', function(callback) {
      setTimeout(function() {
        callback(window.performance.now());
      }, 16);
    });
    prefix(window, 'cancelAnimationFrame', function(id) {
      clearTimeout(id);
    });

    prefix(window.performance, 'now', Date.now);
  }

  function prefixedCss(property, value) {
    var res = '', i, cap;
    cap = capitalize(property);
    for(i = vendors.length; i--; )
      res += '-' + vendors[i] + '-' + cap + ':' + value + ';';
    return res + property + ':' + value + ';';
  }
  
  return {
    prefix: prefix,
    prefixAll: prefixAll,
    prefixedCss: prefixedCss
  };
});