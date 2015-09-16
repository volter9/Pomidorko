var Mapper = require('../ls'),
    config = require('../version');

/**
 * Base object for model factories
 * 
 * @param {Model} proto
 * @param {String} key
 * @param {Object} data
 * @return {Function}
 */
module.exports = function (proto, key, data) {
    data = data || config.defaults[key];
    
    return {
        /**
         * Get the settings
         * 
         * @return {Model}
         */
        get: function () {
            var model = new proto;
        
            Mapper.fetch(key, model);
        
            if (model.isNew()) {
                model = this.bootstrap(Mapper);
            }
            
            return model;
        },
    
        /**
         * Bootstrap the model
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
            return new proto(data);
        }
    };
};