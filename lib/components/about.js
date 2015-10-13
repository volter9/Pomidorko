var Component = require('./component');

module.exports = Component.extend({
    /**
     * @param {Node} button
     * @param {Node} container
     */
    constructor: function (button, container) {
        this.button = button;
        this.container = container;
    },
    
    activate: function () {
        var callback = this.toggle.bind(this);
        
        this.button.addEventListener('click', callback);
        this.container.querySelector('.pa-close')
                      .addEventListener('click', callback);
    },
    
    toggle: function () {
        var toggle = this.container.classList.contains('hidden');
        
        this.container.classList.toggle('hidden');
        this.container.classList.toggle('pa-about-appear', toggle);
        this.container.classList.toggle('pa-about-disappear', !toggle);
    }
});