var Settings = require('./settings'),
    Goals    = require('./goals'),
    About    = require('./about'),
    Timer    = require('./timer'),
    View     = require('../mvc/view');

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
        
        this.timer = new Timer(this.find('.pa-timer'), {
            settings: this.data.settings,
            recess:   this.find('.pa-skip span'),
            goals:    this.data.goals,
        });
        
        this.goals = new Goals(this.find('.pa-goals'), this.data);
        this.about = new About(this.find('.pa-about'), {
            button: this.find('.pa-about-button')
        });
    
        this.settings = new Settings(this.find('.pa-settings'), {
            button:   this.find('.pa-settings-button'),
            settings: this.data.settings
        });
        
        this.timer.timer.on('stop', function () {
            sound.play();
        });
        this.timer.timer.on('start', this.update.bind(this));
    },
    
    /**
     * Update favicon, title and "skip" button label
     */
    update: function () {
        var recess = this.data.goals.get('recess');
        
        document.title = (recess ? 'Перерыв' : 'Работа')
            + ' — помидорковый таймер';
        
        document.querySelector('link[rel=icon]').href = recess 
            ? 'assets/img/break.ico' 
            : 'assets/img/work.ico';
        
        document.querySelector('.pa-skip span').innerHTML = recess
            ? 'Пропустить перерыв'
            : 'Пропустить помидорку';
    }
});

module.exports = App;