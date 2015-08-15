var View  = require('../mvc/view'),
    Model = require('../mvc/model'),
    Timer = require('../timer');

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
        this.render(this.settings.get('time') * 60);
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
                self.render(self.getTime() * 60);
            }
        });
    },
    
    /**
     * Show visually that timer is stopped
     */
    stop: function () {
        this.toggle(true);
        this.render(0);
        
        this.next();
    },
    
    /**
     * Switch to the next round
     */
    next: function () {
        var recess = !this.goals.get('recess'),
            round  = !!recess + this.goals.get('current');
        
        this.goals.merge({
            recess:  recess,
            current: round
        });
        
        this.startOver(round, recess);
    },
    
    /**
     * Get time from current state
     * 
     * @param {Number} round
     * @param {Number} recess
     * @return {Number}
     */
    getTime: function (round, recess) {
        round  = round  || this.goals.get('current');
        recess = recess || this.goals.get('recess');
        
        var time = recess 
            ? this.settings.get('shortBreak')
            : this.settings.get('time');
    
        if (recess && round % this.settings.get('round') === 0) {
            time = this.settings.get('longBreak');
        }
        
        return time;
    },
    
    /**
     * Start the timer over
     * 
     * @param {Number} round
     * @param {Boolean} recess
     */
    startOver: function (round, recess) {
        this.toggle(false);
        this.timer.start(this.getTime(round, recess) * 60);
    },
    
    /**
     * Render with time
     * 
     * @param {Number} time
     */
    render: function (time) {
        var min = Math.floor(time / 60).toString(),
            sec = Math.floor(time % 60).toString();
        
        this.setTime(min, sec);
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
     * Set time 
     * 
     * @param {Number} min
     * @param {Nunber} sec
     */
    setTime: function (min, sec) {
        min = pad(min, '00');
        sec = pad(sec, '00');
        
        this.label.innerHTML = min + '<span class="pa-colon">:</span>' + sec;
    },
    
    /**
     * Toggle the button and trigger specific action
     * 
     * Pause or play
     */
    button: function () {
        var toggle = this.find('.pa-icon').classList.contains('pa-pause');
        
        this.toggle(toggle);
        
        if (toggle) {
            this.timer.pause();
        }
        else {
            this.timer.start(this.getTime() * 60);
        }
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