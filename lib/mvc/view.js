var extend = require('./extend');

/**
 * MVC view
 * 
 * This class is responsible for rendering data from models
 * 
 * @param {Node} node
 * @param {Object} data
 */
var View = function (node, data) {
    this.node = node;
    this.data = data;
    
    this.initialize();
};

View.prototype = {
    /** Methods that should be extended in subclasses */
    initialize: function () {},
    render: function () {},

    /**
     * Find an element by selector
     * 
     * @param {String} selector
     * @return {Node}
     */
    find: function (selector) {
        var node = this.node.querySelector(selector);
    
        if (!node) {
            console.warn('Could not find node by selector "' + selector + '"');
        }
    
        return node;
    },

    /**
     * Bind an event to specific element
     * 
     * @param {String|Node} selector
     * @param {String} event
     * @param {Function} callback
     */
    bind: function (selector, event, callback) {
        var node = selector instanceof Node ? selector : this.find(selector);
    
        if (node) {
            node.addEventListener(event, callback.bind(this));
        }
        else {
            console.warn('Node is not suitable for attaching events!');
        }
    }
};

View.extend = extend(View);

module.exports = View;