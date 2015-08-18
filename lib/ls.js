/**
 * Shared localStorage mapper for current application
 */

var Mapper = require('./mvc/mappers/ls'),
    config = require('./version');

module.exports = new Mapper({key: config.key});