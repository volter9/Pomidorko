<<<<<<< HEAD
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.pomidorko = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var utils  = require('./helpers/utils'),
    ls     = require('./helpers/ls');

var Settings = require('./models/settings'),
    Model    = require('./mvc/model');

/**
 * @param {String} id
 * @return {Object}
 */
var fetchData = function (config, id) {
    return utils.merge(
        config.defaults[id], 
        ls.fetch(id)
    );
};

/**
 * @return {Object}
 */
var bootstrap = module.exports = function (config) {
    var settings = new Settings(fetchData(config, 'settings')),
        goals    = new Model(fetchData(config, 'goals'));
    
    settings.on('change', function () {
        ls.save(settings.id, settings.all());
    });
    
    goals.on('change', function () {
        ls.save(goals.id, goals.all());
    });
    
    return {
        settings: settings,
        goals:    goals
    };
};

/**
 * Reset in early morning at 6 AM
 */
bootstrap.reset = function () {
    var goals = ls.fetch('goals');
    
    if (!goals || !goals.start) {
        return;
    }
    
    var start = new Date(goals.start),
        now   = new Date();
    
    if (
        now.getDate() !== start.getDate() && 
        now.getHours() >= 6
    ) {
        ls.remove('goals');
    }
};
},{"./helpers/ls":25,"./helpers/utils":29,"./models/settings":31,"./mvc/model":33}],2:[function(require,module,exports){
var Component = require('./component');

module.exports = Component.extend({
    /**
     * @param {Node} button
     * @param {Node} container
     */
    constructor: function (button, container) {
        this.button = button;
        this.container = container;
    },
    
    activate: function () {
        var callback = this.toggle.bind(this);
        
        this.button.addEventListener('click', callback);
        this.container.querySelector('.pa-close')
                      .addEventListener('click', callback);
    },
    
    toggle: function () {
        var toggle = this.container.classList.contains('hidden');
        
        this.container.classList.toggle('hidden');
        this.container.classList.toggle('pa-about-appear', toggle);
        this.container.classList.toggle('pa-about-disappear', !toggle);
    }
});
},{"./component":3}],3:[function(require,module,exports){
var Component = function () {};

Component.extend = require('../mvc/extend')(Component);

module.exports = Component;
},{"../mvc/extend":32}],4:[function(require,module,exports){
var Component = require('./component');

module.exports = Component.extend({
    /**
     * @param {Node} link
     * @param {pomidorko.Timer} timer
     * @param {mvc.Model} goals
     */
    constructor: function (link, timer, goals) {
        this.link = link;
        this.timer = timer;
        this.goals = goals;
    },
    
    activate: function () {
        this.timer.on('stop', this.change.bind(this));
        
        this.change();
    },
    
    change: function () {
        var icon = this.goals.get('recess') ? 'break.ico' : 'work.ico';
        
        this.link.href = 'assets/img/' + icon;
    }
});
},{"./component":3}],5:[function(require,module,exports){
var Component = require('./component');

module.exports = Component.extend({
    /**
     * @param {Node} label
     * @param {mvc.Model} goals
     * @param {pomidorko.Settings} settings
     */
    constructor: function (label, goals, settings) {
        this.label = label;
        this.goals = goals;
        this.settings = settings;
    },
    
    activate: function () {
        var callback = this.render.bind(this);
        
        this.goals.on('change', callback);
        this.settings.on('change', callback);
        
        this.render();
    },
    
    render: function () {
        var current = this.goals.get('current'),
            total   = this.settings.get('total');
        
        this.label.querySelector('.pa-current').innerHTML = current;
        this.label.querySelector('.pa-total').innerHTML   = total;
    }
});
},{"./component":3}],6:[function(require,module,exports){
module.exports = {
    Notifications: require('./notifications'),
    PlayPause:     require('./play-pause'),
    Settings:      require('./settings'),
    TickTock:      require('./tick-tock'),
    Favicon:       require('./favicon'),
    About:         require('./about'),
    Goals:         require('./goals'),
    Scale:         require('./scale'),
    Sound:         require('./sound'),
    State:         require('./state'),
    Title:         require('./title'),
    Time:          require('./time'),
    Skip:          require('./skip'),
    Save:          require('./save')
};
},{"./about":2,"./favicon":4,"./goals":5,"./notifications":7,"./play-pause":8,"./save":9,"./scale":10,"./settings":11,"./skip":12,"./sound":13,"./state":14,"./tick-tock":15,"./time":16,"./title":17}],7:[function(require,module,exports){
var Component = require('./component'),
    notify    = require('../notify'),
    lang      = require('../helpers/language');

module.exports = Component.extend({
    /**
     * @param {pomidorko.Timer} timer
     * @param {mvc.Model} goals
     * @param {pomidorko.Settings} settings
     */
    constructor: function (timer, goals, settings) {
        this.timer = timer;
        this.goals = goals;
        this.settings = settings;
    },
    
    activate: function () {
        var self = this;
        
        this.timer.on('stop', this.notify.bind(this));
        this.settings.on('change', function () {
            if (self.settings.get('notifications') === true) {
                notify.request();
            }
        });
    },
    
    notify: function () {
        if (!this.settings.get('notifications')) {
            return;
        }
        
        var key = this.goals.get('recess') ? 'recess' : 'pomidorko';
        
        notify.notify(lang.get(key));
    }
});
},{"../helpers/language":24,"../notify":35,"./component":3}],8:[function(require,module,exports){
var Component = require('./component');

module.exports = Component.extend({
    /**
     * @param {Node} control
     * @param {pomidorko.Timer} timer
     */
    constructor: function (control, timer) {
        this.control = control;
        this.timer   = timer;
        this.icon    = control.querySelector('.pa-icon');
    },
    
    activate: function () {
        var self = this;
        
        this.timer.on('stop', function () {
            self.toggleState(true);
        });
        
        this.timer.on('start', function () {
            self.toggleState(false);
        });
        
        this.control.addEventListener('click', function () {
            var toggle = self.timer.isRunning();
            
            self.toggle(toggle);
            self.toggleState(toggle);
        });
    },
    
    /**
     * @param {Boolean} toggle
     */
    toggle: function (toggle) {
        toggle ? this.timer.pause()
               : this.timer.start();
    },
    
    /**
     * @param {Boolean} toggle
     */
    toggleState: function (toggle) {
        var icon = this.icon;
        
        icon.classList.toggle('pa-pause', !toggle);
        icon.classList.toggle('pa-play',  toggle);
        
        this.control.classList.toggle('pa-play', toggle);
    }
});
},{"./component":3}],9:[function(require,module,exports){
var Component = require('./component');

module.exports = Component.extend({
    /**
     * @param {pomidorko.Timer} timer
     * @param {mvc.Model} goals
     */
    constructor: function (timer, goals) {
        this.timer = timer;
        this.goals = goals;
    },
    
    activate: function () {
        var timer = this.timer,
            goals = this.goals;
    
        window.addEventListener('beforeunload', function () {
            var remained = timer.getRemained();
        
            if (remained >= 0) {
                goals.set('remained', remained);
            }
        });
    },
})
},{"./component":3}],10:[function(require,module,exports){
var Component = require('./component');

module.exports = Component.extend({
    /**
     * @param {Node} scale
     * @param {pomidorko.Timer} timer
     */
    constructor: function (scale, timer) {
        this.scale = scale;
        this.timer = timer;
    },
    
    activate: function () {
        this.timer.on('tick', this.render.bind(this));
        this.timer.on('start', this.render.bind(this));
        
        this.render(this.timer.getTime());
    },
    
    /**
     * @param {Number} timer
     */
    render: function (time) {
        pos = time / 60 / 55 * 3300;
        
        this.scale.style.marginLeft = -pos + 'px';
    }
});
},{"./component":3}],11:[function(require,module,exports){
var Component = require('./component'),
    Controls  = require('../controls'),
    utils     = require('../helpers/utils'),
    View      = require('../mvc/view');

module.exports = Component.extend({
    /**
     * Initialize the view
     * 
     * @param {Node} butotn
     * @param {Node} view
     * @param {pomidorko.Settings} settings
     */
    constructor: function (button, view, settings) {
        this.button = button;
        this.view = view;
        this.settings = settings;
    },
    
    activate: function () {
        this.button.addEventListener('click', this.toggle.bind(this));
        this.settings.on('change', this.render.bind(this));
    
        var settings = this.settings,
            controls = this.view.querySelectorAll('.pa-control, .pa-bool');
    
        this.fields = utils.toArray(controls).map(function (node) {
            return new Controls[node.dataset.type](node, {settings: settings});
        });
        
        this.render();
    },
    
    /**
     * Toggle the view
     */
    toggle: function () {
        var hidden = this.view.classList.contains('hidden'),
            view   = this.view.classList;
    
        view.toggle('hidden');
        view.toggle('pa-settings-appear', hidden);
        view.toggle('pa-settings-disappear', !hidden);
    },

    /**
     * Render the view
     */
    render: function () {
        var data = this.settings.all();
        
        this.fields.forEach(function (field) {
            field.set(data[field.input.className]);
        });
    }
});
},{"../controls":20,"../helpers/utils":29,"../mvc/view":34,"./component":3}],12:[function(require,module,exports){
var Component = require('./component'),
    lang      = require('../helpers/language');

module.exports = Component.extend({
    /**
     * @param {Node} button
     * @param {pomidorko.Timer} timer
     * @param {mvc.Model} goals
     */
    constructor: function (button, timer, goals) {
        this.button = button.querySelector('span');
        this.timer = timer;
        this.goals = goals;
    },
    
    activate: function () {
        var self = this;
        
        this.button.addEventListener('click', function () {
            self.timer.stop();
        });
        
        this.goals.on('change', this.title.bind(this));
        this.title();
    },
    
    title: function () {
        var title = lang.get('skip')[+this.goals.get('recess')];
        
        this.button.innerHTML = title;
    }
});
},{"../helpers/language":24,"./component":3}],13:[function(require,module,exports){
var Component = require('./component');

module.exports = Component.extend({
    /**
     * @param {pomidorko.Timer} timer
     * @param {pomidorko.Settings} settings
     * @param {Audio} sound
     */
    constructor: function (timer, settings, sound) {
        this.timer = timer;
        this.settings = settings;
        this.sound = sound;
    },
    
    activate: function () {
        this.timer.on('stop', this.play.bind(this));
    },
    
    play: function () {
        if (!this.settings.get('sound')) {
            return;
        }
        
        this.sound.play();
    }
});
},{"./component":3}],14:[function(require,module,exports){
var Component = require('./component');

module.exports = Component.extend({
    /**
     * @param {Node} container
     * @param {pomidorko.Timer} timer
     * @param {mvc.Model} goals
     * @param {pomidorko.Settings} goals
     */
    constructor: function (container, timer, goals, settings) {
        this.container = container;
        this.settings = settings;
        this.timer = timer;
        this.goals = goals;
    },
    
    activate: function () {
        var self = this;
        
        this.timer.on('stop', function () {
            self.next();
            self.setup();
            self.timer.start();
        });
        
        this.setup();
    },
    
    setup: function () {
        var round  = this.goals.get('current'),
            recess = this.goals.get('recess');
        
        this.timer.setDuration(
            this.getTime(round, recess)
        );
        
        this.container.classList.toggle('resting', recess);
    },
    
    next: function () {
        var recess = !this.goals.get('recess'),
            round  = !!recess + this.goals.get('current');

        this.goals.merge({
            recess:   recess,
            current:  round,
            remained: false
        });
    },
    
    /**
     * @param {Number} round
     * @param {Number} recess
     * @return {Number}
     */
    getTime: function (round, recess) {
        var remained = this.goals.get('remained');
        
        if (remained) {
            return remained / 1000;
        }
        
        var time = recess ? this.settings.get('shortBreak')
                          : this.settings.get('time');
    
        if (recess && round % this.settings.get('round') === 0) {
            time = this.settings.get('longBreak');
        }
        
        return time * 60;
    }
});
},{"./component":3}],15:[function(require,module,exports){
var Component = require('./component');

module.exports = Component.extend({
    /**
     * @param {pomidorko.Timer} timer
     * @param {pomidorko.Settings} settings
     * @param {Audio} sound
     */
    constructor: function (timer, settings, sound) {
        this.timer = timer;
        this.sound = sound;
        this.settings = settings;
        
        this.enabled = false;
        this.last = null;
    },
    
    activate: function () {
        var self = this;
        
        this.timer.on('tick', this.tick.bind(this));
        this.settings.on('change', function () {
            self.enabled = self.settings.get('tick');
        });
        
        this.enabled = this.settings.get('tick');
    },
    
    /**
     * @param {Number} time
     */
    tick: function (time) {
        if (!this.enabled) {
            return;
        }
        
        var last = Math.floor(time % 60);
        
        if (
            this.last !== last && 
            this.last !== null
        ) {
            this.sound.play();
        }
        
        this.last = last;
    }
});
},{"./component":3}],16:[function(require,module,exports){
var Component = require('./component'),
    Time      = require('../helpers/time');

/**
 * @param {String} string
 * @param {String} object
 * @return {String}
 */
var pad = function (string, object) {
    return object.substr(string.length) + string;
};

module.exports = Component.extend({
    /**
     * @param {Node} label
     * @param {pomidorko.Timer} timer
     */
    constructor: function (label, timer) {
        this.min = label.querySelector('.pa-min');
        this.sec = label.querySelector('.pa-sec');
        
        this.timer = timer;
    },
    
    activate: function () {
        var self = this;
        
        this.timer.on('tick', this.render.bind(this));
        this.timer.on('start', function () {
            self.render(self.timer.getTime());
        });
        
        this.render(this.timer.getTime());
    },
    
    /**
     * @param {Number} time
     */
    render: function (time) {
        time = Time(time);
        
        this.min.innerHTML = time.min;
        this.sec.innerHTML = time.sec;
    }
});
},{"../helpers/time":27,"./component":3}],17:[function(require,module,exports){
var Component = require('./component'),
    Time      = require('../helpers/time'),
    lang      = require('../helpers/language');

module.exports = Component.extend({
    /**
     * @param {pomidorko.Timer} timer
     * @param {mvc.Model} goals
     */
    constructor: function (timer, goals) {
        this.timer = timer;
        this.goals = goals;
        this.last  = null;
    },
    
    activate: function () {
        this.timer.on('tick', this.tick.bind(this));
        
        this.tick(this.timer.getTime());
    },
    
    /**
     * @param {Number} time
     */
    tick: function (time) {
        time = Time(time);
    
        if (
            this.last !== time.sec &&
            this.last !== null 
        ) {
            var title = time.min + ':' + time.sec;
            
            title += ' · ' + lang.get(this.goals.get('recess') ? 'recess' : 'work');
            title += ' — ' + lang.get('title', 'помидорковый таймер');
            
            document.title = title;
        }
        
        this.last = time.sec;
    }
});
},{"../helpers/language":24,"../helpers/time":27,"./component":3}],18:[function(require,module,exports){
/**
 * Pomidorka application config
 */

var version = '1.0';

module.exports = {
    version: version,
    key:     'pomidorko',
    
    /** 
     * Default data for models 
     */
    defaults: {
        settings: {
            id: 'settings',
            
            shortBreak: 5,
            longBreak: 20,
            time: 25,
            
            version: version,
            round: 4,
            total: 12,
            
            sound: true,
            tick:  false,

            notifications: false
        },
        
        goals: {
            id: 'goals',
            
            remained: false,
            current:  0,
            recess:   false,
            start:    Date.now()
        }
    }
};
},{}],19:[function(require,module,exports){
var View   = require('../mvc/view'),
    utils  = require('../helpers/utils'),
    notify = require('../notify');

var Control = View.extend({
    /**
     * Initialize the view
     */
    initialize: function () {
        this.input = this.find('input');
        
        this.bind('span.pa-switch-on' , 'click', this.switchOn);
        this.bind('span.pa-switch-off', 'click', this.switchOff);
    },
    
    switchOn: function (dontUpdate) {
        this.node.classList.remove('pa-bool-off');
        this.node.classList.add('pa-bool-on');
        
        if (dontUpdate !== true) {
            this.data.settings.set(this.input.className, true);
            
            if (this.input.className === 'notifications') {
                notify.request();
            }
        }
    },
    
    switchOff: function (dontUpdate) {
        this.node.classList.remove('pa-bool-on');
        this.node.classList.add('pa-bool-off');
        
        if (dontUpdate !== true) {
            this.data.settings.set(this.input.className, false);
        }
    },
    
    set: function (value) {
        this.input.checked = value;
        
        value ? this.switchOn(true)
              : this.switchOff(true);
    }
});

module.exports = Control;
},{"../helpers/utils":29,"../mvc/view":34,"../notify":35}],20:[function(require,module,exports){
module.exports = {
    number: require('./number'),
    bool:   require('./bool')
};
},{"./bool":19,"./number":21}],21:[function(require,module,exports){
var View = require('../mvc/view');

var Control = View.extend({
    /**
     * Initialize the view
     */
    initialize: function () {
        var settings = this.data.settings,
            input    = this.find('input');
        
        this.input = input;
        this.bind('.plus',  'click', this.add);
        this.bind('.minus', 'click', this.sub);
        
        this.bind('input', 'change', function () {
            var value = parseInt(input.value);
            
            settings.set(input.className, isNaN(value) ? 0 : Math.round(value));
        });
    },
    
    /**
     * Add to current value
     */
    add: function (event) {
        this.perform(event, 1);
    },
    
    /**
     * Subtract from current value
     */
    sub: function (event) {
        this.perform(event, -1);
    },

    /**
     * Perform an operation
     * 
     * @param {Event} event
     * @param {Number} num
     */
    perform: function (event, num) {
        event.preventDefault();
        
        var value = parseInt(this.input.value) + num,
            event = document.createEvent('HTMLEvents');
        
        event.initEvent('change', null, false);
        
        this.input.value = isNaN(value) ? 0 : value;
        this.input.dispatchEvent(event);
    },
    
    set: function (value) {
        this.input.value = isNaN(value) ? 0 : Math.round(value);
    }
});

module.exports = Control;
},{"../mvc/view":34}],22:[function(require,module,exports){
var div = document.createElement('div');

var dom = module.exports = {
    /**
     * Toggle class
     * 
     * @param {Node} node
     * @param {String} className
     * @param {Boolean} toggle
     */
    toggle: function (node, className, toggle) {
        toggle = typeof toggle === 'undefined'
            ? !node.classList.contains(className)
            : toggle;
        
        node.classList.toggle(className, toggle);
    },
    
    add: function (node, className) {
        node.classList.add(className);
    },
    
    remove: function (node, className) {
        node.classList.remove(className);
    },

    /**
     * Create node from HTML
     * 
     * @param {String} html
     */
    createNode: function (html) {
        div.innerHTML = html;
    
        return div.children[0];
    },

    /**
     * Find first node by selector
     * 
     * @param {String} selector
     * @param {Node} node
     * @return {Node}
     */
    find: function (selector, node) {
        node = node || document;
    
        return node.querySelector(selector);
    },

    /**
     * Find all nodes by selector
     * 
     * @param {String} selector
     * @param {Node} node
     * @return {NodeList}
     */
    findAll: function (selector, node) {
        node = node || document;
    
        return node.querySelectorAll(selector);
    }
};
},{}],23:[function(require,module,exports){
var utils = require('./utils');

module.exports = function (proto) {
    /**
     * Bind an event
     * 
     * @param {String} event
     * @param {Function} callback
     */
    proto.on = function (event, callback) {
        if (!this._events) {
            this._events = {};
        }
        
        if (!this._events[event]) {
            this._events[event] = [];
        }
        
        this._events[event].push(callback);
    };
    
    /**
     * Emit an event
     * 
     * @param {String} event
     * @param {Array} args
     */
    proto.emit = function (event) {
        if (!this._events || !this._events[event]) {
            return;
        }
        
        var args = utils.toArray(arguments).slice(1);
    
        this._events[event].forEach(function (callback) {
            if (!callback) {
                return;
            }
        
            callback.apply(callback, args);
        });
    };
    
    return proto;
};
},{"./utils":29}],24:[function(require,module,exports){
module.exports = {
    strings: {},
    
    /**
     * Set strings
     * 
     * @param {Object} strings
     */
    set: function (strings) {
        this.strings = strings;
    },
    
    /**
     * Get localized string
     * 
     * @param {String} name
     * @param {String} defaults
     * @return {String}
     */
    get: function (name, defaults) {
        return name in this.strings ? this.strings[name] : defaults;
    }
};
},{}],25:[function(require,module,exports){
var config = require('../config'),
    ls     = window.localStorage;

module.exports = {
    storage: JSON.parse(ls.getItem(config.key)) || {},
    
    /**
     * @param {String} id
     * @return {Object}
     */
    fetch: function (id) {
        return this.storage[id] || {};
    },
    
    persist: function () {
        ls.setItem(config.key, JSON.stringify(this.storage));
    },
    
    /**
     * @param {String} id
     * @param {Object} data
     */
    save: function (id, data) {
        this.storage[id] = data;
        this.persist();
    },
    
    /**
     * @param {String} id
     */
    remove: function (id) {
        delete this.storage[id];
        
        this.persist();
    }
};
},{"../config":18}],26:[function(require,module,exports){
module.exports = {
   /**
    * Clamp the number between min and max
    * 
    * @param {Number} num
    * @param {Number} min
    * @param {Number} max
    * @return {Number}
    */
   clamp: function (num, min, max) {
       num = Math.min(max, num);
    
       return Math.max(min, num);
   },

   /**
    * Returns rounded random number between min and max
    * 
    * @param {Number} min
    * @param {Number} max
    * @return {Number}
    */
   random: function (min, max) {
       return Math.round(Math.random() * (max - min) + min);
   }
};
},{}],27:[function(require,module,exports){
/**
 * @param {String} string
 * @param {String} object
 * @return {String}
 */
var pad = function (string, object) {
   return object.substr(string.length) + string;
};

/**
 * @param {Number} time
 * @return {Object}
 */
module.exports = function (time) {
    var min = Math.floor(time / 60),
        sec = Math.floor(time % 60);

    sec = sec < 60 ? sec : 59;

    min = pad(min.toString(), '00'),
    sec = pad(sec.toString(), '00');
    
    return {
        min: min,
        sec: sec
    };
};
},{}],28:[function(require,module,exports){
/**
 * Get unique integer generator
 * 
 * @param {Number} i - counter
 * @return {Function}
 */
module.exports = function (i) {
    i = i || (i = 0);

    /**
     * Unique integer return
     * 
     * @return {
     */
    return function () {
        return ++i;
    };
};
},{}],29:[function(require,module,exports){
module.exports = {
    /**
     * Simple $.each, only for objects
     * 
     * @param {Object} object
     * @param {Function} callback
     */
    each: function (object, callback) {
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                callback(object[key], key);
            }
        }
    },

    /**
     * Get difference between two objects
     * 
     * @param {Object} a
     * @param {Object} b
     * @return {Object}
     */
    diff: function (a, b) {
        var c = {};
    
        for (var key in b) {
            if (typeof a[key] === 'undefined' || b[key] !== a[key]) {
                c[key] = b[key] || a[key];
            }
        }
    
        return c;
    },

    /**
     * Clone an object
     * 
     * @param {Object} object
     * @return {Object}
     */
    clone: function (object) {
        var copy = {};
        
        extend(copy, object);
        
        return copy;
    },

    /**
     * Merge two objects
     * 
     * @param {Object} a
     * @param {Object} b
     * @return {Object}
     */
    merge: function (a, b) {
        var c = {}, key;
    
        for (key in a) {
            c[key] = a[key];
        }
    
        for (key in b) {
            c[key] = b[key];
        }
    
        return c;
    },

    /**
     * Extend one object from other
     * 
     * @param {Object} a
     * @param {Object} b
     */
    extend: function (a, b) {
        for (var key in b) {
            a[key] = b[key];
        }
    },

    /**
     * Turn array-like object into real array
     * 
     * @param {Object} arrayLikeObject
     * @return {Array}
     */
    toArray: function (arrayLikeObject) {
        return Array.prototype.slice.call(arrayLikeObject);
    },

    /**
     * Pick keys from object
     * 
     * @param {Object} object
     * @param {Array} keys
     * @return {Object}
     */
    pick: function (object, keys) {
        var result = {};
    
        keys.forEach(function (key) {
            if (object[key]) {
                result[key] = object[key];
            }
        });
    
        return result;
    }
};
},{}],30:[function(require,module,exports){
/**
 * Pomidorko - 
 * 
 * @author volter9
 */

module.exports = {
    /** Namespaces/functions */
    components: require('./components'),
    bootstrap:  require('./bootstrap'),
    config:     require('./config'),
    lang:       require('./helpers/language'),
    dom:        require('./helpers/dom'),
    
    /** Separate classes */
    Timer: require('./timer')
};
},{"./bootstrap":1,"./components":6,"./config":18,"./helpers/dom":22,"./helpers/language":24,"./timer":36}],31:[function(require,module,exports){
var Model = require('../mvc/model'),
    math  = require('../helpers/math');

module.exports = Model.extend({
    /**
     * Filter data
     * 
     * @param {Object} data
     */
    filter: function (data) {
        data.shortBreak = math.clamp(data.shortBreak, 3, 10);
        data.longBreak  = math.clamp(data.longBreak, 5, 45);
        data.time       = math.clamp(data.time, 5, 55);
        
        data.total = math.clamp(data.total, 1, Infinity);
        data.round = math.clamp(data.round, 1, data.total);
    }
});
},{"../helpers/math":26,"../mvc/model":33}],32:[function(require,module,exports){
var utils = require('../helpers/utils');

/**
 * Helper function to make it easily extend other prototypes
 * 
 * @param {Function} proto
 * @return {Function}
 */
var extend = module.exports = function (proto) {
    /**
     * Closure
     * 
     * @param {Object} options
     * @return {Function}
     */
    return function (options) {
        var constructor = options.constructor;
        
        delete options.constructor;
        
        var F = function () {
            proto.apply(this, utils.toArray(arguments));
            
            if (constructor) {
                constructor.apply(this, arguments);
            }
        };
        
        F.prototype = Object.create(proto.prototype);
        
        utils.each(options, function (value, key) {
            F.prototype[key] = value;
        });
        
        F.extend = extend(F);
    
        return F;
    };
};
},{"../helpers/utils":29}],33:[function(require,module,exports){
var events = require('../helpers/events'),
    utils  = require('../helpers/utils'),
    unique = require('../helpers/unique')(),
    extend = require('./extend');

/**
 * @param {Object} data
 */
var Model = function (data) {
    var id = data && data.id ? data.id : -unique();
    
    if (data && data.id) {
        delete data.id;
    }
    
    data = utils.merge(this.data || {}, data || {});
    
    this.previous = utils.merge({}, data);
    this.data     = data;
    this.id       = id;
};

Model.prototype = {
    /**
     * Filter input data
     */
    filter: function (data) {},

    /**
     * Get the value by key in the model
     * 
     * @param {String} key
     * @return {Object}
     */
    get: function (key) {
        return typeof this.data[key] !== 'undefined' ? this.data[key] : false;
    },

    /**
     * Set the value by key
     * 
     * @param {String} key
     * @param {Object} value
     */
    set: function (key, value) {
        this.data[key] = value;
        this.filter(this.data);
    
        this.emit('change');
    },

    /**
     * Clear previous data cache
     */
    clear: function () {
        this.previous = utils.merge({}, this.data);
    },

    /**
     * Revert the changes
     */
    revert: function () {
        this.data = utils.merge({}, this.previous);
        this.emit('change');
    },

    /**
     * Get all data from 
     * 
     * @return {Object}
     */
    all: function () {
        return utils.merge(this.data, {});
    },

    /**
     * Get difference data from the `previous`
     * 
     * @return {Object}
     */
    diff: function () {
        return utils.diff(this.previous, this.data);
    },

    /**
     * Destroy the model
     */
    destroy: function () {
        this.data = {};
        this.id   = -unique();
    
        this.emit('destroy');
    },

    /**
     * Reset model with new set of data
     * 
     * @param {Object} data
     */
    reset: function (data) {
        this.data = data;
        this.filter(this.data);
    
        this.emit('change');
    },

    /**
     * Reset model with new set of data
     * 
     * @param {Object} data
     */
    merge: function (data) {
        if (data.id) {
            this.id = data.id;
        
            delete data.id;
        }
    
        this.data = utils.merge(this.data, data);
        this.filter(this.data);
    
        this.emit('change');
    },

    /**
     * Check whether the model is new
     * 
     * @return {Boolean}
     */
    isNew: function () {
        return this.id < 0;
    },

    /**
     * Check whether the model was modified
     * 
     * @return {Boolean}
     */
    isDirty: function () {
        return Object.keys(this.diff()).length > 0;
    },

    /**
     * Check whether the model was destroyed
     * 
     * @return {Boolean}
     */
    isEmpty: function () {
        return Object.keys(this.data).length === 0;
    }
}

Model.extend = extend(Model);

events(Model.prototype);

module.exports = Model;
},{"../helpers/events":23,"../helpers/unique":28,"../helpers/utils":29,"./extend":32}],34:[function(require,module,exports){
var extend = require('./extend');

/**
 * MVC view
 * 
 * This class is responsible for rendering data from models
 * 
 * @param {Node} node
 * @param {Object} data
 */
var View = function (node, data) {
    this.node = node;
    this.data = data;
    
    this.initialize();
};

View.prototype = {
    /** Methods that should be extended in subclasses */
    initialize: function () {},
    render: function () {},

    /**
     * Find an element by selector
     * 
     * @param {String} selector
     * @return {Node}
     */
    find: function (selector) {
        var node = this.node.querySelector(selector);
    
        if (!node) {
            console.warn('Could not find node by selector "' + selector + '"');
        }
    
        return node;
    },

    /**
     * Bind an event to specific element
     * 
     * @param {String|Node} selector
     * @param {String} event
     * @param {Function} callback
     */
    bind: function (selector, event, callback) {
        var node = selector instanceof Node ? selector : this.find(selector);
    
        if (node) {
            node.addEventListener(event, callback.bind(this));
        }
        else {
            console.warn('Node is not suitable for attaching events!');
        }
    }
};

View.extend = extend(View);

module.exports = View;
},{"./extend":32}],35:[function(require,module,exports){
module.exports = {
    /**
     * Notify user with web-based notification
     * 
     * @param {String} message
     * @param {String} icon
     */
    notify: function (message, icon) {
        if (!'Notification' in window || Notification.permission !== 'granted') {
            return;
        }
        
        new Notification(message, {
            icon: icon
        });
    },
    
    /**
     * Request permission for sending notifications
     */
    request: function () {
        if (!'Notification' in window || Notification.permission === 'granted') {
            return;
        }
        
        Notification.requestPermission();
    }
};
},{}],36:[function(require,module,exports){
var events = require('./helpers/events');

/**
 * Main logic for timing and animation
 * 
 * @param {TimerView} view
 */
var Timer = function (view) {
    this.startTime = null;
    this.remained  = null;
    this.duration  = null;
    this.endTime   = null;
    
    this.timer = null;
    this.view  = view;
};

Timer.prototype = {
    /**
     * Start the timer
     * 
     * @param {Number} time
     */
    start: function () {
        if (this.timer) {
            return;
        }
        
        time = this.remained ? this.remained 
                             : this.duration * 1000;
        
        this.startTime = Date.now();
        this.endTime   = this.startTime + time;
        
        this.timer = setInterval(this.tick.bind(this), 66);
        this.emit('start');
    },
    
    /**
     * @param {Number} time in seconds
     */
    setDuration: function (time) {
        this.duration = time;
    },

    /**
     * Timer tick
     */
    tick: function () {
        var time = (this.endTime - Date.now()) / 1000;
        
        if (time < 0) {
            this.emit('tick', 0);
            
            return this.stop();
        }
        
        this.emit('tick', time);
    },
    
    /**
     * Pause the timer and save the remained time
     */
    pause: function () {
        clearInterval(this.timer);
    
        this.timer = null;
    
        this.remained  = this.endTime - Date.now(); 
        this.startTime = this.endTime = null;
    },

    /**
     * Stop the timer
     */
    stop: function () {
        this.remained = this.endTime = this.startTime = null;
    
        clearInterval(this.timer);
    
        this.timer = null;
        this.emit('stop');
    },

    /**
     * Check whether timer is running or not
     * 
     * @return {Boolean}
     */
    isRunning: function () {
        return Boolean(this.timer);
    },

    /**
     * Get remained time
     * 
     * @return {Number}
     */
    getRemained: function () {
        if (this.remained) {
            return this.remained;
        }
    
        return this.endTime - Date.now();
    },
    
    getTime: function () {
        if (this.remained) {
            return this.remained / 1000;
        }
        
        return this.duration;
    },

    /**
     * Check whether timer has time still remained and is paused/stopped
     * 
     * @return {Boolean}
     */
    isTimeRemained: function () {
        return this.remained !== null;
    }
};

events(Timer.prototype)

module.exports = Timer;
},{"./helpers/events":23}]},{},[30])(30)
});
=======
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t()
else if("function"==typeof define&&define.amd)define([],t)
else{var e
e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.pomidorko=t()}}(function(){return function t(e,i,n){function s(r,a){if(!i[r]){if(!e[r]){var c="function"==typeof require&&require
if(!a&&c)return c(r,!0)
if(o)return o(r,!0)
var u=new Error("Cannot find module '"+r+"'")
throw u.code="MODULE_NOT_FOUND",u}var h=i[r]={exports:{}}
e[r][0].call(h.exports,function(t){var i=e[r][1][t]
return s(i?i:t)},h,h.exports,t,e,i,n)}return i[r].exports}for(var o="function"==typeof require&&require,r=0;r<n.length;r++)s(n[r])
return s}({1:[function(t,e,i){var n=t("./helpers/utils"),s=t("./helpers/ls"),o=t("./models/settings"),r=t("./mvc/model"),a=function(t,e){return n.merge(t.defaults[e],s.fetch(e))},c=e.exports=function(t){var e=new o(a(t,"settings")),i=new r(a(t,"goals"))
return e.on("change",function(){s.save(e.id,e.all())}),i.on("change",function(){s.save(i.id,i.all())}),{settings:e,goals:i}}
c.reset=function(){var t=s.fetch("goals")
if(t&&t.start){var e=new Date(t.start),i=new Date
i.getDate()!==e.getDate()&&i.getHours()>=6&&s.remove("goals")}}},{"./helpers/ls":25,"./helpers/utils":29,"./models/settings":31,"./mvc/model":33}],2:[function(t,e,i){var n=t("./component")
e.exports=n.extend({constructor:function(t,e){this.button=t,this.container=e},activate:function(){var t=this.toggle.bind(this)
this.button.addEventListener("click",t),this.container.querySelector(".pa-close").addEventListener("click",t)},toggle:function(){var t=this.container.classList.contains("hidden")
this.container.classList.toggle("hidden"),this.container.classList.toggle("pa-about-appear",t),this.container.classList.toggle("pa-about-disappear",!t)}})},{"./component":3}],3:[function(t,e,i){var n=function(){}
n.extend=t("../mvc/extend")(n),e.exports=n},{"../mvc/extend":32}],4:[function(t,e,i){var n=t("./component")
e.exports=n.extend({constructor:function(t,e,i){this.link=t,this.timer=e,this.goals=i},activate:function(){this.timer.on("stop",this.change.bind(this)),this.change()},change:function(){var t=this.goals.get("recess")?"break.ico":"work.ico"
this.link.href="assets/img/"+t}})},{"./component":3}],5:[function(t,e,i){var n=t("./component"),s=t("../helpers/language")
e.exports=n.extend({constructor:function(t,e,i){this.label=t,this.goals=e,this.settings=i,this.status=t.querySelector(".pa-status")},activate:function(){var t=this.render.bind(this)
this.goals.on("change",t),this.settings.on("change",t),this.render()},render:function(){var t=this.goals.get("current"),e=this.settings.get("total")
this.label.querySelector(".pa-current").innerHTML=t,this.label.querySelector(".pa-total").innerHTML=e,t>=e&&""==this.status.innerHTML.trim()&&(this.status.classList.remove("hidden"),this.status.innerHTML="– "+this.randomPhrase())},randomPhrase:function(){var t=s.get("phrases")
return t[Math.round(Math.random()*t.length)]}})},{"../helpers/language":24,"./component":3}],6:[function(t,e,i){e.exports={Notifications:t("./notifications"),PlayPause:t("./play-pause"),Settings:t("./settings"),TickTock:t("./tick-tock"),Favicon:t("./favicon"),About:t("./about"),Goals:t("./goals"),Scale:t("./scale"),Sound:t("./sound"),State:t("./state"),Title:t("./title"),Time:t("./time"),Skip:t("./skip"),Save:t("./save")}},{"./about":2,"./favicon":4,"./goals":5,"./notifications":7,"./play-pause":8,"./save":9,"./scale":10,"./settings":11,"./skip":12,"./sound":13,"./state":14,"./tick-tock":15,"./time":16,"./title":17}],7:[function(t,e,i){var n=t("./component"),s=t("../notify"),o=t("../helpers/language")
e.exports=n.extend({constructor:function(t,e,i){this.timer=t,this.goals=e,this.settings=i},activate:function(){var t=this
this.timer.on("stop",this.notify.bind(this)),this.settings.on("change",function(){t.settings.get("notifications")===!0&&s.request()})},notify:function(){if(this.settings.get("notifications")){var t=this.goals.get("recess")?"recess":"pomidorko"
s.notify(o.get(t))}}})},{"../helpers/language":24,"../notify":35,"./component":3}],8:[function(t,e,i){var n=t("./component")
e.exports=n.extend({constructor:function(t,e){this.control=t,this.timer=e,this.icon=t.querySelector(".pa-icon")},activate:function(){var t=this
this.timer.on("stop",function(){t.toggleState(!0)}),this.timer.on("start",function(){t.toggleState(!1)}),this.control.addEventListener("click",this.autoToggle.bind(this)),window.addEventListener("keydown",function(e){e.preventDefault(),32===(e.which||e.keyCode)&&t.autoToggle()})},autoToggle:function(){var t=this.timer.isRunning()
this.toggle(t),this.toggleState(t)},toggle:function(t){t?this.timer.pause():this.timer.start()},toggleState:function(t){var e=this.icon
e.classList.toggle("pa-pause",!t),e.classList.toggle("pa-play",t),this.control.classList.toggle("pa-play",t)}})},{"./component":3}],9:[function(t,e,i){var n=t("./component")
e.exports=n.extend({constructor:function(t,e){this.timer=t,this.goals=e},activate:function(){var t=this.timer,e=this.goals
window.addEventListener("beforeunload",function(){var i=t.getRemained()
i>=0&&e.set("remained",i)})}})},{"./component":3}],10:[function(t,e,i){var n=t("./component")
e.exports=n.extend({constructor:function(t,e){this.scale=t,this.timer=e},activate:function(){this.timer.on("tick",this.render.bind(this)),this.timer.on("start",this.render.bind(this)),this.render(this.timer.getTime())},render:function(t){pos=t/60/55*3300,this.scale.style.marginLeft=-pos+"px"}})},{"./component":3}],11:[function(t,e,i){var n=t("./component"),s=t("../controls"),o=t("../helpers/utils")
t("../mvc/view")
e.exports=n.extend({constructor:function(t,e,i){this.button=t,this.view=e,this.settings=i},activate:function(){this.button.addEventListener("click",this.toggle.bind(this)),this.settings.on("change",this.render.bind(this))
var t=this.settings,e=this.view.querySelectorAll(".pa-control, .pa-bool")
this.fields=o.toArray(e).map(function(e){return new s[e.dataset.type](e,{settings:t})}),this.render()},toggle:function(){var t=this.view.classList.contains("hidden"),e=this.view.classList
e.toggle("hidden"),e.toggle("pa-settings-appear",t),e.toggle("pa-settings-disappear",!t)},render:function(){var t=this.settings.all()
this.fields.forEach(function(e){e.set(t[e.input.className])})}})},{"../controls":20,"../helpers/utils":29,"../mvc/view":34,"./component":3}],12:[function(t,e,i){var n=t("./component"),s=t("../helpers/language")
e.exports=n.extend({constructor:function(t,e,i){this.button=t.querySelector("span"),this.timer=e,this.goals=i},activate:function(){var t=this
this.button.addEventListener("click",function(){t.timer.stop()}),this.goals.on("change",this.title.bind(this)),this.title()},title:function(){var t=s.get("skip")[+this.goals.get("recess")]
this.button.innerHTML=t}})},{"../helpers/language":24,"./component":3}],13:[function(t,e,i){var n=t("./component")
e.exports=n.extend({constructor:function(t,e,i){this.timer=t,this.settings=e,this.sound=i},activate:function(){this.timer.on("stop",this.play.bind(this))},play:function(){this.settings.get("sound")&&this.sound.play()}})},{"./component":3}],14:[function(t,e,i){var n=t("./component")
e.exports=n.extend({constructor:function(t,e,i,n){this.container=t,this.settings=n,this.timer=e,this.goals=i},activate:function(){var t=this
this.timer.on("stop",function(){t.next(),t.setup(),t.timer.start()}),this.setup()},setup:function(){var t=this.goals.get("current"),e=this.goals.get("recess")
this.timer.setDuration(this.getTime(t,e)),this.container.classList.toggle("resting",e)},next:function(){var t=!this.goals.get("recess"),e=!!t+this.goals.get("current")
this.goals.merge({recess:t,current:e,remained:!1})},getTime:function(t,e){var i=this.goals.get("remained")
if(i)return i/1e3
var n=e?this.settings.get("shortBreak"):this.settings.get("time")
return e&&t%this.settings.get("round")===0&&(n=this.settings.get("longBreak")),60*n}})},{"./component":3}],15:[function(t,e,i){var n=t("./component")
e.exports=n.extend({constructor:function(t,e,i){this.timer=t,this.sound=i,this.settings=e,this.enabled=!1,this.last=null},activate:function(){var t=this
this.timer.on("tick",this.tick.bind(this)),this.settings.on("change",function(){t.enabled=t.settings.get("tick")}),this.enabled=this.settings.get("tick")},tick:function(t){if(this.enabled){var e=Math.floor(t%60)
this.last!==e&&null!==this.last&&this.sound.play(),this.last=e}}})},{"./component":3}],16:[function(t,e,i){var n=t("./component"),s=t("../helpers/time")
e.exports=n.extend({constructor:function(t,e){this.min=t.querySelector(".pa-min"),this.sec=t.querySelector(".pa-sec"),this.timer=e},activate:function(){var t=this
this.timer.on("tick",this.render.bind(this)),this.timer.on("start",function(){t.render(t.timer.getTime())}),this.render(this.timer.getTime())},render:function(t){t=s(t),this.min.innerHTML=t.min,this.sec.innerHTML=t.sec}})},{"../helpers/time":27,"./component":3}],17:[function(t,e,i){var n=t("./component"),s=t("../helpers/time"),o=t("../helpers/language")
e.exports=n.extend({constructor:function(t,e){this.timer=t,this.goals=e,this.last=null},activate:function(){this.timer.on("tick",this.tick.bind(this)),this.tick(this.timer.getTime())},tick:function(t){if(t=s(t),this.last!==t.sec&&null!==this.last){var e=t.min+":"+t.sec
e+=" · "+o.get(this.goals.get("recess")?"recess":"work"),e+=" — "+o.get("title","помидорковый таймер"),document.title=e}this.last=t.sec}})},{"../helpers/language":24,"../helpers/time":27,"./component":3}],18:[function(t,e,i){var n="1.0"
e.exports={version:n,key:"pomidorko",defaults:{settings:{id:"settings",shortBreak:5,longBreak:20,time:25,version:n,round:4,total:12,sound:!0,tick:!1,notifications:!1},goals:{id:"goals",remained:!1,current:0,recess:!1,start:Date.now()}}}},{}],19:[function(t,e,i){var n=t("../mvc/view"),s=(t("../helpers/utils"),t("../notify")),o=n.extend({initialize:function(){this.input=this.find("input"),this.bind("span.pa-switch-on","click",this.switchOn),this.bind("span.pa-switch-off","click",this.switchOff)},switchOn:function(t){this.node.classList.remove("pa-bool-off"),this.node.classList.add("pa-bool-on"),t!==!0&&(this.data.settings.set(this.input.className,!0),"notifications"===this.input.className&&s.request())},switchOff:function(t){this.node.classList.remove("pa-bool-on"),this.node.classList.add("pa-bool-off"),t!==!0&&this.data.settings.set(this.input.className,!1)},set:function(t){this.input.checked=t,t?this.switchOn(!0):this.switchOff(!0)}})
e.exports=o},{"../helpers/utils":29,"../mvc/view":34,"../notify":35}],20:[function(t,e,i){e.exports={number:t("./number"),bool:t("./bool")}},{"./bool":19,"./number":21}],21:[function(t,e,i){var n=t("../mvc/view"),s=n.extend({initialize:function(){var t=this.data.settings,e=this.find("input")
this.input=e,this.bind(".plus","click",this.add),this.bind(".minus","click",this.sub),this.bind("input","change",function(){var i=parseInt(e.value)
t.set(e.className,isNaN(i)?0:Math.round(i))})},add:function(t){this.perform(t,1)},sub:function(t){this.perform(t,-1)},perform:function(t,e){t.preventDefault()
var i=parseInt(this.input.value)+e,t=document.createEvent("HTMLEvents")
t.initEvent("change",null,!1),this.input.value=isNaN(i)?0:i,this.input.dispatchEvent(t)},set:function(t){this.input.value=isNaN(t)?0:Math.round(t)}})
e.exports=s},{"../mvc/view":34}],22:[function(t,e,i){var n=document.createElement("div")
e.exports={toggle:function(t,e,i){i="undefined"==typeof i?!t.classList.contains(e):i,t.classList.toggle(e,i)},add:function(t,e){t.classList.add(e)},remove:function(t,e){t.classList.remove(e)},createNode:function(t){return n.innerHTML=t,n.children[0]},find:function(t,e){return e=e||document,e.querySelector(t)},findAll:function(t,e){return e=e||document,e.querySelectorAll(t)}}},{}],23:[function(t,e,i){var n=t("./utils")
e.exports=function(t){return t.on=function(t,e){this._events||(this._events={}),this._events[t]||(this._events[t]=[]),this._events[t].push(e)},t.emit=function(t){if(this._events&&this._events[t]){var e=n.toArray(arguments).slice(1)
this._events[t].forEach(function(t){t&&t.apply(t,e)})}},t}},{"./utils":29}],24:[function(t,e,i){e.exports={strings:{},set:function(t){this.strings=t},get:function(t,e){return t in this.strings?this.strings[t]:e}}},{}],25:[function(t,e,i){var n=t("../config"),s=window.localStorage
e.exports={storage:JSON.parse(s.getItem(n.key))||{},fetch:function(t){return this.storage[t]||{}},persist:function(){s.setItem(n.key,JSON.stringify(this.storage))},save:function(t,e){this.storage[t]=e,this.persist()},remove:function(t){delete this.storage[t],this.persist()}}},{"../config":18}],26:[function(t,e,i){e.exports={clamp:function(t,e,i){return t=Math.min(i,t),Math.max(e,t)},random:function(t,e){return Math.round(Math.random()*(e-t)+t)}}},{}],27:[function(t,e,i){var n=function(t,e){return e.substr(t.length)+t}
e.exports=function(t){var e=Math.floor(t/60),i=Math.floor(t%60)
return i=60>i?i:59,e=n(e.toString(),"00"),i=n(i.toString(),"00"),{min:e,sec:i}}},{}],28:[function(t,e,i){e.exports=function(t){return t=t||(t=0),function(){return++t}}},{}],29:[function(t,e,i){e.exports={each:function(t,e){for(var i in t)t.hasOwnProperty(i)&&e(t[i],i)},diff:function(t,e){var i={}
for(var n in e)("undefined"==typeof t[n]||e[n]!==t[n])&&(i[n]=e[n]||t[n])
return i},clone:function(t){var e={}
return extend(e,t),e},merge:function(t,e){var i,n={}
for(i in t)n[i]=t[i]
for(i in e)n[i]=e[i]
return n},extend:function(t,e){for(var i in e)t[i]=e[i]},toArray:function(t){return Array.prototype.slice.call(t)},pick:function(t,e){var i={}
return e.forEach(function(e){t[e]&&(i[e]=t[e])}),i}}},{}],30:[function(t,e,i){e.exports={components:t("./components"),bootstrap:t("./bootstrap"),config:t("./config"),lang:t("./helpers/language"),dom:t("./helpers/dom"),Timer:t("./timer")}},{"./bootstrap":1,"./components":6,"./config":18,"./helpers/dom":22,"./helpers/language":24,"./timer":36}],31:[function(t,e,i){var n=t("../mvc/model"),s=t("../helpers/math")
e.exports=n.extend({filter:function(t){t.shortBreak=s.clamp(t.shortBreak,3,10),t.longBreak=s.clamp(t.longBreak,5,45),t.time=s.clamp(t.time,5,55),t.total=s.clamp(t.total,1,1/0),t.round=s.clamp(t.round,1,t.total)}})},{"../helpers/math":26,"../mvc/model":33}],32:[function(t,e,i){var n=t("../helpers/utils"),s=e.exports=function(t){return function(e){var i=e.constructor
delete e.constructor
var o=function(){t.apply(this,n.toArray(arguments)),i&&i.apply(this,arguments)}
return o.prototype=Object.create(t.prototype),n.each(e,function(t,e){o.prototype[e]=t}),o.extend=s(o),o}}},{"../helpers/utils":29}],33:[function(t,e,i){var n=t("../helpers/events"),s=t("../helpers/utils"),o=t("../helpers/unique")(),r=t("./extend"),a=function(t){var e=t&&t.id?t.id:-o()
t&&t.id&&delete t.id,t=s.merge(this.data||{},t||{}),this.previous=s.merge({},t),this.data=t,this.id=e}
a.prototype={filter:function(t){},get:function(t){return"undefined"!=typeof this.data[t]?this.data[t]:!1},set:function(t,e){this.data[t]=e,this.filter(this.data),this.emit("change")},clear:function(){this.previous=s.merge({},this.data)},revert:function(){this.data=s.merge({},this.previous),this.emit("change")},all:function(){return s.merge(this.data,{})},diff:function(){return s.diff(this.previous,this.data)},destroy:function(){this.data={},this.id=-o(),this.emit("destroy")},reset:function(t){this.data=t,this.filter(this.data),this.emit("change")},merge:function(t){t.id&&(this.id=t.id,delete t.id),this.data=s.merge(this.data,t),this.filter(this.data),this.emit("change")},isNew:function(){return this.id<0},isDirty:function(){return Object.keys(this.diff()).length>0},isEmpty:function(){return 0===Object.keys(this.data).length}},a.extend=r(a),n(a.prototype),e.exports=a},{"../helpers/events":23,"../helpers/unique":28,"../helpers/utils":29,"./extend":32}],34:[function(t,e,i){var n=t("./extend"),s=function(t,e){this.node=t,this.data=e,this.initialize()}
s.prototype={initialize:function(){},render:function(){},find:function(t){var e=this.node.querySelector(t)
return e||console.warn('Could not find node by selector "'+t+'"'),e},bind:function(t,e,i){var n=t instanceof Node?t:this.find(t)
n?n.addEventListener(e,i.bind(this)):console.warn("Node is not suitable for attaching events!")}},s.extend=n(s),e.exports=s},{"./extend":32}],35:[function(t,e,i){e.exports={notify:function(t,e){!1 in window||"granted"!==Notification.permission||new Notification(t,{icon:e})},request:function(){!1 in window||"granted"===Notification.permission||Notification.requestPermission()}}},{}],36:[function(t,e,i){var n=t("./helpers/events"),s=function(){this.startTime=null,this.remained=null,this.duration=null,this.endTime=null,this.timer=null}
s.prototype={start:function(){this.timer||(time=this.remained?this.remained:1e3*this.duration,this.startTime=Date.now(),this.endTime=this.startTime+time,this.timer=setInterval(this.tick.bind(this),66),this.emit("start"))},setDuration:function(t){this.duration=t},tick:function(){var t=(this.endTime-Date.now())/1e3
return 0>t?(this.emit("tick",0),this.stop()):void this.emit("tick",t)},pause:function(){clearInterval(this.timer),this.timer=null,this.remained=this.endTime-Date.now(),this.startTime=this.endTime=null},stop:function(){this.remained=this.endTime=this.startTime=null,clearInterval(this.timer),this.timer=null,this.emit("stop")},isRunning:function(){return Boolean(this.timer)},getRemained:function(){return this.remained?this.remained:this.endTime-Date.now()},getTime:function(){return this.remained?this.remained/1e3:this.duration},isTimeRemained:function(){return null!==this.remained}},n(s.prototype),e.exports=s},{"./helpers/events":23}]},{},[30])(30)})
>>>>>>> 307807f1b7deff28bfb5853e0b3b732db52d612a
