var Component = require('./component');

module.exports = Component.extend({
    /**
     * @param {pomidorko.Timer} timer
     * @param {pomidorko.Settings} settings
     * @param {Audio} sound
     */
    constructor: function (timer, settings, sound) {
        this.timer = timer;
        this.sound = sound;
        this.settings = settings;
        
        this.enabled = false;
        this.last = null;
    },
    
    activate: function () {
        var self = this;
        
        this.timer.on('tick', this.tick.bind(this));
        this.settings.on('change', function () {
            self.enabled = self.settings.get('tick');
        });
        
        this.enabled = this.settings.get('tick');
    },
    
    /**
     * @param {Number} time
     */
    tick: function (time) {
        if (!this.enabled) {
            return;
        }
        
        var last = Math.floor(time % 60);
        
        if (
            this.last !== last && 
            this.last !== null
        ) {
            this.sound.play();
        }
        
        this.last = last;
    }
});