var Model  = require('../mvc/model'),
    Mapper = require('../ls');

var math    = require('../helpers/math'),
    factory = require('./factory');

/**
 * Modified settings model
 */
var Settings = Model.extend({
    /**
     * Filter data
     * 
     * @param {Object} data
     */
    filter: function (data) {
        data.time       = math.clamp(data.time, 5, 55);
        data.shortBreak = math.clamp(data.shortBreak, 3, 10);
        data.longBreak  = math.clamp(data.longBreak, 5, 45);
        
        data.total = math.clamp(data.total, 1, Infinity);
        data.round = math.clamp(data.round, 1, data.total);
    }
});

module.exports = factory(Settings, 'settings');