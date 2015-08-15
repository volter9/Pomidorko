var View = require('../mvc/view');

var phrases = [
    'Так держать!',
    'Отлично!',
    'Супер!',
    'День прожит не зря!',
    'Вау, молодец!',
    'Теперь можно посмотреть любимый сериал.',
    'Горжусь тобой!',
    'Возьми печеньку с полки',
    'Тебе за терпение и труд медаль надо вручить!'
];

var rand = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
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
    
    render: function () {
        var goals    = this.data.goals,
            settings = this.data.settings;
        
        this.find('.pa-current').innerHTML = goals.get('current');
        this.find('.pa-total').innerHTML   = settings.get('total');
        
        if (goals.get('recess') === true) {
            var phrase = phrases[rand(1, phrases.length) - 1],
                status = this.find('.pa-status');
            
            status.classList.remove('hidden');
            status.innerHTML = ' &mdash; ' + phrase;
        }
    }
});

module.exports = Goals;