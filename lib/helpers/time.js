/**
 * @param {String} string
 * @param {String} object
 * @return {String}
 */
var pad = function (string, object) {
   return object.substr(string.length) + string;
};

/**
 * @param {Number} time
 * @return {Object}
 */
module.exports = function (time) {
    var min = Math.floor(time / 60),
        sec = Math.floor(time % 60);

    sec = sec < 60 ? sec : 59;

    min = pad(min.toString(), '00'),
    sec = pad(sec.toString(), '00');
    
    return {
        min: min,
        sec: sec
    };
};