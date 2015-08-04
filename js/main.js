(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.App = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var AppView  = require('./views/app'),
    Settings = require('./models/settings'),
    Goals    = require('./models/goals'),
    Mapper   = require('./ls');

/**
 * Main app
 * 
 * @param {Node} node
 */
var App = function (node) {
    this.settings = Settings.get();
    this.goals    = Goals.get(this.settings);
    
    this.view = new AppView(node, {
        settings: this.settings,
        goals:    this.goals
    });
    
    this.goals.emit('change');
    this.settings.emit('change');
    
    var self = this;
    
    this.goals.on('change', function () {
        Mapper.save(self.goals);
    });
    
    this.settings.on('change', function () {
        Mapper.save(self.settings);
    });
};

/**
 * Initiate the app
 * 
 * @param {Node} node
 */
App.initiate = function (node) {
    App.instance = new App(node);
};

module.exports = App;
},{"./ls":5,"./models/goals":6,"./models/settings":7,"./views/app":12}],2:[function(require,module,exports){
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
};
},{"./utils":4}],3:[function(require,module,exports){
/**
 * Get unique integer generator
 * 
 * @param {Number} i - counter
 * @return {Function}
 */
var unique = function (i) {
    i = i || (i = 0);

    /**
     * Unique integer return
     * 
     * @return {
     */
    return function () {
        return ++i;
    };
}

module.exports = unique;
},{}],4:[function(require,module,exports){
/**
 * Simple $.each, only for objects
 * 
 * @param {Object} object
 * @param {Function} callback
 */
var each = function (object, callback) {
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            callback(object[key], key);
        }
    }
};

/**
 * Get difference between two objects
 * 
 * @param {Object} a
 * @param {Object} b
 * @return {Object}
 */
var diff = function (a, b) {
    var c = {};
    
    for (var key in b) {
        if (typeof a[key] === 'undefined' || b[key] !== a[key]) {
            c[key] = b[key] || a[key];
        }
    }
    
    return c;
};

/**
 * Merge two objects
 * 
 * @param {Object} a
 * @param {Object} b
 * @return {Object}
 */
var merge = function (a, b) {
    var c = {}, key;
    
    for (key in a) {
        c[key] = a[key];
    }
    
    for (key in b) {
        c[key] = b[key];
    }
    
    return c;
};

/**
 * Extend one object from other
 * 
 * @param {Object} a
 * @param {Object} b
 */
var extend = function (a, b) {
    for (var key in b) {
        a[key] = b[key];
    }
};

/**
 * Turn array-like object into real array
 * 
 * @param {Object} arrayLikeObject
 * @return {Array}
 */
var toArray = function (arrayLikeObject) {
    return Array.prototype.slice.call(arrayLikeObject);
};

/**
 * Pick keys from object
 * 
 * @param {Object} object
 * @param {Array} keys
 * @return {Object}
 */
var pick = function (object, keys) {
    var result = {};
    
    keys.forEach(function (key) {
        if (object[key]) {
            result[key] = object[key];
        }
    });
    
    return result;
};

