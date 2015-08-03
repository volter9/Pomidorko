var View = require('../mvc/view');

/**
 * Settings view
 * 
 * @param {Node} node
 * @param {Object} data
 */
var Settings = function (node, data) {
    View.call(this, node, data);
};

Settings.prototype = Object.create(View.prototype);

Settings.prototype.initialize = function () {
    this.data.button.addEventListener('click', this.toggle.bind(this));
};

Settings.prototype.toggle = function () {
    var hidden = this.node.classList.contains('hidden');
    
    this.node.classList.toggle('hidden', !hidden);
    this.node.classList.toggle('settings-appear', hidden);
    this.node.classList.toggle('settings-disappear', !hidden);
};

module.exports = Settings;