var View   = require('../mvc/view'),
    utils  = require('../helpers/utils'),
    notify = require('../notify');

var Control = View.extend({
    /**
     * Initialize the view
     */
    initialize: function () {
        this.input = this.find('input');
        
        this.bind('span.pa-switch-on' , 'click', this.switchOn);
        this.bind('span.pa-switch-off', 'click', this.switchOff);
    },
    
    switchOn: function (dontUpdate) {
        this.node.classList.remove('pa-bool-off');
        this.node.classList.add('pa-bool-on');
        
        if (dontUpdate !== true) {
            this.data.settings.set(this.input.className, true);
            
            if (this.input.className === 'notifications') {
                notify.request();
            }
        }
    },
    
    switchOff: function (dontUpdate) {
        this.node.classList.remove('pa-bool-on');
        this.node.classList.add('pa-bool-off');
        
        if (dontUpdate !== true) {
            this.data.settings.set(this.input.className, false);
        }
    },
    
    set: function (value) {
        this.input.checked = value;
        
        value ? this.switchOn(true)
              : this.switchOff(true);
    }
});

module.exports = Control;