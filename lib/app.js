var AppView = require('./views/app');

var App = function (node) {
    this.view = new AppView(node);
};

App.initiate = function (node) {
    App.instance = new App(node);
};

module.exports = App;