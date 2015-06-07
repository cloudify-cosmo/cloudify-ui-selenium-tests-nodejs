'use strict';

var logger = require('log4js').getLogger('example_spec');
var components = require('../src/components');

describe('Hosts page:', function () {

    beforeEach(function (done) {
        components.ui.hosts.IndexPage.beforeEach(done);
    });

    it('should list all hosts', function (done) {
        logger.trace('start hosts page list all hosts test');

        components.ui.hosts.IndexPage.selectBlueprint('nodecellar1');
        components.ui.hosts.IndexPage.show();
        expect(components.ui.hosts.IndexPage.getNumOfHosts()).not.toBe(0);

        browser.sleep(1000).then(function(){ done(); });

    });

    it('should list all hosts for deployment', function (done) {
        components.ui.hosts.IndexPage.selectBlueprint('nodecellar1');
        components.ui.hosts.IndexPage.selectDeployment('deployment1');
        components.ui.hosts.IndexPage.show();
        expect(components.ui.hosts.IndexPage.getNumOfHosts()).not.toBe(0);

        browser.sleep(1000).then(function(){ done(); });

    });

    it('should search for a host', function (done) {
        components.ui.hosts.IndexPage.selectBlueprint('nodecellar1');
        components.ui.hosts.IndexPage.show();
        components.ui.hosts.IndexPage.search('mongod');
        expect(components.ui.hosts.IndexPage.getNumOfHosts()).not.toBe(0);

        browser.sleep(1000).then(function(){ done(); });

    });

});