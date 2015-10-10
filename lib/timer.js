var events = require('./helpers/events');

/**
 * Main logic for timing and animation
 * 
 * @param {TimerView} view
 */
var Timer = function (view) {
    this.startTime = null;
    this.remained  = null;
    this.endTime   = null;
    
    this.timer = null;
    this.view  = view;
};

Timer.prototype = {
    /**
     * Start the timer
     * 
     * @param {Number} time
     */
    start: function (time) {
        if (this.timer) {
            return;
        }
    
        time = this.remained ? this.remained : time * 1000;
    
        this.startTime = Date.now();
        this.endTime = this.startTime + time;
    
        this.timer = setInterval(this.tick.bind(this), 80);
        this.emit('start');
    },

    /**
     * Timer tick
     */
    tick: function () {
        var time = this.endTime - Date.now();
    
        if (time < 0) {
            this.view.render(0);
        
            return this.stop();
        }
    
        this.view.render(time / 1000);
    },

    /**
     * Pause the timer and save the remained time
     */
    pause: function () {
        clearInterval(this.timer);
    
        this.timer = null;
    
        this.remained  = this.endTime - Date.now(); 
        this.startTime = this.endTime = null;
    },

    /**
     * Stop the timer
     */
    stop: function () {
        this.remained = this.endTime = this.startTime = null;
    
        clearInterval(this.timer);
    
        this.timer = null;
        this.emit('stop');
    },

    /**
     * Check whether timer is running or not
     * 
     * @return {Boolean}
     */
    isRunning: function () {
        return Boolean(this.timer);
    },

    /**
     * Get remained time
     * 
     * @return {Number}
     */
    getRemained: function () {
        if (this.remained) {
            return this.remained;
        }
    
        return this.endTime - Date.now();
    },

    /**
     * Check whether timer has time still remained and is paused/stopped
     * 
     * @return {Boolean}
     */
    isTimeRemained: function () {
        return this.remained !== null;
    }
};

events(Timer.prototype);

module.exports = Timer;