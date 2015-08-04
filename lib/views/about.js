var View  = require('../mvc/view');

/**
 * Main application view
 * 
 * @param {Node} node
 * @param {Object} data
 */
var About = function (node, data) {
    View.call(this, node, data);
};

About.prototype = Object.create(View.prototype);

About.prototype.initialize = function () {
    this.data.button.addEventListener('click', this.show.bind(this));
    
    this.bind('.close', 'click', this.close);
};

/**
 * Showing/hiding the about view
 */
About.prototype.show = function () {
    this.node.classList.remove('hidden');
    
    this.toggle(this.node.classList.contains('hidden'));
};

About.prototype.close = function () {
    this.node.classList.add('hidden');
    
    this.toggle(this.node.classList.contains('hidden'));
};

About.prototype.toggle = function (toggle) {
    this.node.classList.toggle('about-appear', !toggle);
    this.node.classList.toggle('about-disappear', toggle);
};

module.exports = About;