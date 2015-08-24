'use strict';

/**
 * @description
 * <strong> How to use this? </strong>
 *
 * <pre>
 *     <code>
 *         TabNavigation( $('.buttons-group.sections') ).goTo( 'Topology' );
 *     </code>
 * </pre>
 * @param baseSelector base selector for component
 * @param elementSelector element selector for Tab links
 * @constructor
 */

module.exports = function TabNavigation(baseSelector, elementSelector) {

    return {
        getSections : function(){
            return element.all(by.css(baseSelector + ' ' + elementSelector));
        },
        goTo : function( sectionName ){
            var sections = this.getSections().filter(function (section) {
                return section.getText().then(function (text) {
                    return text === sectionName;
                });
            });
            expect(sections.count()).toBe(1, 'section ' + sectionName + ' should exist');
            sections.click();
        }
    };
};