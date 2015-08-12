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
        this.data.settings.on('change', this.render.bind(this));
    },

    render: function () {
        var goals    = this.data.goals,
            settings = this.data.settings;
    
        this.find('.current').innerHTML = goals.get('current');
        this.find('.total').innerHTML   = settings.get('total');
    }
});

module.exports = Goals;