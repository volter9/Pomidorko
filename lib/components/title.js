var Component = require('./component'),
    Time      = require('../helpers/time'),
    lang      = require('../helpers/language');

module.exports = Component.extend({
    /**
     * @param {pomidorko.Timer} timer
     * @param {mvc.Model} goals
     */
    constructor: function (timer, goals) {
        this.timer = timer;
        this.goals = goals;
        this.last  = null;
    },
    
    activate: function () {
        this.timer.on('tick', this.tick.bind(this));
        
        this.tick(this.timer.getTime());
    },
    
    /**
     * @param {Number} time
     */
    tick: function (time) {
        time = Time(time);
    
        if (
            this.last !== time.sec &&
            this.last !== null 
        ) {
            var title = time.min + ':' + time.sec;
            
            title += ' · ' + lang.get(this.goals.get('recess') ? 'recess' : 'work');
            title += ' — ' + lang.get('title', 'помидорковый таймер');
            
            document.title = title;
        }
        
        this.last = time.sec;
    }
});