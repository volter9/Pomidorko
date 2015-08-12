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
        this.goals     = this.data.goals;
        
        this.label = this.find('#timer-time');
        this.scale = this.find('.timer-wrapper');
        this.timer = new Timer(this);
        
        this.setupEvents();
        this.render(this.settings.get('time') * 60);
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
                self.render(settings.get('time') * 60);
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
    
    next: function () {
        var recess = !this.goals.get('recess'),
            round  = !recess + this.goals.get('current'),
            reset  = false;
        
        if (round > this.settings.get('total')) {
            round = 1;
            reset = true;
        }
        
        this.goals.merge({
            recess:  recess,
            current: round
        });
        
        if (reset) {
            return;
        }
        
        var time = recess 
            ? this.settings.get('shortBreak')
            : this.settings.get('time');
        
        if (recess && round % this.settings.get('round') === 0) {
            time = this.settings.get('longBreak');
        }
        
        this.toggle(false);
        this.timer.start(time * 60);
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
        
        this.label.innerHTML = min + ':' + sec;
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
            this.timer.start(this.settings.get('time') * 60);
        }
    },
    
    /**
     * Toggle the visual of the button
     */
    toggle: function (toggle) {
        var icon = this.find('.icon');
        
        icon.classList.toggle('pause', !toggle);
        icon.classList.toggle('play',  toggle);
        
        this.find('#timer-control').classList.toggle('play', toggle);
    }
});

module.exports = TimerView;