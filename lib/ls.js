/**
 * Shared localStorage mapper for current application
 */

var Mapper = require('./mvc/mappers/ls');

module.exports = new Mapper({
    key: 'pomidorka'
});