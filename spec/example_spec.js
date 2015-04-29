'use strict';

var logger = require('log4js').getLogger('example_spec');
var components = require('../src/components');


describe('blueprints page', function(){
    it('should list all blueprints', function(done){
        browser.manage().timeouts().pageLoadTimeout(10000);
        logger.trace('start test');
        components.ui.LoginPage.goTo().login('user1','pass1');
        components.ui.blueprints.IndexPage.goToBlueprint({'name' : 'nodecellar1'});
        components.ui.blueprints.BlueprintPage.goToSection('Network');
        components.ui.blueprints.BlueprintPage.goToSection('Nodes');
        components.ui.blueprints.BlueprintPage.goToSection('Source');
        browser.sleep(1000).then(function(){ done(); });
    });
});