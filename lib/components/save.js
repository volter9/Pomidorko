var Component = require('./component');

module.exports = Component.extend({
    /**
     * @param {pomidorko.Timer} timer
     * @param {mvc.Model} goals
     */
    constructor: function (timer, goals) {
        this.timer = timer;
        this.goals = goals;
    },
    
    activate: function () {
        var timer = this.timer,
            goals = this.goals;
    
        window.addEventListener('beforeunload', function () {
            var remained = timer.getRemained();
        
            if (remained >= 0) {
                goals.set('remained', remained);
            }
        });
    },
})