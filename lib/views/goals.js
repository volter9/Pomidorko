var View = require('../mvc/view'),
    math = require('../helpers/math'),
    lang = require('../helpers/language');

/**
 * Goals view
 * 
 * @param {Node} node
 * @param {Object} data
 */
var Goals = View.extend({
    /**
     * Initialize goals view
     */
    initialize: function () {
        this.phrases = lang.get('phrases');
        
        this.data.goals.on('change', this.render.bind(this));
        this.data.settings.on('change', this.render.bind(this));
    },
    
    randomPhrase: function () {
        return this.phrases[math.random(0, this.phrases.length - 1)];
    },
    
    /**
     * Display the timer stats
     */
    render: function () {
        var goals    = this.data.goals,
            settings = this.data.settings;
        
        var current = goals.get('current'),
            recess  = goals.get('recess'),
            status  = this.find('.pa-status'),
            total   = settings.get('total');
        
        this.find('.pa-current').innerHTML = current;
        this.find('.pa-total').innerHTML   = total;
        
        if (
            current >= total &&
            status.classList.contains('hidden')
        ) { 
            status.classList.remove('hidden');
            status.innerHTML = ' &mdash; ' + this.randomPhrase();
        }
    }
});

module.exports = Goals;