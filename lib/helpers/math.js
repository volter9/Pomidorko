module.exports = {
   /**
    * Clamp the number between min and max
    * 
    * @param {Number} num
    * @param {Number} min
    * @param {Number} max
    * @return {Number}
    */
   clamp: function (num, min, max) {
       num = Math.min(max, num);
    
       return Math.max(min, num);
   },

   /**
    * Returns rounded random number between min and max
    * 
    * @param {Number} min
    * @param {Number} max
    * @return {Number}
    */
   random: function (min, max) {
       return Math.round(Math.random() * (max - min) + min);
   }
};