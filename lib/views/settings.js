var View    = require('../mvc/view'),
    Control = require('./ui-control');

var utils = require('../helpers/utils');

/**
 * Settings view
 * 
 * @param {Node} node
 * @param {Object} data
 */
var Settings = View.extend({
    /**
     * Initialize the view
     */
    initialize: function () {
        this.data.button.addEventListener('click', this.toggle.bind(this));
        this.data.settings.on('change', this.render.bind(this));
    
        var settings = this.data.settings,
            controls = this.node.querySelectorAll('.pa-control');
    
        utils.toArray(controls).forEach(function (node) {
            var control = new Control(node, {settings: settings});
        });
    },

    /**
     * Toggle the view
     */
    toggle: function () {
        var hidden = this.node.classList.contains('hidden');
    
        this.node.classList.toggle('hidden');
        this.node.classList.toggle('pa-settings-appear', hidden);
        this.node.classList.toggle('pa-settings-disappear', !hidden);
    },

    /**
     * Render the view
     */
    render: function () {
        var self = this,
            data = this.data.settings.all();
    
        utils.each(data, function (value, key) {
            self.find('input.' + key).value = value;
        });
    }
});

module.exports = Settings;