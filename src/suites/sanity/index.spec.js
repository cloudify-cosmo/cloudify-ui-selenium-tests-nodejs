'use strict';


var components = require('../../components');
var logger = require('log4js').getLogger('index.spec');


beforeEach(function(done){
    logger.info('initializing');
   components.init().then(done);
}, components.config.timeout );

afterEach(function( done ){
    components.driver.quit().then(done);
}, components.config.timeout);


describe('sanity suite', function(){
    require('./testLayout');
    require('./testLayout2');


});


