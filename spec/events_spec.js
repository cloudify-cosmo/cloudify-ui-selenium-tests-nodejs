'use strict';

var logger = require('log4js').getLogger('example_spec');
var components = require('../src/components');

describe('Events page:', function () {

    beforeEach(function (done) {
        components.ui.events.IndexPage.beforeEach(done);
    });

    it('should navigate to logs & events', function (done) {
        expect(components.ui.events.IndexPage.getNumOfEvents()).not.toBe(0);

        browser.sleep(1000).then(function () {
            done();
        });
    });

});