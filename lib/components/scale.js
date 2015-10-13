var Component = require('./component');

module.exports = Component.extend({
    /**
     * @param {Node} scale
     * @param {pomidorko.Timer} timer
     */
    constructor: function (scale, timer) {
        this.scale = scale;
        this.timer = timer;
    },
    
    activate: function () {
        this.timer.on('tick', this.render.bind(this));
        this.timer.on('start', this.render.bind(this));
        
        this.render(this.timer.getTime());
    },
    
    /**
     * @param {Number} timer
     */
    render: function (time) {
        pos = time / 60 / 55 * 3300;
        
        this.scale.style.marginLeft = -pos + 'px';
    }
});