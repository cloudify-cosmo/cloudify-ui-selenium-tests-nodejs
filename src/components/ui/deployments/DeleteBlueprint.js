'use strict';

/**
 * Click on 'Delete' tab on delete deployment dialog
 */
exports.clickDeleteConfirm = function() {
    element.all(by.css('#deleteDeploymentDialog .confirmationButtons button')).then(function(btns) {
        btns[1].click();
    });
};