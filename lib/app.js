var AppView  = require('./views/app'),
    Settings = require('./models/settings'),
    Goals    = require('./models/goals'),
    Mapper   = require('./ls');

/**
 * Main app
 * 
 * @param {Node} node
 */
var App = function (node) {
    this.settings = Settings.get();
    this.goals    = Goals.get(this.settings);
    
    this.view = new AppView(node, {
        settings: this.settings,
        goals:    this.goals
    });
    
    this.initialize(this.settings, this.goals);
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

/**
 * Initiate the app
 * 
 * @param {Node} node
 */
App.initiate = function (node) {
    App.instance = new App(node);
};

module.exports = App;