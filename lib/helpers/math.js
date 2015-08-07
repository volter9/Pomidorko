/**
 * Clamp the number between min and max
 * 
 * @param {Number} num
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
var clamp = function (num, min, max) {
    num = Math.min(max, num);
    
    return Math.max(min, num);
};

module.exports = {
    clamp: clamp
};