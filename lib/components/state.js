var Component = require('./component');

module.exports = Component.extend({
    /**
     * @param {Node} container
     * @param {pomidorko.Timer} timer
     * @param {mvc.Model} goals
     * @param {pomidorko.Settings} goals
     */
    constructor: function (container, timer, goals, settings) {
        this.container = container;
        this.settings = settings;
        this.timer = timer;
        this.goals = goals;
    },
    
    activate: function () {
        var self = this;
        
        this.timer.on('stop', function () {
            self.next();
            self.setup();
            self.timer.start();
        });
        
        this.setup();
    },
    
    setup: function () {
        var round  = this.goals.get('current'),
            recess = this.goals.get('recess');
        
        this.timer.setDuration(
            this.getTime(round, recess)
        );
        
        this.container.classList.toggle('resting', recess);
    },
    
    next: function () {
        var recess = !this.goals.get('recess'),
            round  = !!recess + this.goals.get('current');

        this.goals.merge({
            recess:   recess,
            current:  round,
            remained: false
        });
    },
    
    /**
     * @param {Number} round
     * @param {Number} recess
     * @return {Number}
     */
    getTime: function (round, recess) {
        var remained = this.goals.get('remained');
        
        if (remained) {
            return remained / 1000;
        }
        
        var time = recess ? this.settings.get('shortBreak')
                          : this.settings.get('time');
    
        if (recess && round % this.settings.get('round') === 0) {
            time = this.settings.get('longBreak');
        }
        
        return time * 60;
    }
});