module.exports = {
    toArray: toArray,
    extend:  extend,
    merge:   merge,
    diff:    diff,
    each:    each,
    pick:    pick
};
},{}],5:[function(require,module,exports){
/**
 * Shared localStorage mapper for current application
 */

var Mapper = require('./mvc/mappers/ls');

module.exports = new Mapper({
    key: 'pomidorka'
});
},{"./mvc/mappers/ls":8}],6:[function(require,module,exports){
var Model  = require('../mvc/model'),
    Mapper = require('../ls');

module.exports = {
    /**
     * Get the settings
     * 
     * @param {Settings} settings
     * @return {Model}
     */
    get: function (settings) {
        var goals = new Model;
        
        Mapper.fetch('goals', goals);
        
        if (goals.isNew()) {
            goals = this.bootstrap(Mapper, settings);
        }
        
        return goals;
    },
    
    /**
     * Bootstrap the 
     * 
     * @param {Mapper} mapper
     * @param {Settings} settings
     * @return {Model}
     */    
    bootstrap: function (mapper, settings) {
        var blank = this.blank(settings);
        
        mapper.insert(blank);
        
        return blank;
    },
    
    /**
     * Create a blank default model
     * 
     * @param {Settings} settings
     * @return {Model}
     */
    blank: function (settings) {
        return new Model({
            id: 'goals',
            
            current: 1,
            total: settings.get('total')
        });
    }
};
},{"../ls":5,"../mvc/model":9}],7:[function(require,module,exports){
var Model  = require('../mvc/model'),
    Mapper = require('../ls');

module.exports = {
    /**
     * Get the settings
     * 
     * @return {Model}
     */
    get: function () {
        var settings = new Model;
        
        Mapper.fetch('settings', settings);
        
        console.log(settings.all(), settings.isNew(), settings.id);
        
        if (settings.isNew()) {
            settings = this.bootstrap(Mapper);
        }
        
        return settings;
    },
    
    /**
     * Bootstrap the 
     * 
     * @param {Mapper} mapper
     * @return {Model}
     */    
    bootstrap: function (mapper) {
        var blank = this.blank();
        
        mapper.insert(blank);
        
        return blank;
    },
    
    /**
     * Create a blank default model
     * 
     * @return {Model}
     */
    blank: function () {
        return new Model({
            id: 'settings',
            
            time: 25,
            shortBreak: 5,
            longBreak: 15,
            
            round: 4,
            total: 12
        });
    }
};
},{"../ls":5,"../mvc/model":9}],8:[function(require,module,exports){
var events = require('../../helpers/events'),
    utils  = require('../../helpers/utils'),
    model  = require('../model');

/* Default properties */
var defaults = {
    model: model
};

/**
 * Mapper constructor
 * 
 * @param {Object} options
 */
var Mapper = function (options) {
    var self = this;
    
    this.options = utils.merge(defaults, options);
    this.storage = JSON.parse(window.localStorage.getItem(options.key)) || {};
    
    this.on('change', function () {
        window.localStorage.setItem(
            self.options.key, 
            JSON.stringify(self.storage)
        );
    });
};

events(Mapper.prototype);

/**
 * Parse the result 
 * 
 * @param {Object} data
 * @return {Object}
 */
Mapper.prototype.parse = function (data) {
    return data;
};

/**
 * Create a model and send it to server
 * 
 * @param {Object} data
 * @param {Model} model
 */
Mapper.prototype.create = function (data, model) {
    if (model) {
        model.merge(data);
        
        return model;
    }
    else {
        return new this.options.model(data);
    }
};

/**
 * Fetch a model from server
 * 
 * @param {Number} id
 * @param {Model} model
 * @param {Function} callback
 */
Mapper.prototype.fetch = function (id, model, callback) {
    if (this.storage[id]) {
        model.merge(this.storage[id]);
        
        if (this.storage[id]) {
            model.id = id;
        }
        
        callback && callback();
    }
};

/**
 * Send a model on server
 * 
 * @param {Model} model
 * @param {Function} callback
 */
Mapper.prototype.insert = function (model, callback) {
    this.storage[model.id] = model.all();
    
    callback && callback();
    
    this.emit('change');
};

/**
 * Update (edit) the model
 * 
 * @param {Model} model
 * @param {Function} callback
 */
Mapper.prototype.update = function (model, callback) {
    this.insert(model, callback);
};

/**
 * Save (insert or update) model
 * 
 * @param {Model} model
 * @param {Function} callback
 */
Mapper.prototype.save = function (model, callback) {
    model.isNew() 
        ? this.insert(model, callback) 
        : this.update(model, callback);
};

/**
 * Remove model from database
 * 
 * @param {Model} model
 * @param {Function} callback
 */
Mapper.prototype.remove = function (model, callback) {
    delete this.storage[model.id];
    
    model.destroy();
    
    callback && callback();
    
    this.emit('change');
};

module.exports = Mapper;
},{"../../helpers/events":2,"../../helpers/utils":4,"../model":9}],9:[function(require,module,exports){
var events = require('../helpers/events'),
    utils  = require('../helpers/utils'),
    unique = require('../helpers/unique')();

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

events(Model.prototype);

/**
 * Get the value by key in the model
 * 
 * @param {String} key
 * @return {Object}
 */
Model.prototype.get = function (key) {
    return this.data[key] ? this.data[key] : false;
};

/**
 * Check whether the model is new
 * 
 * @return {Boolean}
 */
Model.prototype.isNew = function () {
    return this.id < 0;
};

/**
 * Check whether the model was modified
 * 
 * @return {Boolean}
 */
Model.prototype.isDirty = function () {
    return Object.keys(this.diff()).length > 0;
};

/**
 * Check whether the model was destroyed
 * 
 * @return {Boolean}
 */
Model.prototype.isEmpty = function () {
    return Object.keys(this.data).length === 0;
};

/**
 * Set the value by key
 * 
 * @param {String} key
 * @param {Object} value
 */
Model.prototype.set = function (key, value) {
    this.data[key] = value;
    this.emit('change');
};

/**
 * Clear previous data cache
 */
Model.prototype.clear = function () {
    this.previous = utils.merge({}, this.data);
};

/**
 * Revert the changes
 */
Model.prototype.revert = function () {
    this.data = utils.merge({}, this.previous);
    this.emit('change');
};

/**
 * Get all data from 
 * 
 * @return {Object}
 */
Model.prototype.all = function () {
    return utils.merge(this.data, {});
};

/**
 * Get difference data from the `previous`
 * 
 * @return {Object}
 */
Model.prototype.diff = function () {
    return utils.diff(this.previous, this.data);
};

/**
 * Destroy the model
 */
Model.prototype.destroy = function () {
    this.data = {};
    this.id   = -unique();
    
    this.emit('destroy');
};

/**
 * Reset model with new set of data
 * 
 * @param {Object} data
 */
Model.prototype.reset = function (data) {
    this.data = data;
    
    this.emit('change');
};

/**
 * Reset model with new set of data
 * 
 * @param {Object} data
 */
Model.prototype.merge = function (data) {
    if (data.id) {
        this.id = data.id;
        
        delete data.id;
    }
    
    this.data = utils.merge(this.data, data);
    this.emit('change');
};

module.exports = Model;
},{"../helpers/events":2,"../helpers/unique":3,"../helpers/utils":4}],10:[function(require,module,exports){
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

/** Methods that should be extended in subclasses */
View.prototype.initialize = function () {};
View.prototype.render = function () {};

/**
 * Find an element by selector
 * 
 * @param {String} selector
 * @return {Node}
 */
View.prototype.find = function (selector) {
    return this.node.querySelector(selector);
};

/**
 * Bind an event to specific element
 * 
 * @param {String} selector
 * @param {String} event
 * @param {Function} callback
 */
View.prototype.bind = function (selector, event, callback) {
    this.find(selector).addEventListener(event, callback.bind(this));
};

module.exports = View;
},{}],11:[function(require,module,exports){
var View  = require('../mvc/view');

/**
 * Main application view
 * 
 * @param {Node} node
 * @param {Object} data
 */
var About = function (node, data) {
    View.call(this, node, data);
};

About.prototype = Object.create(View.prototype);

About.prototype.initialize = function () {
    this.data.button.addEventListener('click', this.show.bind(this));
    
    this.bind('.close', 'click', this.close);
};

/**
 * Showing/hiding the about view
 */
About.prototype.show = function () {
    this.node.classList.remove('hidden');
    
    this.toggle(this.node.classList.contains('hidden'));
};

About.prototype.close = function () {
    this.node.classList.add('hidden');
    
    this.toggle(this.node.classList.contains('hidden'));
};

About.prototype.toggle = function (toggle) {
    this.node.classList.toggle('about-appear', !toggle);
    this.node.classList.toggle('about-disappear', toggle);
};

module.exports = About;
},{"../mvc/view":10}],12:[function(require,module,exports){
var View  = require('../mvc/view'),
    Goals = require('./goals'),
    About = require('./about'),
    Settings = require('./settings');

/**
 * Main application view
 * 
 * @param {Node} node
 * @param {Object} data
 */
var AppView = function (node, data) {
    View.call(this, node, data);
};

AppView.prototype = Object.create(View.prototype);

AppView.prototype.initialize = function () {
    this.goals = new Goals(this.find('#goals'), {
        goals: this.data.goals
    });
    
    this.about = new About(this.find('.about'), {
        button: this.find('#about')
    });
    
    this.settings = new Settings(this.find('.settings'), {
        button:   this.find('#settings'),
        settings: this.data.settings
    });
};

module.exports = AppView;
},{"../mvc/view":10,"./about":11,"./goals":13,"./settings":14}],13:[function(require,module,exports){
var View = require('../mvc/view');

/**
 * Goals view
 * 
 * @param {Node} node
 * @param {Object} data
 */
var Goals = function (node, data) {
    View.call(this, node, data);
};

Goals.prototype = Object.create(View.prototype);

Goals.prototype.initialize = function () {
    this.data.goals.on('change', this.render.bind(this));
};

Goals.prototype.render = function () {
    var goals = this.data.goals;
    
    this.find('.current').innerHTML = goals.get('current');
    this.find('.total').innerHTML   = goals.get('total');
};

module.exports = Goals;
},{"../mvc/view":10}],14:[function(require,module,exports){
var View  = require('../mvc/view'),
    utils = require('../helpers/utils');

/**
 * Settings view
 * 
 * @param {Node} node
 * @param {Object} data
 */
var Settings = function (node, data) {
    View.call(this, node, data);
};

Settings.prototype = Object.create(View.prototype);

Settings.prototype.initialize = function () {
    this.data.button.addEventListener('click', this.toggle.bind(this));
    this.data.settings.on('change', this.render.bind(this));
};

/**
 * Toggle the view
 */
Settings.prototype.toggle = function () {
    var hidden = this.node.classList.contains('hidden');
    
    this.node.classList.toggle('hidden');
    this.node.classList.toggle('settings-appear', hidden);
    this.node.classList.toggle('settings-disappear', !hidden);
};

Settings.prototype.render = function () {
    var self = this,
        data = this.data.settings.all();
    
    utils.each(data, function (value, key) {
        self.find('input.' + key).value = value;
    });
};

module.exports = Settings;
},{"../helpers/utils":4,"../mvc/view":10}]},{},[1])(1)
});