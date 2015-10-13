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