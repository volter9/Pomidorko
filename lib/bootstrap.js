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
module.exports = function (config) {
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