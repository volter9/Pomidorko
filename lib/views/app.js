var Settings = require('./settings'),
    Goals    = require('./goals'),
    About    = require('./about'),
    Timer    = require('./timer'),
    View     = require('../mvc/view'),
    lang     = require('../helpers/language');

var utils = require('../helpers/utils');

/**
 * Main application view
 * 
 * @param {Node} node
 * @param {Object} data
 */
module.exports = View.extend({
    /**
     * Initialize the main application view
     */
    initialize: function () {
        this.setupViews();
        this.setupEvents();
        
        this.update();
    },
    
    /**
     * Setup events for timer and goals model
     */
    setupEvents: function () {
        var self  = this,
            node  = this.node,
            goals = this.data.goals,
            timer = this.timer.timer,
            sound = new Audio('assets/bell.mp3');
        
        window.addEventListener('keypress', function (e) {
            var charCode = typeof e.which == "number"
                ? e.which 
                : e.keyCode;
            
            if (charCode === 32) {
                e.preventDefault();
                
                self.timer.button();
            }
        });
        
        window.addEventListener('beforeunload', function () {
            var remained = self.timer.timer.getRemained();
            
            if (remained && remained >= 0) {
                goals.set('remained', remained);
            }
        });
        
        goals.on('change', function () {
            node.classList.toggle('resting', goals.get('recess'));
        });
        
        timer.on('stop', function () {
            sound.play();
        });
        
        timer.on('start', this.update.bind(this));
    },
    
    /**
     * Setup child views
     */
    setupViews: function () {
        this.timer = new Timer(this.find('.pa-timer'), utils.merge(this.data, {
            recess: this.find('.pa-skip span')
        }));
        
        this.goals = new Goals(this.find('.pa-goals'), this.data);
        
        this.about = new About(this.find('.pa-about'), {
            button: this.find('.pa-about-button')
        });
    
        this.settings = new Settings(this.find('.pa-settings'), {
            settings: this.data.settings,
            button:   this.find('.pa-settings-button')
        });
    },
    
    /**
     * Update favicon, title and "skip" button label
     */
    update: function () {
        var recess = this.data.goals.get('recess');
        
        document.title = lang.get(recess ? 'recess' : 'work')
            + ' — ' + lang.get('title', 'помидорковый таймер');
        
        document.querySelector('link[rel=icon]').href = recess 
            ? 'assets/img/break.ico' 
            : 'assets/img/work.ico';
        
        document.querySelector('.pa-skip span').innerHTML = lang.get('skip')[+recess];
    }
});