var View  = require('../mvc/view');

/**
 * Main application view
 * 
 * @param {Node} node
 * @param {Object} data
 */
var About = View.extend({
    initialize: function () {
        this.bind('.pa-close', 'click', this.toggle);
        this.data.button.addEventListener('click', this.toggle.bind(this));
    },
    
    /**
     * View/hide about page
     */
    toggle: function () {
        var toggle = this.node.classList.contains('hidden');
        
        this.node.classList.toggle('hidden');
        this.node.classList.toggle('pa-about-appear', toggle);
        this.node.classList.toggle('pa-about-disappear', !toggle);
    }
});

module.exports = About;