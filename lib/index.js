/**
 * Pomidorko - 
 * 
 * @author volter9
 */

module.exports = {
    /** Namespaces/functions */
    components: require('./components'),
    bootstrap:  require('./bootstrap'),
    config:     require('./config'),
    lang:       require('./helpers/language'),
    dom:        require('./helpers/dom'),
    
    /** Separate classes */
    Timer: require('./timer')
};