var Component = require('./component'),
    Controls  = require('../controls'),
    utils     = require('../helpers/utils'),
    View      = require('../mvc/view');

module.exports = Component.extend({
    /**
     * Initialize the view
     * 
     * @param {Node} butotn
     * @param {Node} view
     * @param {pomidorko.Settings} settings
     */
    constructor: function (button, view, settings) {
        this.button = button;
        this.view = view;
        this.settings = settings;
    },
    
    activate: function () {
        this.button.addEventListener('click', this.toggle.bind(this));
        this.settings.on('change', this.render.bind(this));
    
        var settings = this.settings,
            controls = this.view.querySelectorAll('.pa-control, .pa-bool');
    
        this.fields = utils.toArray(controls).map(function (node) {
            return new Controls[node.dataset.type](node, {settings: settings});
        });
        
        this.render();
    },
    
    /**
     * Toggle the view
     */
    toggle: function () {
        var hidden = this.view.classList.contains('hidden'),
            view   = this.view.classList;
    
        view.toggle('hidden');
        view.toggle('pa-settings-appear', hidden);
        view.toggle('pa-settings-disappear', !hidden);
    },

    /**
     * Render the view
     */
    render: function () {
        var data = this.settings.all();
        
        this.fields.forEach(function (field) {
            field.set(data[field.input.className]);
        });
    }
});