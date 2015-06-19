'use strict';

var logger = require('log4js').getLogger('example_spec');
var components = require('../src/components');

describe('Events page:', function () {

    beforeEach(function (done) {
        components.ui.events.IndexPage.beforeEach(done);
    });

    it('should navigate to logs & events', function (done) {
        expect(components.ui.events.IndexPage.getNumOfEvents()).not.toBe(0);

        browser.sleep(1000).then(function () { done(); });
    });

    it('should list events for blueprint', function(done) {
        components.ui.events.IndexPage.uncheckAllBlueprints();
        components.ui.events.IndexPage.selectBlueprint('nodecellar1');
        components.ui.events.IndexPage.selectTimeframe('5 Days');
        components.ui.events.IndexPage.show();

        browser.sleep(5000).then(function(){ done(); });
    });

    it('should list events for blueprint and deployment', function(done) {
        components.ui.events.IndexPage.uncheckAllBlueprints();
        components.ui.events.IndexPage.selectBlueprint('nodecellar1');
        components.ui.events.IndexPage.uncheckAllDeployments();
        components.ui.events.IndexPage.selectDeployment('deployment1');
        components.ui.events.IndexPage.selectTimeframe('5 Days');
        components.ui.events.IndexPage.show();

        browser.sleep(5000).then(function(){ done(); });
    });

});