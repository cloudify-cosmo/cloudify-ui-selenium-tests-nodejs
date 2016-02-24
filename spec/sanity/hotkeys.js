'use strict';
var logger = require('log4js').getLogger('blueprints_spec');
var components = require('../../src/components/index');
var hotkeys = components.ui.hotkeys;
var config = components.config.tests.sanity.hotkeys_spec;

describe('Website hotkeys', function(){

    beforeEach(function(){ logger.info('running from ' + __filename); });

    //TODO Phantomjs doesn't seem to send thoes keys so it doesn't work while it does on chrome :/ https://cloudifysource.atlassian.net/browse/CFY-4962
    //describe('Navigation hotkeys', function(){
    //    var isPage = function(pageName){
    //        return browser.getCurrentUrl().then(function(currentUrl) {
    //            return currentUrl.indexOf('/'+pageName) !== -1;
    //        });
    //    };
    //
    //    beforeEach(function(){
    //        browser.get('/#/blueprints');
    //        browser.waitForAngular();
    //    });
    //
    //    it('should navigate to blueprints', function(){
    //        browser.get('/#/deployments');
    //        browser.waitForAngular();
    //
    //        hotkeys.Navigations.blueprints();
    //        expect(isPage('blueprints')).toBe(true);
    //    });
    //
    //    it('should navigate to deployments', function(){
    //        hotkeys.Navigations.deployments();
    //        expect(isPage('deployments')).toBe(true);
    //    });
    //
    //    it('should navigate to logs & events', function(){
    //        hotkeys.Navigations.logs();
    //        expect(isPage('logs')).toBe(true);
    //    });
    //
    //    it('should navigate to nodes', function(){
    //        hotkeys.Navigations.nodes();
    //        expect(isPage('nodes')).toBe(true);
    //    });
    //});

    describe('Upload blueprint', function(){
        describe('blueprint index', function(){
            beforeEach(function(){
                browser.get('/#/blueprints');
                browser.waitForAngular();
            });

            it('should open upload blueprint dialog', function(){
                hotkeys.UploadBlueprint();

                expect($('#uploadForm').isPresent()).toBe(true);
            });
        });


        describe('not found blueprint at blueprint page', function(){
            beforeEach(function(){
                browser.get('/#/blueprint/'+config.notExistingBlueprint+'/topology');
                browser.waitForAngular();
            });

            it('should open upload blueprint dialog', function(){
                hotkeys.UploadBlueprint();

                expect($('#uploadForm').isPresent()).toBe(true);
            });
        });
    });

    describe('Blueprint actions hotkeys', function(){
        describe('Bluprints index', function(){
            beforeEach(function(){
                browser.get('/#/blueprints');
                browser.waitForAngular();
            });

            it('should open deploy dialog', function(){
                components.ui.blueprints.IndexPage.selectBlueprint(0);
                hotkeys.BlueprintActions.deploy();

                expect($('.deploy-dialog').isPresent()).toBe(true);
            });

            it('should open delete dialog', function(){
                components.ui.blueprints.IndexPage.selectBlueprint(0);
                hotkeys.BlueprintActions.delete();

                expect($('.delete-dialog').isPresent()).toBe(true);
            });
        });

        describe('Bluprint page', function(){
            beforeEach(function(){
                browser.get('/#/blueprint/'+config.anyBlueprint+'/topology');
                browser.waitForAngular();
            });

            it('should open deploy dialog', function(){
                hotkeys.BlueprintActions.deploy();

                expect($('.deploy-dialog').isPresent()).toBe(true);
            });

            it('should open delete dialog', function(){
                hotkeys.BlueprintActions.delete();

                expect($('.delete-dialog').isPresent()).toBe(true);
            });
        });
    });

    describe('Deployment actions hotkeys', function(){
        describe('Not executing deployment', function(){
            describe('Deployments index', function(){
                beforeEach(function(){
                    browser.get('/#/deployments');
                    browser.waitForAngular();
                });

                it('should open execute dialog', function(){
                    components.ui.deployments.IndexPage.selectDeployment(0);
                    hotkeys.DeploymentActions.execute();

                    expect($('.start-execution-dialog').isPresent()).toBe(true);
                });

                it('should open delete dialog', function(){
                    components.ui.deployments.IndexPage.selectDeployment(0);
                    hotkeys.DeploymentActions.delete();

                    expect($('.delete-dialog').isPresent()).toBe(true);
                });
            });

            describe('Deployment page', function(){
                beforeEach(function(){
                    browser.get('/#/deployment/'+config.notExecutingDeployment+'/topology');
                    browser.waitForAngular();
                });

                it('should open execute dialog', function(){
                    hotkeys.DeploymentActions.execute();
                    expect($('.start-execution-dialog').isPresent()).toBe(true);
                });



                it('should open delete dialog', function(){
                    hotkeys.DeploymentActions.delete();

                    expect($('.delete-dialog').isPresent()).toBe(true);
                });
            });
        });

        describe('Executing deployment', function(){
            //TODO: Replace it with beforeAll when upgrading to jasmine 2
            it('should setup env because we can"t use beforeAll',function(){
                browser.get('/#/deployments');
                browser.waitForAngular();

                (function installDeployment (){
                    components.ui.deployments.IndexPage.executeWorkflowWithoutWaitingUntilDone({
                        deployment: {
                            id: config.executingDeployment
                        },
                        workflow: 'install'
                    });
                })();
            });

            describe('Deployments index', function(){
                beforeEach(function(){
                    browser.get('/#/deployments');
                    browser.waitForAngular();
                });

                it('should open cancel execution dialog', function(){
                    components.ui.deployments.IndexPage.selectDeployment(config.executingDeployment);
                    hotkeys.DeploymentActions.cancelExecution();

                    expect($('[ng-click="cancelWorkflow()"]').isPresent()).toBe(true);
                });
            });

            describe('Deployment page', function(){
                beforeEach(function(){
                    browser.get('/#/deployment/'+config.executingDeployment+'/topology');
                    browser.waitForAngular();
                });

                it('should open cancel execution dialog', function(){
                    hotkeys.DeploymentActions.cancelExecution();

                    expect($('[ng-click="cancelWorkflow()"]').isPresent()).toBe(true);
                });
            });
        });
    });
});