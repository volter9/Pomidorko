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