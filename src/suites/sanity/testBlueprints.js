'use strict';

var assert = require('assert');
var components = require('../../components');
var logger = browser.getLogger('testBlueprints');

describe('Blueprints', function () {

    it('should upload blueprint', function(done){
        // load blueprint page
        components.ui.page.loadBlueprints();
        // create new instance of upload blueprint
        components.ui.blueprints.newUploadInstance().then(function(upload){
            // set options for this instance
            upload.setOptions(components.config.blueprint).then(function () {
                // open new upload dialog
                upload.openDialog().then(function(){
                    // set file location
                    upload.setFile().then(function () {
                        // set blueprint name
                        upload.setName().then(function () {
                            // start upload the blueprint
                            upload.save().then(function () {
                                // check if the blueprint uploaded successfully
                                upload.isUploadSuccessful().then(function (err) {
                                    if (err) { logger.error(err); }
                                    assert.equal(err, null, err);
                                    done();
                                }).catch(function (e) {
                                    done(e);
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    it('should have topology with 2 hosts', function(done){
        // load blueprint page
        components.ui.page.loadBlueprints();

        // create new instance of blueprint page
        components.ui.blueprints.page().then(function(page){
            // select the first blueprint
            page.selectByPosition(1).then(function(blueprintRow){
                // click on the blueprint to get into the blueprint page
                blueprintRow.click().then(function(){
                    // indicate for loading the blueprint page
                    page.getHeader().then(function(){
                        // get list of topology hosts
                        page.getTopologyHosts().then(function(hosts){
                            assert.equal(hosts.length, 2);
                            done();
                        }).catch(function (e) {
                            done(e);
                        });
                    });
                });
            });
        });
    });

    it('should have network topology with 2 networks', function(done){
        // load blueprint page
        components.ui.page.loadBlueprints();

        // create new instance of blueprint page
        components.ui.blueprints.page().then(function(page){
            // select the first blueprint
            page.selectByPosition(1).then(function(blueprintRow){
                // click on the blueprint to get into the blueprint page
                blueprintRow.click().then(function(){
                    // indicate for loading the blueprint page
                    page.getHeader().then(function(){
                        // switch to Network screen
                        page.switchTab('Network').then(function(){
                            // get list of networks
                            page.getNetworks().then(function(networks){
                                assert.equal(networks.length, 2);
                                done();
                            }).catch(function (e) {
                                done(e);
                            });
                        });
                    });
                });
            });
        });
    });

    it('should have total of 8 nodes', function(done){
        // load blueprint page
        components.ui.page.loadBlueprints();

        // create new instance of blueprint page
        components.ui.blueprints.page().then(function(page){
            // select the first blueprint
            page.selectByPosition(1).then(function(blueprintRow){
                // click on the blueprint to get into the blueprint page
                blueprintRow.click().then(function(){
                    // indicate for loading the blueprint page
                    page.getHeader().then(function(){
                        // switch to Nodes screen
                        page.switchTab('Nodes').then(function(){
                            // get list of nodes
                            page.getNodes().then(function(nodes){
                                assert.equal(nodes.length, 8);
                                done();
                            }).catch(function (e) {
                                done(e);
                            });
                        });
                    });
                });
            });
        });
    });

    it('should have 45 folders and files on the source tree', function(done){
        // load blueprint page
        components.ui.page.loadBlueprints();

        // create new instance of blueprint page
        components.ui.blueprints.page().then(function(page){
            // select the first blueprint
            page.selectByPosition(1).then(function(blueprintRow){
                // click on the blueprint to get into the blueprint page
                blueprintRow.click().then(function(){
                    // indicate for loading the blueprint page
                    page.getHeader().then(function(){
                        // switch to Source screen
                        page.switchTab('Source').then(function(){
                            // get list of folders and files on the tree
                            page.getSourceTree().then(function(tree){
                                assert.equal(tree.length, 45);
                                done();
                            }).catch(function (e) {
                                done(e);
                            });
                        });
                    });
                });
            });
        });
    });

    it('should create new deployment', function(done){
        // load blueprint page
        components.ui.page.loadBlueprints();
        // create new instance of create deployment
        components.ui.blueprints.clickCreateDeployment().then(function(createDeployment){
            // set options for this instance
            createDeployment.setOptions(components.config.deployment).then(function(){
                // open new create deployment dialog
                createDeployment.openDialog().then(function(){
                    // set deployment name
                    createDeployment.setName().then(function(){
                        // set deployment params
                        createDeployment.setParams().then(function(){
                            // deploy new deployment
                            createDeployment.deploy().then(function(err){
                                if(err){ logger.error(err); }
                                assert.equal(err, null, err);
                                done();
                            }).catch(function(e) {
                                done(e);
                            });
                        });
                    });
                });
            });
        });
    });

});
