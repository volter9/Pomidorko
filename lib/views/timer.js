var View  = require('../mvc/view'),
    Timer = require('../timer');

var pad = function (string, object) {
    return object.substr(string.length) + string;
};

var TimerView = View.extend({
    /**
     * Initialize the view
     */
    initialize: function () {
        var self = this;
        
        this.settings = this.data.settings;
        this.label    = this.find('#timer-time');
        this.timer    = new Timer(this);
        
        this.bind('#timer-control', 'click', this.button);
        this.timer.on('stop', function () {
            self.toggle(true);
        });
    },
    
    /**
     * Render with time
     * 
     * @param {Number} time
     */
    render: function (time) {
        var min = Math.floor(time / 60).toString(),
            sec = Math.floor(time % 60).toString();
        
        this.label.innerHTML = pad(min, '00') + ':' + pad(sec, '00');
    },
    
    /**
     * Toggle the button and trigger specific action
     * 
     * Pause or play
     */
    button: function () {
        var toggle = this.find('.fa').classList.contains('fa-pause');
        
        this.toggle(toggle);
        
        if (toggle) {
            this.timer.pause();
        }
        else {
            var time = this.settings.get('time') * 60;
            
            this.timer.start(time);
        }
    },
    
    /**
     * Toggle the visual of the button
     */
    toggle: function (toggle) {
        var icon = this.find('.fa');
        
        icon.classList.toggle('fa-pause', !toggle);
        icon.classList.toggle('fa-play',  toggle);
        
        this.find('#timer-control').classList.toggle('play', toggle);
    }
});

module.exports = TimerView;