var Model = require('../mvc/model');

var factory = require('./factory');

module.exports = factory(Model, 'goals', {
    id: 'goals',
    
    current:  0,
    recess:   false,
    // Fight till we can't fight,
    // Everybody's alright
    start:    Date.now(),
    remained: false
});