var config = require('../config'),
    ls     = window.localStorage;

module.exports = {
    storage: JSON.parse(ls.getItem(config.key)) || {},
    
    /**
     * @param {String} id
     * @return {Object}
     */
    fetch: function (id) {
        return this.storage[id] || {};
    },
    
    persist: function () {
        ls.setItem(config.key, JSON.stringify(this.storage));
    },
    
    /**
     * @param {String} id
     * @param {Object} data
     */
    save: function (id, data) {
        this.storage[id] = data;
        this.persist();
    },
    
    /**
     * @param {String} id
     */
    remove: function (id) {
        delete this.storage[id];
        
        this.persist();
    }
};