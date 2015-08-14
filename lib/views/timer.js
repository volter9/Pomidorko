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
        
        this.label = this.find('#timer-time');
        this.scale = this.find('.timer-wrapper');
        this.timer = new Timer(this);
        
        this.setupEvents();
        this.render(this.settings.get('time') * 60);
        
        this.recess.addEventListener('click', function () {
            if (self.goals.get('recess') === true) {
                self.timer.stop();
            }
        });
        
        this.timer.on('start', this.toggleRecess.bind(this));
        this.toggleRecess();
    },
    
    /**
     * Toggle recess button display
     */
    toggleRecess: function () {
        this.recess.classList.toggle('hidden', !this.goals.get('recess'));
    },
    
    /**
     * Setup timer view events
     */
    setupEvents: function () {
        this.bind('#timer-control', 'click', this.button);
        this.timer.on('stop', this.stop.bind(this));
        
        var settings = this.settings,
            timer    = this.timer,
            self     = this;
        
        settings.on('change', function () {
            if (!timer.isTimeRemained() && !timer.isRunning()) {
                var round  = self.goals.get('current'),
                    recess = self.goals.get('recess');
                
            	var time = self.getTime(round, recess);
            	
                self.render(time * 60);
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
            round  = !recess + this.goals.get('current'),
            reset  = round > this.settings.get('total');
        
        this.goals.merge({
            recess:  recess,
            current: reset ? 1 : round
        });
        
        if (!reset) {
            this.startOver(round, recess);
        }
        else {
            this.render(this.getTime() * 60);
        }
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
        
        this.label.innerHTML = min + '<span class="colon">:</span>' + sec;
    },
    
    /**
     * Toggle the button and trigger specific action
     * 
     * Pause or play
     */
    button: function () {
        var toggle = this.find('.icon').classList.contains('pause');
        
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
        var icon = this.find('.icon');
        
        icon.classList.toggle('pause', !toggle);
        icon.classList.toggle('play',  toggle);
        
        this.find('#timer-control').classList.toggle('play', toggle);
    }
});

module.exports = TimerView;