'use strict';

var assert = require('assert');
var components = require('../../components');
var logger = require('log4js').getLogger('testDeployments');
var async = require('async');

describe('Deployments', function () {

    it('should have topology with 2 hosts', function(done){
        // load the deployments screen
        components.ui.page.loadDeployments();

        // create new instance of deployment page
        components.ui.deployments.page().then(function(page){
            // select the first deployment
            page.selectByPosition(1).then(function(deploymentRow){
                // click on the deployment to get into the deployment page
                deploymentRow.click().then(function(){
                    // wait for initialize deployment to be complete
                    page.onInitializedComplete().then(function(complete){
                        if(complete) {
                            // get list of topology hosts
                            page.getTopologyHosts().then(function(hosts){
                                assert.equal(hosts.length, 2);
                                done();
                            }).catch(function (e) {
                                done(e);
                            });
                        }
                        else {
                            done('Initialize deployment timeout!');
                        }
                    });
                });
            });
        });
    });

    it('should have network topology with 2 networks', function(done){
        // load the deployments screen
        components.ui.page.loadDeployments();

        // create new instance of deployment page
        components.ui.deployments.page().then(function(page){
            // select the first deployment
            page.selectByPosition(1).then(function(deploymentRow){
                // click on the deployment to get into the deployment page
                deploymentRow.click().then(function(){
                    // wait for initialize deployment to be complete
                    page.onInitializedComplete().then(function(complete){
                        if(complete) {
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
                        }
                        else {
                            done('Initialize deployment timeout!');
                        }
                    });
                });
            });
        });
    });

    it('should have total of 8 nodes', function(done){
        // load the deployments screen
        components.ui.page.loadDeployments();

        // create new instance of deployment page
        components.ui.deployments.page().then(function(page){
            // select the first deployment
            page.selectByPosition(1).then(function(deploymentRow){
                // click on the deployment to get into the deployment page
                deploymentRow.click().then(function(){
                    // wait for initialize deployment to be complete
                    page.onInitializedComplete().then(function(complete){
                        if(complete) {
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
                        }
                        else {
                            done('Initialize deployment timeout!');
                        }
                    });
                });
            });
        });
    });

    it('should install deployment', function(done){
        // load the deployments screen
        components.ui.page.loadDeployments();
        // get new instance on deployment page
        components.ui.deployments.page().then(function(page){
            // select the first deployment from the list
            page.selectByPosition(1).then(function(deploymentRow){
                // click on the deployment to open the deployment page
                deploymentRow.click().then(function(){
                    // wait for initialize deployment to be complete
                    page.onInitializedComplete().then(function(complete){
                        logger.info('onInitializedComplete:', complete);
                        if(complete) {
                            // get the header of the deployment
                            page.getHeader().then(function(header){
                                // get new instance of action
                                components.ui.deployments.actions().then(function(actions){
                                    // open the actions menu and select 'install'
                                    actions.selectAction(header, 'install').then(function(){
                                        // click on play button
                                        actions.playAction(header).then(function(err){
                                            if(err) logger.error(err);
                                            else {
                                                // on the confirmation dialog choose 'Confim'
                                                actions.playConfirmation('Confirm').then(function(){
                                                    // check if the install complete successfully
                                                    page.isInstallSuccessful().then(function(err){
                                                        logger.info('isInstallSuccessful:', err);
                                                        if(err) logger.error(err);
                                                        assert.equal(err, null, err);
                                                        done();
                                                    }).catch(function(e) {
                                                        done(e);
                                                    });
                                                })
                                            }
                                        }).catch(function(e) {
                                            done(e);
                                        });
                                    });
                                });
                            });
                        }
                        else {
                            done('Initialize deployment timeout!');
                        }
                    });
                });
            });
        });
    });

    it('should have total of 2 executions', function(done){
        // load the deployments screen
        components.ui.page.loadDeployments();

        // create new instance of deployment page
        components.ui.deployments.page().then(function(page){
            // select the first deployment
            page.selectByPosition(1).then(function(deploymentRow){
                // click on the deployment to get into the deployment page
                deploymentRow.click().then(function(){
                    // wait for initialize deployment to be complete
                    page.onInitializedComplete().then(function(complete){
                        if(complete) {
                            // switch to Nodes screen
                            page.switchTab('Executions').then(function(){
                                // get list of nodes
                                page.getExecutions().then(function(nodes){
                                    assert.equal(nodes.length, 2);
                                    done();
                                }).catch(function (e) {
                                    done(e);
                                });
                            });
                        }
                        else {
                            done('Initialize deployment timeout!');
                        }
                    });
                });
            });
        });
    });

});