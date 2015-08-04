var View  = require('../mvc/view'),
    Goals = require('./goals'),
    About = require('./about'),
    Settings = require('./settings');

/**
 * Main application view
 * 
 * @param {Node} node
 * @param {Object} data
 */
var AppView = function (node, data) {
    View.call(this, node, data);
};

AppView.prototype = Object.create(View.prototype);

AppView.prototype.initialize = function () {
    this.goals = new Goals(this.find('#goals'), {
        goals: this.data.goals
    });
    
    this.about = new About(this.find('.about'), {
        button: this.find('#about')
    });
    
    this.settings = new Settings(this.find('.settings'), {
        button:   this.find('#settings'),
        settings: this.data.settings
    });
};

module.exports = AppView;