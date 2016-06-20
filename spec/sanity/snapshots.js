'use strict';

var fs = require('fs');
var components = require('../../src/components/index');
var snapshots = components.ui.snapshots;
var config = components.config.tests.sanity.snapshots_spec;

describe('snapshots page', function() {
    var testSnapshotId = 'snap-' + Date.now();
    var testSnapshotPath = browser.tempFolderPath + testSnapshotId + '.zip';
    var testSnapshotUrl = config.snapshotUrl;

    beforeAll(snapshots.route);

    it('should create snapshot', function(done) {
        var numberOfSnapshots;

        element.all(by.repeater('snapshot in displayedSnapshots')).then(function(snapshots) {
            numberOfSnapshots = snapshots.length;
        });

        components.ui.snapshots.page.clickCreateSnapshot();
        expect(components.ui.snapshots.createDialog.getForm().isPresent()).toBe(true);
        components.ui.snapshots.createDialog.setDetails(testSnapshotId);
        components.ui.snapshots.createDialog.submit();

        element.all(by.repeater('snapshot in displayedSnapshots')).then(function(snapshots) {
            expect(snapshots.length).toBe(numberOfSnapshots + 1);
        });

        browser.sleep(1000).then(done);
    });

    it('should download snapshot', function(done) {
        components.ui.snapshots.page.downloadSnapshot(testSnapshotId);

        browser.driver.wait(function() {
            return fs.existsSync(testSnapshotPath);
        }, 20000).then(function() {
            expect(fs.existsSync(testSnapshotPath)).toBe(true);
            done();
        });
    });

    it('should delete created snapshot', function(done) {
        var numberOfSnapshots;

        element.all(by.repeater('snapshot in displayedSnapshots')).then(function(snapshots) {
            numberOfSnapshots = snapshots.length;
        });

        components.ui.snapshots.page.deleteSnapshot(testSnapshotId);
        browser.sleep(3000).then(function() {
            element.all(by.repeater('snapshot in displayedSnapshots')).then(function(snapshots) {
                expect(snapshots.length).toBe(numberOfSnapshots - 1);
            });
            expect(components.ui.snapshots.page.getSnapshot(testSnapshotId, true)).toBeUndefined('delete snapshot should refresh snapshots');
            done();
        });
    });

    it('should upload snapshot by url', function(done) {
        var numberOfSnapshots;

        element.all(by.repeater('snapshot in displayedSnapshots')).then(function(snapshots) {
            numberOfSnapshots = snapshots.length;
        });

        components.ui.snapshots.page.clickUploadSnapshot();
        expect(components.ui.snapshots.uploadDialog.getForm().isPresent()).toBe(true);
        components.ui.snapshots.uploadDialog.setDetails(testSnapshotUrl, testSnapshotId);
        components.ui.snapshots.uploadDialog.submit();

        browser.sleep(10000).then(function() {
            element.all(by.repeater('snapshot in displayedSnapshots')).then(function(snapshots) {
                expect(snapshots.length).toBe(numberOfSnapshots + 1);
            });
            done();
        });
    });

    it('should delete uploaded snapshot', function(done) {
        var numberOfSnapshots;

        element.all(by.repeater('snapshot in displayedSnapshots')).then(function(snapshots) {
            numberOfSnapshots = snapshots.length;
        });

        components.ui.snapshots.page.deleteSnapshot(testSnapshotId);
        browser.sleep(3000).then(function() {
            element.all(by.repeater('snapshot in displayedSnapshots')).then(function(snapshots) {
                expect(snapshots.length).toBe(numberOfSnapshots - 1);
            });
            expect(components.ui.snapshots.page.getSnapshot(testSnapshotId, true)).toBeUndefined('delete snapshot should refresh snapshots');
            done();
        });
    });
});
