module.exports = {
    strings: {},
    
    /**
     * Set strings
     * 
     * @param {Object} strings
     */
    set: function (strings) {
        this.strings = strings;
    },
    
    /**
     * Get localized string
     * 
     * @param {String} name
     * @param {String} defaults
     * @return {String}
     */
    get: function (name, defaults) {
        return name in this.strings ? this.strings[name] : defaults;
    }
};