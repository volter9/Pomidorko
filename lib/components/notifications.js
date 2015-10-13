var Component = require('./component'),
    notify    = require('../notify'),
    lang      = require('../helpers/language');

module.exports = Component.extend({
    /**
     * @param {pomidorko.Timer} timer
     * @param {mvc.Model} goals
     * @param {pomidorko.Settings} settings
     */
    constructor: function (timer, goals, settings) {
        this.timer = timer;
        this.goals = goals;
        this.settings = settings;
    },
    
    activate: function () {
        var self = this;
        
        this.timer.on('stop', this.notify.bind(this));
        this.settings.on('change', function () {
            if (self.settings.get('notifications') === true) {
                notify.request();
            }
        });
    },
    
    notify: function () {
        if (!this.settings.get('notifications')) {
            return;
        }
        
        var key = this.goals.get('recess') ? 'recess' : 'pomidorko';
        
        notify.notify(lang.get(key));
    }
});