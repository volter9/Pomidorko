var Model  = require('../mvc/model'),
    Mapper = require('../ls');

module.exports = {
    /**
     * Get the settings
     * 
     * @param {Settings} settings
     * @return {Model}
     */
    get: function (settings) {
        var goals = new Model;
        
        Mapper.fetch('goals', goals);
        
        if (goals.isNew()) {
            goals = this.bootstrap(Mapper, settings);
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
        return new Model({
            id: 'goals',
            
            current: 1,
            total: settings.get('total')
        });
    }
};