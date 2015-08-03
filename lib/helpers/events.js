var events = function (proto) {
    /**
     * Bind an event
     * 
     * @param {String} event
     * @param {Function} callback
     */
    proto.on = function (event, callback) {
        if (!this._events) {
            this._events = {};
        }
        
        if (!this._events[event]) {
            this._events[event] = [];
        }
        
        this._events[event].push(callback);
    };
    
    /**
     * Emit an event
     * 
     * @param {String} event
     * @param {Array} args
     */
    proto.emit = function (event) {
        if (!this._events || !this._events[event]) {
            return;
        }
        
        var args = mini_blog.toArray(arguments).slice(1);
    
        this._events[event].forEach(function (callback) {
            if (!callback) {
                return;
            }
        
            callback.apply(callback, args);
        });
    };
};

module.exports = events;