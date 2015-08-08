var View     = require('../mvc/view'),
    Goals    = require('./goals'),
    About    = require('./about'),
    Timer    = require('./timer'),
    Settings = require('./settings');

/**
 * Main application view
 * 
 * @param {Node} node
 * @param {Object} data
 */
var App = View.extend({
    /**
     * Initialize the view
     */
    initialize: function () {
        this.timer = new Timer(this.find('#timer'), {
            settings: this.data.settings
        });
        
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
    }
});

module.exports = App;