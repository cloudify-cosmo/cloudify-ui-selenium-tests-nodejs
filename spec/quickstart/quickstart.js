'use strict';
/**
 *
 *
 * A set of tests dedicated for the vagrantbox testing
 * based on the quickstart documentation found at: http://getcloudify.org/guide/3.2/quickstart.html
 *
 *
 *
 *              NOTE!!!
 *
 *              unlike other tests we have in the system tests
 *              this set of tests will rely one on the other..
 *
 *               - you cannot rerun them easily (you might need to clean manually)
 *               - you cannot assume assumptions exist after test
 *
 *
 *
 *
 */


var logger = require('log4js').getLogger('blueprints_spec');
var components = require('../../src/components/index');
var url = require('url');

var BLUEPRINT_NAME = 'nodecellar';
var DEPLOYMENT_NAME = BLUEPRINT_NAME;

describe('quickstart', function(){
    it('step 4 - should upload nodecellar blueprint', function(done){
        //https://github.com/cloudify-cosmo/cloudify-nodecellar-example/archive/3.3m7.zip
        var nodecellarUrl = 'https://github.com/cloudify-cosmo/cloudify-nodecellar-example/archive/3.3m6.zip';

        browser.get('/');
        components.ui.blueprints.IndexPage.uploadBlueprint();
        components.ui.blueprints.UploadBlueprintDialog.setDetails(
            {
                blueprint_location: nodecellarUrl,
                blueprint_id: BLUEPRINT_NAME,
                blueprint_filename: 'simple-blueprint.yaml'
            }
        );
        components.ui.blueprints.UploadBlueprintDialog.submit();

        // wait for redirection to blueprint. indication blueprint was uploaded.
        browser.wait(function(){ // make sure we are in deployments
            return browser.getCurrentUrl().then(function(url){
                return url.indexOf(BLUEPRINT_NAME) >= 0;
            });
        },60000);
        browser.sleep(2000).then(done);

    });

    it('step 4 - should create a nodecellar deployment', function(){
        browser.get('/#/blueprints');
        components.ui.blueprints.IndexPage.createDeployment({name:BLUEPRINT_NAME});
        components.ui.blueprints.CreateDeployment.setDetails(
            {
                name: DEPLOYMENT_NAME,
                raw: {
                        agent_private_key_path: '/home/vagrant/.ssh/id_rsa',
                        agent_user: 'vagrant',
                        host_ip: '10.10.1.10'
                    }
            }
        );
        components.ui.blueprints.CreateDeployment.submit();
        components.ui.deployments.DeploymentPage.waitForInitializingToStop();
    });

    it('step 5 - should run install on the application', function(done){

        components.ui.deployments.IndexPage.executeWorkflowAndWaitUntilDone({
            deployment: {
                id: DEPLOYMENT_NAME
            },
            workflow: 'install'
        });
        browser.sleep(2000).then(done);
    });

    it('step 6 - should expose nodecellar', function(){
        browser.ignoreSynchronization = true;
        var baseUrl = url.parse(browser.baseUrl);
        require('url').parse(browser.baseUrl);
        var nodecellarUrl = url.format({
            hostname: baseUrl.hostname,
            port: 8080,
            protocol: baseUrl.protocol
        });
        browser.get(nodecellarUrl);
        browser.wait(function(){
            return $('body').getText().then(function( text ){
                return text.toLowerCase().indexOf('welcome to node cellar') >= 0;
            });
        },10000); // give nodecellar 10 sec to load.. we don't care
        browser.sleep(1).then(function(){
            logger.info('detected nodecellar loaded');
        });
        browser.sleep(1000);
        browser.ignoreSynchronization = true;
    });

    it('step 7 - should uninstall the deployment', function(done){
        components.ui.deployments.IndexPage.executeWorkflowAndWaitUntilDone({
            deployment: {
                id: DEPLOYMENT_NAME
            },
            workflow: 'uninstall'
        });
        browser.sleep(2000).then(done);
    });

    it('step 8 - should delete the deployment', function(done){
        components.ui.deployments.IndexPage.route();
        components.ui.deployments.IndexPage.deleteDeployment({
            id: DEPLOYMENT_NAME
        });
        components.ui.deployments.DeleteDeployment.clickConfirm();


        browser.sleep(10000).then(done);
    });
});