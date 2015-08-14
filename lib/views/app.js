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
            recess:   this.find('.pa-recess'),
            goals:    this.data.goals,
        });
        
        this.goals = new Goals(this.find('#goals'), this.data);
        this.about = new About(this.find('.about'), {
            button: this.find('#about')
        });
    
        this.settings = new Settings(this.find('.pa-settings'), {
            button:   this.find('.pa-settings-button'),
            settings: this.data.settings
        });
        
        this.timer.timer.on('start', function () {
            var recess = !!goals.get('recess');
            
            document.title = (recess ? 'Перерыв' : 'Работа')
                + ' — помидорковый таймер';
            
            document.querySelector('link[rel=icon]').href = recess 
                ? 'img/break.ico' 
                : 'img/work.ico';
        });
    }
});

module.exports = App;