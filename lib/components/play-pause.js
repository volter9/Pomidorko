var Component = require('./component');

module.exports = Component.extend({
    /**
     * @param {Node} control
     * @param {pomidorko.Timer} timer
     */
    constructor: function (control, timer) {
        this.control = control;
        this.timer   = timer;
        this.icon    = control.querySelector('.pa-icon');
    },
    
    activate: function () {
        var self = this;
        
        this.timer.on('stop', function () {
            self.toggleState(true);
        });
        
        this.timer.on('start', function () {
            self.toggleState(false);
        });
        
        var callback =  function () {
            var toggle = self.timer.isRunning();
            
            self.toggle(toggle);
            self.toggleState(toggle);
        };

        this.control.addEventListener('click', callback);
        window.addEventListener('keyup', function (e) {
            e.preventDefault();

            var keyCode = e.which || e.keyCode;

            if (keyCode === 32) {
                callback();
            }
        });
    },
    
    /**
     * @param {Boolean} toggle
     */
    toggle: function (toggle) {
        toggle ? this.timer.pause()
               : this.timer.start();
    },
    
    /**
     * @param {Boolean} toggle
     */
    toggleState: function (toggle) {
        var icon = this.icon;
        
        icon.classList.toggle('pa-pause', !toggle);
        icon.classList.toggle('pa-play',  toggle);
        
        this.control.classList.toggle('pa-play', toggle);
    }
});