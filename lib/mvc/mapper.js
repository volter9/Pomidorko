var events = require('../helpers/events'),
    utils  = require('../helpers/utils'),
    ajax   = require('../helpers/ajax'),
    model  = require('./model');

/* Default properties */
var defaults = {
    baseurl: '/',
    model:   model,
    
    get:    'get',
    insert: 'add',
    update: 'edit',
    remove: 'remove',
};

/**
 * Mapper constructor
 * 
 * @param {Object} options
 */
var Mapper = function (options) {
    this.options = utils.merge(defaults, options);
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
    var self = this;
    
    ajax.get([this.options.baseurl, this.options.get, id])
        .success(function (_, data) {
            var result = self.create(self.parse(data), model);
            
            if (!Boolean(model)) {
                callback && callback(model);
                self.emit('get', result);
            }
        })
        .send();
};

/**
 * Send a model on server
 * 
 * @param {Model} model
 * @param {Function} callback
 */
Mapper.prototype.insert = function (model, callback) {
    var self = this;
    
    ajax.post([this.options.baseurl, this.options.insert], model.all())
        .success(function (_, data) {
            model.id = data.id;
            
            callback && callback(model);
            self.emit('add', model);
        })
        .send();
};

/**
 * Update (edit) the model
 * 
 * @param {Model} model
 * @param {Function} callback
 */
Mapper.prototype.update = function (model) {
    var self = this;
    
    ajax.post([this.options.baseurl, this.options.update, model.id], model.diff())
        .success(function () {
            callback && callback(model);
            self.emit('update', model);
        })
        .send();
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
    var self = this;
    
    ajax.post([this.options.baseurl, this.options.remove, model.id])
        .success(function () {
            model.destroy();
            
            callback && callback(model);
            self.emit('remove', model);
        })
        .send();
};

/**
 * Synchronize with the server
 * 
 * @param {Collection} collection
 */
Mapper.prototype.sync = function (collection) {
    collection.forEach(function (model) {
        if (model.isNew()) {
            self.insert(model);
        }
        else if (model.isEmpty()) {
            self.remove(model);
            
            collection.remove(model);
        }
        else if (model.isDirty()) {
            self.update(model);
        }
    });
};

Mapper.extend = extend(Mapper);

module.exports = Mapper;