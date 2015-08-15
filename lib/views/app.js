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
            goals = this.data.goals,
            sound = new Audio('assets/bell.mp3');
        
        goals.on('change', function () {
            node.classList.toggle('resting', goals.get('recess'));
        });
        
        this.timer = new Timer(this.find('#timer'), {
            settings: this.data.settings,
            recess:   this.find('.pa-recess span'),
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
                ? 'assets/img/break.ico' 
                : 'assets/img/work.ico';
            
            document.querySelector('.pa-recess span').innerHTML = recess
                ? 'Пропустить перерыв'
                : 'Пропустить помидорку';
        });
        
        this.timer.timer.on('stop', function () {
            sound.play();
        });
    }
});

module.exports = App;