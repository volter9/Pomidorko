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
        this.goals    = this.data.goals;
        
        this.label = this.find('#timer-time');
        this.scale = this.find('.timer-wrapper');
        this.timer = new Timer(this);
        
        this.bind('#timer-control', 'click', this.button);
        
        this.timer.on('stop', function () {
            self.toggle(true);
            self.render(0);
        });
        
        this.render(this.settings.get('time') * 60);
    },
    
    /**
     * Render with time
     * 
     * @param {Number} time
     */
    render: function (time) {
        var min = Math.floor(time / 60).toString(),
            sec = Math.floor(time % 60).toString();
        
        this.setTime(min, sec);
        this.renderScale(time);
    },
    
    renderScale: function (time) {
        var margin = time / 60 / 55
            pos    = margin * 3300;
        
        this.scale.style.marginLeft = -pos + 'px';
    },
    
    /**
     * Set time 
     * 
     * @param {Number} min
     * @param {Nunber} sec
     */
    setTime: function (min, sec) {
        min = pad(min, '00');
        sec = pad(sec, '00');
        
        this.label.innerHTML = min + ':' + sec;
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
            this.timer.start(this.settings.get('time') * 60);
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