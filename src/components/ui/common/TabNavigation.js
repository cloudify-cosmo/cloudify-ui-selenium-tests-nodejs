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
 * @param base base element for component
 * @constructor
 */

module.exports = function TabNavigation(base) {

    return {
        getSections : function(){
            return base.all(by.css('button'));
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