'use strict';
var components = require('../../src/components/index');
var events = components.ui.events.page;
var config = components.config.tests.sanity.events_spec;
var logger = require('log4js').getLogger('events');

describe('logs & events page', function () {

    beforeEach(function () {
        logger.info('running from ' + __filename);
    });

    //protractor fails to wait for debounce
    function waitingForDebounce() {
        return browser.sleep(500);
    }

    beforeEach(function (done) {
        events.route().then(done);
    });

    it('should route to events page', function (done) {
        expect(browser.getCurrentUrl()).toContain('/logs');
        browser.sleep(1000).then(done);
    });

    it('should sort by timestamp desc by default', function (done) {
        waitingForDebounce();
        events.mainTable.timestamp.getValues().then(function (values) {
            expect(events.mainTable.isDatesOrdered(values, true)).toBe(true);
        });
        browser.sleep(1000).then(done);
    });

    it('should filter blueprints', function (done) {
        //getting number of events on startup
        var noFiltersEventsCount = events.mainTable.countRows();
        //Choosing a blueprint with no events
        events.filters.blueprints.select(config.blueprintWithoutEvents);
        waitingForDebounce();
        expect(events.filters.blueprints.getSelectedTexts()).toEqual([config.blueprintWithoutEvents]);
        expect(events.mainTable.countRows()).toBe(0);

        //Choosing another blueprint with events
        events.filters.blueprints.select(config.blueprintWithEvents);
        waitingForDebounce();
        var blueprints = events.filters.blueprints.getSelectedTexts();
        expect(blueprints).toContain(config.blueprintWithEvents);
        expect(blueprints).toContain(config.blueprintWithoutEvents);
        expect(events.mainTable.countRows()).toBe(noFiltersEventsCount);
        browser.sleep(1000).then(done);

    });

    it('should filter deployments', function (done) {
        //Choosing a random deployments
        events.filters.deployments.select(config.firstDeployment);
        waitingForDebounce();
        expect(events.filters.deployments.getSelectedTexts()).toEqual([config.firstDeployment]);

        events.filters.deployments.select(config.secondDeployment);
        waitingForDebounce();
        expect(events.filters.deployments.getSelectedTexts()).toContain(config.secondDeployment);
        expect(events.filters.deployments.getSelectedTexts()).toContain(config.firstDeployment);

        browser.sleep(1000).then(done);
    });

    it('should filter logs levels', function (done) {
        //getting number of events on startup
        var noFiltersEventsCount = events.mainTable.countRows();
        //Choosing a level with no events
        events.filters.logLevels.select(config.logLevelWithoutEvents);
        waitingForDebounce();
        expect(events.filters.logLevels.getSelectedTexts()).toEqual([config.logLevelWithoutEvents]);
        expect(events.mainTable.countRows()).toBe(0);

        ////Choosing another level with events
        events.filters.logLevels.select(config.logLevelWithEvents);
        waitingForDebounce();
        expect(events.filters.logLevels.getSelectedTexts()).toContain(config.logLevelWithEvents);
        expect(events.filters.logLevels.getSelectedTexts()).toContain(config.logLevelWithoutEvents);
        expect(events.mainTable.countRows()).toBe(noFiltersEventsCount);

        function isAllValuesEqualTo(array, value) {
            var isIt = true;
            for (var i = 0; i < array.length; i++) {
                if (array[i] !== value) {
                    isIt = false;
                    break;
                }
            }
            return isIt;
        }

        //checking events data to be all as was filtered
        events.mainTable.logLevel.getValues().then(function (values) {
            expect(isAllValuesEqualTo(values, config.logLevelWithEvents)).toBe(true);
        });

        browser.sleep(1000).then(done);
    });

    it('should clear filters', function (done) {
        //pick random filters
        events.filters.blueprints.select(config.blueprintWithEvents);
        events.filters.deployments.select(config.firstDeployment);
        events.filters.logLevels.select(config.logLevelWithoutEvents);
        //click clear filters button
        events.filters.clearFilters();
        //check filters has no selected options
        expect(events.filters.blueprints.getSelected().count()).toBe(0);
        expect(events.filters.deployments.getSelected().count()).toBe(0);
        expect(events.filters.logLevels.getSelected().count()).toBe(0);

        browser.sleep(1000).then(done);
    });

    it('should sort timestamp', function (done) {
        waitingForDebounce();
        //sorted desc by default
        events.mainTable.timestamp.getValues().then(function (values) {
            expect(events.mainTable.isDatesOrdered(values, true)).toBe(true);
        });

        events.mainTable.timestamp.sort();
        waitingForDebounce();
        events.mainTable.timestamp.sort();
        waitingForDebounce();
        events.mainTable.timestamp.getValues().then(function (values) {
            expect(events.mainTable.isDatesOrdered(values, false)).toBe(true);
        });
        browser.sleep(1000).then(done);

    });

    it('should toggle columns removal', function (done) {
        events.filters.columnsOrganizer.toggle('Timestamp');
        events.filters.columnsOrganizer.toggle('Log Level');
        expect(events.mainTable.timestamp.getCells().count()).toBe(0);
        expect(events.mainTable.timestamp.getHeader().isPresent()).toBe(false);
        expect(events.mainTable.logLevel.getCells().count()).toBe(0);
        expect(events.mainTable.logLevel.getHeader().isPresent()).toBe(false);

        events.filters.columnsOrganizer.toggle('Timestamp');
        expect(events.mainTable.timestamp.getCells().count()).not.toBe(0);
        expect(events.mainTable.timestamp.getHeader().isPresent()).toBe(true);

        browser.sleep(1000).then(done);
    });


    it('should toggle events additional data', function (done) {
        events.mainTable.clickEvent(1);
        expect(events.mainTable.isEventInfoOpen(1)).toBe(true);
        events.mainTable.clickEvent(1);
        expect(events.mainTable.isEventInfoOpen(1)).toBe(false);

        events.mainTable.clickEvent(4);
        expect(events.mainTable.isEventInfoOpen(4)).toBe(true);
        events.mainTable.clickEvent(4);
        expect(events.mainTable.isEventInfoOpen(4)).toBe(false);

        browser.sleep(1000).then(done);
    });

    it('should change pages', function (done) {
        events.mainTable.pagination.goToPage(2);
        expect(events.mainTable.pagination.isPageActive(2)).toBe(true);
        events.mainTable.pagination.goToPage(3);
        expect(events.mainTable.pagination.isPageActive(2)).toBe(false);
        expect(events.mainTable.pagination.isPageActive(3)).toBe(true);

        browser.sleep(1000).then(done);
    });

    it('should refresh page and keep filters', function (done) {
        //pick random filters
        events.filters.blueprints.select(config.blueprintWithEvents);
        events.filters.logLevels.select(config.logLevelWithEvents);
        events.filters.deployments.select(config.firstDeployment);

        browser.refresh();

        //check filters have right options selected
        expect(events.filters.blueprints.getSelectedTexts()).toEqual([config.blueprintWithEvents]);
        expect(events.filters.deployments.getSelectedTexts()).toEqual([config.firstDeployment]);
        expect(events.filters.logLevels.getSelectedTexts()).toEqual([config.logLevelWithEvents]);

        browser.sleep(1000).then(done);
    });

    it('should refresh page and keep pagination', function (done) {
        //go to another page
        events.mainTable.pagination.goToPage(4);

        browser.refresh();

        //check we are on the right page
        expect(events.mainTable.pagination.isPageActive(4)).toBe(true);

        browser.sleep(1000).then(done);
    });

});