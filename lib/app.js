/**
 * Main app
 * 
 * @param {Node} node
 */
var App = function (node) {
    this.resetIfNeeded();
    
    var AppView  = require('./views/app'),
        Settings = require('./models/settings'),
        Goals    = require('./models/goals');
    
    this.settings = Settings.get();
    this.goals    = Goals.get();
    
    this.view = new AppView(node, {
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
    var settings = JSON.parse(localStorage.getItem('pomidorka'));
    
    if (!settings || !settings.goals || !settings.goals.start) {
        return;
    }
    
    var start = new Date(settings.goals.start),
        now   = new Date();
    
    if (start.getDate() !== now.getDate()) {
        delete settings.goals;
    
        localStorage.setItem('pomidorka', JSON.stringify(settings));
    }
};

/**
 * Initialize those models
 * 
 * @param {Model} settings
 * @parma {Model} goals
 */
App.prototype.initialize = function (settings, goals) {
    var Mapper = require('./ls');
    
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