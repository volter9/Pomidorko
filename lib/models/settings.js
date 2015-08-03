var Model  = require('../mvc/model'),
    Mapper = require('../ls');

module.exports = {
    /**
     * Get the settings
     * 
     * @return {Model}
     */
    get: function () {
        var settings = new Model;
        
        Mapper.fetch('settings', settings);
        
        if (settings.isNew()) {
            settings = this.bootstrap(Mapper);
        }
        
        return settings;
    },
    
    /**
     * Bootstrap the 
     * 
     * @param {Mapper} mapper
     * @return {Model}
     */    
    bootstrap: function (mapper) {
        var blank = this.blank();
        
        mapper.insert(blank);
        
        return blank;
    },
    
    /**
     * Create a blank default model
     * 
     * @return {Model}
     */
    blank: function () {
        return new Model({
            id: 'settings',
            
            time: 25,
            shortBreak: 5,
            longBreak: 15,
            
            round: 4,
            total: 12
        });
    }
};