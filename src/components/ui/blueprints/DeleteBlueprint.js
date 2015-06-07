'use strict';

/**
 * Click on 'Delete' button on delete blueprint dialog
 */
exports.clickConfirm = function() {
    element.all(by.css('#deleteBlueprintDialog .confirmationButtons button')).then(function(btns) {
        btns[1].click();
    });
};

/**
 * Click on 'Cancel' button on delete blueprint dialog
 */
exports.clickCancel = function() {
    element.all(by.css('#deleteBlueprintDialog .confirmationButtons button')).then(function(btns) {
        btns[0].click();
    });
};