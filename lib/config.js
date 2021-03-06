/**
 * Pomidorka application config
 */

var version = '1.0';

module.exports = {
    version: version,
    key:     'pomidorko',
    
    /** 
     * Default data for models 
     */
    defaults: {
        settings: {
            id: 'settings',
            
            shortBreak: 5,
            longBreak: 20,
            time: 25,
            
            version: version,
            round: 4,
            total: 12,
            
            sound: true,
            tick:  false,

            notifications: false
        },
        
        goals: {
            id: 'goals',
            
            remained: false,
            current:  0,
            recess:   false,
            start:    Date.now()
        }
    }
};