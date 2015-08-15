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

events(Model.prototype);

/**
 * Filter input data
 */
Model.prototype.filter = function (data) {};

/**
 * Get the value by key in the model
 * 
 * @param {String} key
 * @return {Object}
 */
Model.prototype.get = function (key) {
    return typeof this.data[key] !== 'undefined' ? this.data[key] : false;
};

/**
 * Set the value by key
 * 
 * @param {String} key
 * @param {Object} value
 */
Model.prototype.set = function (key, value) {
    this.data[key] = value;
    this.filter(this.data);
    
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
    this.filter(this.data);
    
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
    this.filter(this.data);
    
    this.emit('change');
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

Model.extend = extend(Model);

module.exports = Model;