var Component = require('./component');

module.exports = Component.extend({
    /**
     * @param {pomidorko.Timer} timer
     * @param {pomidorko.Settings} settings
     * @param {Audio} sound
     */
    constructor: function (timer, settings, sound) {
        this.timer = timer;
        this.settings = settings;
        this.sound = sound;
    },
    
    activate: function () {
        this.timer.on('stop', this.play.bind(this));
    },
    
    play: function () {
        if (!this.settings.get('sound')) {
            return;
        }
        
        this.sound.play();
    }
});