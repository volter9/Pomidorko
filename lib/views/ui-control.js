var View = require('../mvc/view');

var Control = View.extend({
    /**
     * Initialize the view
     */
    initialize: function () {
        this.input = this.find('input');
    
        this.bind('.fa-plus',  'click', this.add);
        this.bind('.fa-minus', 'click', this.sub);
    },

    add: function (event) {
        this.perform(event, 1);
    },

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