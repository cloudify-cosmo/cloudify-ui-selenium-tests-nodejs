'use strict';

var components = require('../../components');
var logger = require('log4js').getLogger('testLayout');



describe('layout', function(){

    it('should have a link to spec', function( done ){

        components.ui.page.loadBlueprints();
        components.ui.layout.getSpecLink().then(function(value){
            logger.info('got spec link', value);
            // the link should be 'http://_MANAGEMENT_IP_/api/spec.html'
            expect(value).toBe('http://' + components.config.cloudifyUiIp + '/api/spec.html');

            done();
        } );

    }, components.config.timeout );
});


//.then(function(){
//    logger.info('resolved', arguments);
//});



