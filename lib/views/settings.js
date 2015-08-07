var View    = require('../mvc/view'),
    Control = require('./ui-control'),
    utils   = require('../helpers/utils');

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
    
        var settings = this.data.settings;
    
        utils.toArray(this.node.querySelectorAll('.ui-control')).forEach(function (node) {
            new Control(node);
        
            node.querySelector('input').addEventListener('change', function () {
                settings.set(this.className, parseInt(this.value));
            });
        });
    },

    /**
     * Toggle the view
     */
    toggle: function () {
        var hidden = this.node.classList.contains('hidden');
    
        this.node.classList.toggle('hidden');
        this.node.classList.toggle('settings-appear', hidden);
        this.node.classList.toggle('settings-disappear', !hidden);
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