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
    var self = this,
        ls   = window.localStorage;
    
    this.options = utils.merge(defaults, options);
    this.storage = JSON.parse(ls.getItem(options.key)) || {};
    
    this.on('change', function () {
        self.persist();
    });
};

Mapper.prototype = {
    /**
     * Persist data to localStorage
     */
    persist: function () {
        var ls = window.localStorage;
    
        ls.setItem(this.options.key, JSON.stringify(this.storage));
    },

    /**
     * Parse the result 
     * 
     * @param {Object} data
     * @return {Object}
     */
    parse: function (data) {
        return data;
    },

    /**
     * Create a model and send it to server
     * 
     * @param {Object} data
     * @param {Model} model
     */
    create: function (data, model) {
        if (model) {
            model.merge(data);
        
            return model;
        }
        else {
            return new this.options.model(data);
        }
    },

    /**
     * Fetch a model from server
     * 
     * @param {Number} id
     * @param {Model} model
     * @param {Function} callback
     */
    fetch: function (id, model, callback) {
        if (this.storage[id]) {
            model.merge(this.storage[id]);
            model.id = id;
        
            callback && callback();
        }
    },

    /**
     * Send a model on server
     * 
     * @param {Model} model
     * @param {Function} callback
     */
    insert: function (model, callback) {
        this.storage[model.id] = model.all();
    
        callback && callback();
    
        this.emit('change');
    },

    /**
     * Update (edit) the model
     * 
     * @param {Model} model
     * @param {Function} callback
     */
    update: function (model, callback) {
        this.insert(model, callback);
    },

    /**
     * Save (insert or update) model
     * 
     * @param {Model} model
     * @param {Function} callback
     */
    save: function (model, callback) {
        model.isNew() 
            ? this.insert(model, callback) 
            : this.update(model, callback);
    },

    /**
     * Remove model from database
     * 
     * @param {Model} model
     * @param {Function} callback
     */
    remove: function (model, callback) {
        delete this.storage[model.id];
    
        model.destroy();
    
        callback && callback();
    
        this.emit('change');
    }
};

events(Mapper.prototype);

module.exports = Mapper;