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


var logger = browser.getLogger('blueprints_spec');
var components = require('../../src/components/index');
var url = require('url');

var creation = components.ui.common.creation;
var BLUEPRINT_NAME = 'nodecellar';
var DEPLOYMENT_NAME = BLUEPRINT_NAME;

describe('quickstart', function(){

    beforeEach(function(){ logger.info('running from ' + __filename); });

    it('step 4 - should upload nodecellar blueprint', function (done) {
        //https://github.com/cloudify-cosmo/cloudify-nodecellar-example/archive/3.4m4.zip
        var nodecellarUrl = 'https://github.com/cloudify-cosmo/cloudify-nodecellar-example/archive/3.4m4.zip';
        logger.info('loading blueprints page');
        browser.get('/');
        logger.info('uploading blueprint');
        components.ui.blueprints.IndexPage.uploadBlueprint();
        logger.info('setting details');
        components.ui.blueprints.UploadBlueprintDialog.setDetails(
            {
                blueprint_location: nodecellarUrl,
                blueprint_id: BLUEPRINT_NAME,
                blueprint_filename: 'simple-blueprint.yaml'
            }
        );
        components.ui.blueprints.UploadBlueprintDialog.submit();

        // wait for redirection to blueprint. indication blueprint was uploaded.
        browser.wait(function () { // make sure we are in deployments
            return browser.getCurrentUrl().then(function (url) {
                return url.indexOf(BLUEPRINT_NAME) >= 0;
            });
        }, 60000);
        browser.sleep(2000).then(done);

    });

    it('step 4 - should create a nodecellar deployment', function(){
        logger.info('loading blueprints page');
        browser.get('/#/blueprints');
        logger.info('creating deployment');
        creation.addDeployment(
            BLUEPRINT_NAME,
            DEPLOYMENT_NAME,
            components.config.tests.sanity.blueprints_spec.deploymentInputs,
            true
        );
    });

    it('step 5 - should run install on the application', function(done){
        logger.info('executing workflow');
        components.ui.deployments.IndexPage.executeWorkflowAndWaitUntilDone({
            deployment: {
                id: DEPLOYMENT_NAME
            },
            workflow: 'install'
        });
        browser.sleep(2000).then(done);
    });

    it('step 6 - should expose nodecellar', function(done){
        browser.ignoreSynchronization = true;
        var baseUrl = url.parse(browser.baseUrl);
        require('url').parse(browser.baseUrl);
        var nodecellarUrl = url.format({
            hostname: baseUrl.hostname,
            port: 8080,
            protocol: baseUrl.protocol
        });
        logger.info('loading url' + nodecellarUrl);
        browser.get(nodecellarUrl);
        browser.wait(function(){
            return $('body').getText().then(function( text ){
                return text.toLowerCase().indexOf('welcome to node cellar') >= 0;
            });
        },10000); // give nodecellar 10 sec to load.. we don't care
        browser.sleep(1).then(function(){
            logger.info('detected nodecellar loaded');
            browser.ignoreSynchronization = false;
        });

        browser.sleep(1000).then(done);

    });

    it('step 7 - should uninstall the deployment', function(done){
        logger.info('executing workflow and waiting for it to finish');
        components.ui.deployments.IndexPage.executeWorkflowAndWaitUntilDone({
            deployment: {
                id: DEPLOYMENT_NAME
            },
            workflow: 'uninstall'
        });
        browser.sleep(2000).then(done);
    });

    it('step 8 - should delete the deployment', function(done){
        logger.info('going to deployments');
        components.ui.deployments.IndexPage.route();
        logger.info('click delete deployment');
        browser.sleep(5000);
        components.ui.deployments.IndexPage.deleteDeployment({
            id: DEPLOYMENT_NAME
        });
        logger.info('confirm deletion');
        components.ui.deployments.DeleteDeployment.clickConfirm();
        browser.sleep(1000).then(done);
    });
});
