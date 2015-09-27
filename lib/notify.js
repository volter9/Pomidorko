module.exports = {
    notify: function (message, icon) {
        if (Notification.permission !== 'granted') {
            return;
        }
        
        new Notification(message, {
            icon: icon
        });
    },
    
    request: function () {
        if (Notification.permission === 'granted') {
            return;
        }
        
        Notification.requestPermission();
    }
};