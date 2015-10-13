var Component = require('./component'),
    Time      = require('../helpers/time');

/**
 * @param {String} string
 * @param {String} object
 * @return {String}
 */
var pad = function (string, object) {
    return object.substr(string.length) + string;
};

module.exports = Component.extend({
    /**
     * @param {Node} label
     * @param {pomidorko.Timer} timer
     */
    constructor: function (label, timer) {
        this.min = label.querySelector('.pa-min');
        this.sec = label.querySelector('.pa-sec');
        
        this.timer = timer;
    },
    
    activate: function () {
        var self = this;
        
        this.timer.on('tick', this.render.bind(this));
        this.timer.on('start', function () {
            self.render(self.timer.getTime());
        });
        
        this.render(this.timer.getTime());
    },
    
    /**
     * @param {Number} time
     */
    render: function (time) {
        time = Time(time);
        
        this.min.innerHTML = time.min;
        this.sec.innerHTML = time.sec;
    }
});