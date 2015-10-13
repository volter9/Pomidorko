var Component = require('./component'),
    lang      = require('../helpers/language');

module.exports = Component.extend({
    /**
     * @param {Node} button
     * @param {pomidorko.Timer} timer
     * @param {mvc.Model} goals
     */
    constructor: function (button, timer, goals) {
        this.button = button.querySelector('span');
        this.timer = timer;
        this.goals = goals;
    },
    
    activate: function () {
        var self = this;
        
        this.button.addEventListener('click', function () {
            self.timer.stop();
        });
        
        this.goals.on('change', this.title.bind(this));
        this.title();
    },
    
    title: function () {
        var title = lang.get('skip')[+this.goals.get('recess')];
        
        this.button.innerHTML = title;
    }
});