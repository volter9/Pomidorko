/**
 * Get unique integer generator
 * 
 * @param {Number} i - counter
 * @return {Function}
 */
var unique = function (i) {
    i = i || (i = 0);

    /**
     * Unique integer return
     * 
     * @return {
     */
    return function () {
        return ++i;
    };
}

module.exports = unique;