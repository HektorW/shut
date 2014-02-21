define([
  'dom',
  'underscore',
  'controls/controls',
], function(
  $,
  _,
  Controls
  ) {




  var Keyboard = Controls.extend({

    // vars
    $window: null,

    // default keybindings
    keybindings: {
      'w': {
        action: 'up',
        startedAt: null
      },
      's': {
        action: 'down',
        startedAt: null
      },
      'a': {
        action: 'left',
        startedAt: null
      },
      'd': {
        action: 'right',
        startedAt: null
      }
    },

    _pressed: {},
    //------

    // functions
    __init__: function(opt) {
      this.supr(opt);

      this.bindEvents();
    },

    bindEvents: function() {
      this.$window = $(window);
      
      _.bindAll(this,
        'keyup',
        'keydown'
      );

      this.$window
        .on('keyup', this.keyup)
        .on('keydown', this.keydown);
    },


    // event listeners
    keydown: function(event) {
      var keyCode = event.keyCode;
      this._pressed[keycodes[keyCode]] = true;
      var binding = this.keycodeBinding(keyCode);
      if(!binding || binding.startedAt) {
        this.trigger('key:'+keycodes[keyCode]+':down');
        return;
      }

      binding.startedAt = window.performance.now();
      this.trigger(binding.action + ':start', {
        startedAt: binding.startedAt
      });
    },
    keyup: function(event) {
      var keyCode = event.keyCode;
      this._pressed[keycodes[keyCode]] = false;
      var binding = this.keycodeBinding(keyCode);
      if(!binding || !binding.startedAt) {
        this.trigger('key:'+keycodes[keyCode]+':up');
        return;
      }
      

      this.trigger(binding.action + ':end', {
        startedAt: binding.startedAt,
        duration: window.performance.now() - binding.startedAt
      });
      binding.startedAt = null;
    },
    keycodeBinding: function(keycode) {
      var key = keycodes[keycode];
      return this.keybindings[key];
    },

    isKeyDown: function(key) {
      return this._pressed[key];
    },

    actionDuration: function(action) {
      var key,
          binding = null,
          bindings = this.keybindings;
      for(key in bindings) {
        if(!bindings.hasOwnProperty(key))
          continue;

        binding = bindings[key];
        if(binding.action === action)
          break;
        binding = null;
      }
      if(binding.startedAt) {
        return window.performance.now() - binding.startedAt;
      }
      return 0;
    }

  });




  var keycodes = {
    '8': 'backspace',
    '9': 'tab',
    '13': 'enter',
    '16': 'shift',
    '17': 'ctrl',
    '18': 'alt',
    '19': 'pause/break',
    '20': 'caps lock',
    '27': 'escape',
    '33': 'page up',
    '34': 'page down',
    '35': 'end',
    '36': 'home',
    '37': 'left arrow',
    '38': 'up arrow',
    '39': 'right arrow',
    '40': 'down arrow',
    '45': 'insert',
    '46': 'delete',
    '48': '0',
    '49': '1',
    '50': '2',
    '51': '3',
    '52': '4',
    '53': '5',
    '54': '6',
    '55': '7',
    '56': '8',
    '57': '9',
    '65': 'a',
    '66': 'b',
    '67': 'c',
    '68': 'd',
    '69': 'e',
    '70': 'f',
    '71': 'g',
    '72': 'h',
    '73': 'i',
    '74': 'j',
    '75': 'k',
    '76': 'l',
    '77': 'm',
    '78': 'n',
    '79': 'o',
    '80': 'p',
    '81': 'q',
    '82': 'r',
    '83': 's',
    '84': 't',
    '85': 'u',
    '86': 'v',
    '87': 'w',
    '88': 'x',
    '89': 'y',
    '90': 'z',
    '91': 'left window key',
    '92': 'right window key',
    '93': 'select key',
    '96': 'numpad 0',
    '97': 'numpad 1',
    '98': 'numpad 2',
    '99': 'numpad 3',
    '100': 'numpad 4',
    '101': 'numpad 5',
    '102': 'numpad 6',
    '103': 'numpad 7',
    '104': 'numpad 8',
    '105': 'numpad 9',
    '106': 'multiply',
    '107': 'add',
    '109': 'subtract',
    '110': 'decimal point',
    '111': 'divide',
    '112': 'f1',
    '113': 'f2',
    '114': 'f3',
    '115': 'f4',
    '116': 'f5',
    '117': 'f6',
    '118': 'f7',
    '119': 'f8',
    '120': 'f9',
    '121': 'f10',
    '122': 'f11',
    '123': 'f12',
    '144': 'num lock',
    '145': 'scroll lock',
    '186': 'semi-colon',
    '187': 'equal sign',
    '188': 'comma',
    '189': 'dash',
    '190': 'period',
    '191': 'forward slash',
    '192': 'grave accent',
    '219': 'open bracket',
    '220': 'back slash',
    '221': 'close braket',
    '222': 'single quote'
  };



  return Keyboard;
});

