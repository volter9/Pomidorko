var AppView  = require('./views/app'),
    Settings = require('./models/settings'),
    Goals    = require('./models/goals');

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
    
    this.goals.emit('change');
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