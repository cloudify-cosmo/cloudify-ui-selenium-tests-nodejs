'use strict';
var components = require('../../src/components/index');
var maintenance = components.ui.maintenance;
var config = components.config.tests.sanity.maintenance_spec;

describe('maintenance mode', function() {
    beforeEach(function() {
        maintenance.route();
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
});
