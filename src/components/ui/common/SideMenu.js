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
 * @param base base element for component
 * @constructor
 */

module.exports = function SideMenu() {

    return {
        getViews : function(){
            return element.all( by.css('#left-side-menu li a'));
        },
        goTo : function( viewName ){
            var views = this.getViews().filter(function (view) {
                return view.getText().then(function (text) {
                    return text === viewName;
                });
            });
            expect(views.count()).toBe(1,'view ' + viewName + ' should exist');
            views.click();
        }
    };
};