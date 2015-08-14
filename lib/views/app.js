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
        var node  = this.node,
            goals = this.data.goals;
        
        goals.on('change', function () {
            node.classList.toggle('resting', goals.get('recess'));
        });
        
        this.timer = new Timer(this.find('#timer'), {
            settings: this.data.settings,
            goals:    this.data.goals
            
            // @todo pass skip button
        });
        
        this.goals = new Goals(this.find('#goals'), this.data);
        this.about = new About(this.find('.about'), {
            button: this.find('#about')
        });
    
        this.settings = new Settings(this.find('.pa-settings'), {
            button:   this.find('.pa-settings-button'),
            settings: this.data.settings
        });
        
        this.timer.timer.on('stop', function () {
            document.title = 'Помидорковый Таймер - ' 
                + (goals.get('recess') ? 'Перерыв' : 'Работай');
        });
    }
});

module.exports = App;