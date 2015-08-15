var View  = require('../mvc/view');

/**
 * Main application view
 * 
 * @param {Node} node
 * @param {Object} data
 */
var About = View.extend({
    initialize: function () {
        this.data.button.addEventListener('click', this.toggleView.bind(this));
        this.bind('.pa-close', 'click', this.toggleView);
    },
    
    close: function () {
        this.node.classList.add('hidden');
    
        this.toggle(this.node.classList.contains('hidden'));
    },
    
    toggleView: function () {
        this.node.classList.toggle('hidden');
        this.toggle(this.node.classList.contains('hidden'));
    },
    
    /**
     * Showing/hiding the about view
     * 
     * @param {Boolean} toggle
     */
    toggle: function (toggle) {
        this.node.classList.toggle('pa-about-appear', !toggle);
        this.node.classList.toggle('pa-about-disappear', toggle);
    }
});

module.exports = About;