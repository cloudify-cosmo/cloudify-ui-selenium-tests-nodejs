'use strict';

var components = require('../../src/components');

var maintenance = components.ui.maintenance;
var config = components.config.tests.sanity.maintenance_spec;

describe('maintenance mode', function() {
    beforeEach(function() {
        maintenance.route();
        browser.waitForAngular();
    });

    it('should route to maintenance settings page', function(){
        expect(browser.getCurrentUrl()).toContain('/settings/maintenance');
    });

    it('should show maintenance is deactivated', function(){
        expect(maintenance.page.getStatusText()).toBe(config.page.status.deactivated);
        expect(maintenance.page.getButtonText()).toBe(config.page.button.deactivated);
    });

    it('should activate maintenance mode', function(){
        maintenance.page.openMaintenanceDialog();
        expect(maintenance.dialog.getTitleText()).toBe(config.dialog.title.deactivated);
        maintenance.dialog.confirm();

        expect(maintenance.message.getText()).toBe(config.message.activating);
        expect(maintenance.page.getStatusText()).toBe(config.page.status.activating);
        expect(maintenance.page.getButtonText()).toBe(config.page.button.activated);
    });

    it('should show maintenance is activated', function(){
        expect(maintenance.message.getText()).toBe(config.message.activated);
        expect(maintenance.page.getStatusText()).toBe(config.page.status.activated);
        expect(maintenance.page.getButtonText()).toBe(config.page.button.activated);
    });

    it('should deactivate maintenance mode', function(){
        maintenance.page.openMaintenanceDialog();
        expect(maintenance.dialog.getTitleText()).toBe(config.dialog.title.activated);
        maintenance.dialog.confirm();

        expect(maintenance.message.isPresent()).toBe(false);
        expect(maintenance.page.getStatusText()).toBe(config.page.status.deactivated);
        expect(maintenance.page.getButtonText()).toBe(config.page.button.deactivated);
    });

    describe('remaining executions', function(){
        it('should setup an installing deployment', function(){
            components.ui.deployments.IndexPage.route();

            (function installDeployment (){
                components.ui.deployments.IndexPage.executeWorkflowWithoutWaitingUntilDone({
                    deployment: {
                        id: config.executingDeployment
                    },
                    workflow: 'install'
                });
            })();
        });

        it('should load remaining executions', function(){
            maintenance.page.openMaintenanceDialog();
            maintenance.dialog.confirm();
            expect(maintenance.page.getExecutingDeploymentNames()).toEqual([config.executingDeployment]);
        });

        it('should cancel remaining executions', function(){
            maintenance.page.cancelExecution(config.executingDeployment);
            expect(maintenance.page.getExecutingStatuses()).toEqual(['Cancelling']);

            //deactivate maintenance mode
            maintenance.page.openMaintenanceDialog();
            maintenance.dialog.confirm();
        });
    });
});
