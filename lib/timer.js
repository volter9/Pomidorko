var events = require('./helpers/events');

/**
 * Main logic for timing and animation
 * 
 * @param {TimerView} view
 */
var Timer = function (view) {
    this.startTime = null;
    this.endTime   = null;
    this.remained  = null;
    
    this.timer = null;
    this.view  = view;
};

events(Timer.prototype);

/**
 * Start the timer
 * 
 * @param {Number} time
 */
Timer.prototype.start = function (time) {
    if (this.timer) {
        return;
    }
    
    time = this.remained ? this.remained : time * 1000;
    
    this.startTime = Date.now();
    this.endTime = this.startTime + time;
    
    this.timer = setInterval(this.tick.bind(this), 80);
    this.emit('start');
};

/**
 * Timer tick
 */
Timer.prototype.tick = function () {
    var time = this.endTime - Date.now();
    
    if (time < 0) {
        this.view.render(0);
        
        return this.stop();
    }
    
    this.view.render(time / 1000);
};

/**
 * Pause the timer and save the remained time
 */
Timer.prototype.pause = function () {
    clearInterval(this.timer);
    
    this.timer = null;
    
    this.remained  = this.endTime - Date.now(); 
    this.startTime = this.endTime = null;
};

/**
 * Stop the timer
 */
Timer.prototype.stop = function () {
    this.remained = this.endTime = this.startTime = null;
    
    clearInterval(this.timer);
    
    this.timer = null;
    this.emit('stop');
};

module.exports = Timer;