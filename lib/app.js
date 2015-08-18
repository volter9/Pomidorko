var Settings = require('./models/settings'),
    Mapper   = require('./ls'),
    Goals    = require('./models/goals'),
    View     = require('./views/app')
    config   = require('./version');

/**
 * Main app
 * 
 * @param {Node} node
 */
var App = function (node) {
    this.resetIfNeeded();
    
    this.settings = Settings.get();
    this.goals    = Goals.get();
    
    this.view = new View(node, {
        settings: this.settings,
        goals:    this.goals,
    });
    
    this.initialize(this.settings, this.goals);
};

/**
 * Reset the goal tracker if today's date is not 
 * last saved date.
 */
App.prototype.resetIfNeeded = function () {
    var settings = Mapper.storage;
    
    if (!settings || !settings.goals || !settings.goals.start) {
        return;
    }
    
    var start = new Date(settings.goals.start),
        now   = new Date();
    
    if (start.getDate() !== now.getDate() && now.getHours() >= 6) {
        delete settings.goals;
        
        Mapper.persist();
    }
};

/**
 * Initialize those models
 * 
 * @param {Model} settings
 * @parma {Model} goals
 */
App.prototype.initialize = function (settings, goals) {
    goals.emit('change');
    settings.emit('change');
    
    goals.on('change', function () {
        Mapper.save(goals);
    });
    
    settings.on('change', function () {
        Mapper.save(settings);
    });
};

module.exports = {
    /**
     * Initiate the app
     * 
     * @param {Node} node
     */
    initiate: function (node) {
        this.instance = new App(node);
    }
};