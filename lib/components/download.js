var Component = require('./component');

module.exports = Component.extend({
    /**
     * @parma {Node} download
     * @param {mvc.Model} goals
     * @param {mvc.Model} settings
     */
    constructor: function (download, goals, settings) {
        this.download = download;
        this.goals = goals;
        this.settings = settings;
    },
    
    activate: function () {
        this.goals.on('change', this.toggle.bind(this));
        this.settings.on('change', this.toggle.bind(this));
        
        this.toggle();
    },
    
    toggle: function () {
        var current = this.goals.get('current'),
            total   = this.settings.get('total');
        
        if (current >= total && !this.download.classList.contains('hidden')) {
            this.download.classList.add('hidden');
        }
    }
});