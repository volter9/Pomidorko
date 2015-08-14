var View = require('../mvc/view');

var Control = View.extend({
    /**
     * Initialize the view
     */
    initialize: function () {
        var settings = this.data.settings,
            input    = this.find('input');
        
        this.input = input;
        this.bind('.plus',  'click', this.add);
        this.bind('.minus', 'click', this.sub);
        
        this.bind('input', 'change', function () {
            var value = parseInt(input.value);
            
            settings.set(input.className, Math.round(value));
        });
    },
    
    /**
     * Add to current value
     */
    add: function (event) {
        this.perform(event, 1);
    },
    
    /**
     * Subtract from current value
     */
    sub: function (event) {
        this.perform(event, -1);
    },

    /**
     * Perform an operation
     * 
     * @param {Event} event
     * @param {Number} num
     */
    perform: function (event, num) {
        event.preventDefault();
        
        var value = parseInt(this.input.value) + num,
            event = document.createEvent('HTMLEvents');
        
        event.initEvent('change', null, false);
        
        this.input.value = isNaN(value) ? 0 : value;
        this.input.dispatchEvent(event);
    }
});

module.exports = Control;