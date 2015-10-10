var div = document.createElement('div');

var dom = module.exports = {
    /**
     * Toggle class
     * 
     * @param {Node} node
     * @param {String} className
     * @param {Boolean} toggle
     */
    toggle: function (node, className, toggle) {
        toggle = typeof toggle === 'undefined'
            ? !node.classList.contains(className)
            : toggle;
        
        node.classList.toggle(className, toggle);
    },
    
    add: function (node, className) {
        node.classList.add(className);
    },
    
    remove: function (node, className) {
        node.classList.remove(className);
    },

    /**
     * Create node from HTML
     * 
     * @param {String} html
     */
    createNode: function (html) {
        div.innerHTML = html;
    
        return div.children[0];
    },

    /**
     * Find first node by selector
     * 
     * @param {String} selector
     * @param {Node} node
     * @return {Node}
     */
    find: function (selector, node) {
        node = node || document;
    
        return node.querySelector(selector);
    },

    /**
     * Find all nodes by selector
     * 
     * @param {String} selector
     * @param {Node} node
     * @return {NodeList}
     */
    findAll: function (selector, node) {
        node = node || document;
    
        return node.querySelectorAll(selector);
    }
};