var View = require('../mvc/view'),
    math = require('../helpers/math');

var phrases = [
    'Так держать!',
    'Отлично!',
    'Супер!',
    'День прожит не зря!',
    'Вау, молодец!',
    'Теперь можно посмотреть любимый сериал',
    'Ого, так много помидорок сегодня еще никто не отрабатывал. Поздравляю!',
    'Горжусь тобой!'
];

var randomPhrase = function () {
    return phrases[math.random(0, phrases.length - 1)];
};

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
        this.data.goals.on('change', this.render.bind(this));
        this.data.settings.on('change', this.render.bind(this));
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
            status.innerHTML = ' &mdash; ' + randomPhrase();
        }
    }
});

module.exports = Goals;