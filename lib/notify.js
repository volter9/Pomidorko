module.exports = {
    /**
     * Notify user with web-based notification
     * 
     * @param {String} message
     * @param {String} icon
     */
    notify: function (message, icon) {
        if (!'Notification' in window || Notification.permission !== 'granted') {
            return;
        }
        
        new Notification(message, {
            icon: icon
        });
    },
    
    /**
     * Request permission for sending notifications
     */
    request: function () {
        if (!'Notification' in window || Notification.permission === 'granted') {
            return;
        }
        
        Notification.requestPermission();
    }
};