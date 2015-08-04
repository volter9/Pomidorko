var View  = require('../mvc/view'),
    utils = require('../helpers/utils');

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
    this.data.settings.on('change', this.render.bind(this));
};

/**
 * Toggle the view
 */
Settings.prototype.toggle = function () {
    var hidden = this.node.classList.contains('hidden');
    
    this.node.classList.toggle('hidden');
    this.node.classList.toggle('settings-appear', hidden);
    this.node.classList.toggle('settings-disappear', !hidden);
};

Settings.prototype.render = function () {
    var self = this,
        data = this.data.settings.all();
    
    utils.each(data, function (value, key) {
        self.find('input.' + key).value = value;
    });
};

module.exports = Settings;