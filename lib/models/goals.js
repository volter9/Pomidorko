var Model  = require('../mvc/model'),
    Mapper = require('../ls'),
    math   = require('../helpers/math');

var Goals = Model.extend({
    filter: function (data) {
        data.current = math.clamp(data.current, 0, data.total);
    }
});

module.exports = {
    /**
     * Get the settings
     * 
     * @param {Settings} settings
     * @return {Model}
     */
    get: function (settings) {
        var goals = new Goals;
        
        Mapper.fetch('goals', goals);
        
        if (goals.isNew()) {
            goals = this.bootstrap(Mapper, settings);
            
            goals.filter(goals.data);
            goals.emit('change');
        }
        
        return goals;
    },
    
    /**
     * Bootstrap the 
     * 
     * @param {Mapper} mapper
     * @param {Settings} settings
     * @return {Model}
     */    
    bootstrap: function (mapper, settings) {
        var blank = this.blank(settings);
        
        mapper.insert(blank);
        
        return blank;
    },
    
    /**
     * Create a blank default model
     * 
     * @param {Settings} settings
     * @return {Model}
     */
    blank: function (settings) {
        return new Goals({
            id: 'goals',
            
            current: 1,
            total: settings.get('total')
        });
    }
};