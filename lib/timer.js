var events = require('./helpers/events');

/**
 * Main logic for timing and animation
 */
var Timer = function () {
    this.startTime = null;
    this.remained  = null;
    this.duration  = null;
    this.endTime   = null;
    
    this.timer = null;
};

Timer.prototype = {
    /**
     * Start the timer
     * 
     * @param {Number} time
     */
    start: function () {
        if (this.timer) {
            return;
        }
        
        time = this.remained ? this.remained 
                             : this.duration * 1000;
        
        this.startTime = Date.now();
        this.endTime   = this.startTime + time;
        
        this.timer = setInterval(this.tick.bind(this), 66);
        this.emit('start');
    },
    
    /**
     * @param {Number} time in seconds
     */
    setDuration: function (time) {
        this.duration = time;
    },

    /**
     * Timer tick
     */
    tick: function () {
        var time = (this.endTime - Date.now()) / 1000;
        
        if (time < 0) {
            this.emit('tick', 0);
            
            return this.stop();
        }
        
        this.emit('tick', time);
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
    
    getTime: function () {
        if (this.remained) {
            return this.remained / 1000;
        }
        
        return this.duration;
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

events(Timer.prototype)

module.exports = Timer;