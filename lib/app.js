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
    
    this.initialize();
};

/**
 * Initialize those models
 */
App.prototype.initialize = function () {
    this.goals.emit('change');
    this.settings.emit('change');
    
    var self = this;
    
    this.goals.on('change', function () {
        Mapper.save(self.goals);
    });
    
    this.settings.on('change', function () {
        Mapper.save(self.settings);
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