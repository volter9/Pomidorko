var Model  = require('../mvc/model'),
    Mapper = require('../ls'),
    math   = require('../helpers/math');

module.exports = {
    /**
     * Get the settings
     * 
     * @return {Model}
     */
    get: function () {
        var goals = new Model;
        
        Mapper.fetch('goals', goals);
        
        if (goals.isNew()) {
            goals = this.bootstrap(Mapper);
            goals.emit('change');
        }
        
        return goals;
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
            id: 'goals',
            
            current: 1,
            recess:  false,
            // Fight till we can't fight,
            // Everybody's alright
            start:   Date.now()
        });
    }
};