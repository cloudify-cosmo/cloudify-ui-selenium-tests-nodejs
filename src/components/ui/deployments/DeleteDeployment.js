'use strict';

/**
 * Click on 'Delete' tab on delete deployment dialog
 */
exports.clickConfirm = function() {
    $$('#deleteDialog .confirmationButtons button').get(1).click();
};

/**
 * Click on 'Cancel' button on delete deployment dialog
 */
exports.clickCancel = function() {
    $$('#deleteDialog .confirmationButtons button').first().click();
};