




var components = require('../../components');
var logger = require('log4js').getLogger('testLayout');

components.ui.page.loadBlueprints();
var specLink = components.ui.layout.getSpecLink().then(function(value){
    logger.info('got spec link', value);
});
//.then(function(){
//    logger.info('resolved', arguments);
//});



