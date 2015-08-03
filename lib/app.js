var AppView = require('./views/app');

var App = function () {
    this.view = new
};

App.initiate = function () {
    App.instance = new App;
};

module.exports = App;