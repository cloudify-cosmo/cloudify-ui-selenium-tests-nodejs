'use strict';

/**
 * @description
 * <strong> How to use this? </strong>
 *
 * <pre>
 *     <code>
 *         SideMenu.goTo( 'Deployments' );
 *     </code>
 * </pre>
 * @constructor
 * @param viewName
 */

var logger = browser.getLogger('SideMenu');

exports.goTo = function(viewName) {
    logger.trace('changing view to ' + viewName);

    element.all(by.css('.navbar li a'))
        .filter(function(view) {
            return view.getText().then(function(text) {
                return text.toLowerCase() === viewName.toLowerCase();
            });
        })
        .click();
};
