var Component = require('./component');

module.exports = Component.extend({
    /**
     * @param {Node} label
     * @param {mvc.Model} goals
     * @param {pomidorko.Settings} settings
     */
    constructor: function (label, goals, settings) {
        this.label = label;
        this.goals = goals;
        this.settings = settings;
    },
    
    activate: function () {
        var callback = this.render.bind(this);
        
        this.goals.on('change', callback);
        this.settings.on('change', callback);
        
        this.render();
    },
    
    render: function () {
        var current = this.goals.get('current'),
            total   = this.settings.get('total');
        
        this.label.querySelector('.pa-current').innerHTML = current;
        this.label.querySelector('.pa-total').innerHTML   = total;
    }
});