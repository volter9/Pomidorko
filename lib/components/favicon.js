var Component = require('./component');

module.exports = Component.extend({
    /**
     * @param {Node} link
     * @param {pomidorko.Timer} timer
     * @param {mvc.Model} goals
     */
    constructor: function (link, timer, goals) {
        this.link = link;
        this.timer = timer;
        this.goals = goals;
    },
    
    activate: function () {
        this.timer.on('stop', this.change.bind(this));
        
        this.change();
    },
    
    change: function () {
        var icon = this.goals.get('recess') ? 'break.ico' : 'work.ico';
        
        this.link.href = 'assets/img/' + icon;
    }
});