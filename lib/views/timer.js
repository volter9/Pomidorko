var View  = require('../mvc/view'),
    Model = require('../mvc/model'),
    Timer = require('../timer'),
    math  = require('../helpers/math');

var pad = function (string, object) {
    return object.substr(string.length) + string;
};

var TimerView = View.extend({
    /**
     * Initialize the view
     */
    initialize: function () {
        var self = this;
        
        this.settings  = this.data.settings;
        this.recess    = this.data.recess;
        this.goals     = this.data.goals;
                
        this.label = this.find('.pa-timer-time');
        this.scale = this.find('.pa-timer-wrapper');
        this.timer = new Timer(this);
        
        this.setupEvents();
        this.render(this.getTime());
    },
    
    /**
     * Setup timer view events
     */
    setupEvents: function () {
        var settings = this.settings,
            timer    = this.timer,
            self     = this;
        
        this.bind('.pa-timer-control', 'click', this.button);
        this.timer.on('stop', this.stop.bind(this));
        
        this.recess.addEventListener('click', function () {
            self.timer.stop();
        });
        
        settings.on('change', function () {
            if (!timer.isTimeRemained() && !timer.isRunning()) {
                self.render(self.getTime());
            }
        });
    },
    
    /**
     * Show visually that timer is stopped and 
     * switch to the next round
     */
    stop: function () {
        this.toggle(true);
        this.render(0);
        
        var recess = !this.goals.get('recess'),
            round  = !!recess + this.goals.get('current');
        
        this.goals.merge({
            recess:   recess,
            current:  round,
            remained: false
        });
        
        this.startOver(round, recess);
    },
    
    /**
     * Get time from current state in seconds
     * 
     * @param {Number} round
     * @param {Number} recess
     * @return {Number}
     */
    getTime: function (round, recess) {
        var remained = this.goals.get('remained');
        
        if (remained) {
            return remained / 1000;
        }
        
        round  = round  || this.goals.get('current');
        recess = recess || this.goals.get('recess');
        
        var time = recess 
            ? this.settings.get('shortBreak')
            : this.settings.get('time');
    
        if (recess && round % this.settings.get('round') === 0) {
            time = this.settings.get('longBreak');
        }
        
        return time * 60;
    },
    
    /**
     * Start the timer over
     * 
     * @param {Number} round
     * @param {Boolean} recess
     */
    startOver: function (round, recess) {
        this.toggle(false);
        this.timer.start(this.getTime(round, recess));
    },
    
    /**
     * Render with time
     * 
     * > time % 60 + 0.15
     * 
     * This additional "0.15" is needed to emulate smooth transition between 
     * ':00 seconds to ':59 seconds. Without this float number the transition 
     * looks too sharp.
     * 
     * @param {Number} time
     */
    render: function (time) {
        var min = Math.floor(time / 60),
            sec = Math.floor(time % 60 + 0.15);
        
        this.renderTime(min, math.clamp(sec, 0, 59));
        this.renderScale(time);
    },
    
    /**
     * Render the scale
     * 
     * @param {Number} time
     */
    renderScale: function (time) {
        var margin = time / 60 / 55,
            pos    = margin * 3300;
        
        this.scale.style.marginLeft = -pos + 'px';
    },
    
    /**
     * Render time 
     * 
     * @param {Number} min
     * @param {Nunber} sec
     */
    renderTime: function (min, sec) {
        this.find('.pa-min').innerHTML = pad(min.toString(), '00');
        this.find('.pa-sec').innerHTML = pad(sec.toString(), '00');
    },
    
    /**
     * Toggle the button and trigger specific action
     * 
     * Pause or play
     */
    button: function () {
        var toggle = this.find('.pa-icon').classList.contains('pa-pause');
        
        this.toggle(toggle);
        
        toggle 
            ? this.timer.pause()
            : this.timer.start(this.getTime());
    },
    
    /**
     * Toggle the visual of the button
     * 
     * @param {Boolean} toggle
     */
    toggle: function (toggle) {
        var icon = this.find('.pa-icon');
        
        icon.classList.toggle('pa-pause', !toggle);
        icon.classList.toggle('pa-play',  toggle);
        
        this.find('.pa-timer-control').classList.toggle('pa-play', toggle);
    }
});

module.exports = TimerView;