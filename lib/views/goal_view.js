var View = require('../view');

var Goals = function (node, data) {
    View.call(this, node, data);
};

Goals.prototype.initialize = function () {
    this.data.goals.on('change', this.render.bind(this));
};

Goals.prototype.render = function () {
    var goals = this.data.goals;
    
    this.find('.current').innerHTML = goals.get('current');
    this.find('.total').innerHTML   = goals.get('total');
};