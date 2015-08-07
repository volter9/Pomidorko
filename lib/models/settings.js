var Model  = require('../mvc/model'),
    Mapper = require('../ls'),
    math   = require('../helpers/math');

/**
 * Modified settings model
 */
var Settings = Model.extend({
    /**
     * Filter data
     */
    filter: function (data) {
        data.time       = math.clamp(data.time, 5, 55);
        data.shortBreak = math.clamp(data.shortBreak, 3, 10);
        data.longBreak  = math.clamp(data.longBreak, 5, 45);
    }
});

module.exports = {
    /**
     * Get the settings
     * 
     * @return {Model}
     */
    get: function () {
        var settings = new Settings;
        
        Mapper.fetch('settings', settings);
        
        if (settings.isNew()) {
            settings = this.bootstrap(Mapper);
            
            settings.filter(settings.data);
            settings.emit('change');
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
        return new Settings({
            id: 'settings',
            
            time: 25,
            shortBreak: 5,
            longBreak: 15,
            
            round: 4,
            total: 12
        });
    }
};