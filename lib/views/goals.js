var View = require('../mvc/view');

/**
 * Goals view
 * 
 * @param {Node} node
 * @param {Object} data
 */
var Goals = View.extend({
    /**
     * Initialize goals view
     */
    initialize: function () {
        this.data.goals.on('change', this.render.bind(this));
    },

    render: function () {
        var goals = this.data.goals;
    
        this.find('.current').innerHTML = goals.get('current');
        this.find('.total').innerHTML   = goals.get('total');
    }
});

module.exports = Goals;