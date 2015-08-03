var utils  = require('../helpers/utils'),
    events = require('../helpers/events'),
    Model  = require('./model');

/**
 * Model collection
 * 
 * @param {Object} models
 */
var Collection = function (models) {
    this.models = models || {};
};

events(Collection.prototype);

/**
 * Get the model by id
 * 
 * @param {Number} id
 * @return {Model}
 */
Collection.prototype.get = function (id) {
    return this.models[id];
};

/**
 * Add a model to the collection
 * 
 * @param {Model} model
 */
Collection.prototype.add = function (model) {
    this.models[model.id] = model;
    
    this.emit('add', model);
};

/**
 * Remove the model by id from collection
 * 
 * @param {Number} id
 */
Collection.prototype.remove = function (id) {
    var model = this.models[id];
    
    delete this.models[id];
    
    this.emit('remove', model);
};

/**
 * Bootstrap the collection 
 * 
 * @param {Array} models
 */
Collection.prototype.bootstrap = function (models) {
    var self = this;
    
    var callback = function (data, id) {
        data.id = data.id || id;
        
        var model = new Model(data);
        
        self.models[model.id] = model;
    };
    
    if (Array.isArray(models)) {
        models.forEach(callback);
    }
    else {
        utils.each(models, callback);
    }
};

/**
 * Iteration of colleciton
 * 
 * @param {Function} callback
 */
Collection.prototype.forEach = function (callback) {
    utils.each(this.models, callback);
};

/**
 * Bind mapper to collection
 * 
 * @param {Mapper} mapper
 */
Collection.prototype.bindTo = function (mapper) {
    var self = this;
    
    mapper.on('get', function (model) {
        self.add(model);
    });
    
    mapper.on('add', function (model) {
        self.add(model);
    });
    
    mapper.on('remove', function (model) {
        self.remove(model.id);
    });
};

module.exports = Collection;