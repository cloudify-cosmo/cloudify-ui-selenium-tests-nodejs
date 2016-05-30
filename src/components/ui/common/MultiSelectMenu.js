'use strict';
var logger = require('log4js').getLogger('Actions');
var filters = require('./../../Utils/Filters');


function MultiSelectMenu (baseElement, isMulti){
    var base = baseElement;
    var self = this;
    isMulti = isMulti === false ? false : true;

    /**
     * @description clicks the arrow to toggle closing and opening multiSelectMenu options
     */
    function toggleMenu(){
        base.$('.msArrow').click();
    }

    /**
     * @description selects a dropdown option according to the opts specification
     * @param {string} optionName the name of the option
     */
    function selectDropdownOption( optionName ) {
        logger.trace('selecting dropdown by', optionName );
        self.toggle();
        filters.filterByText(base.all(by.css('.select-item')), optionName)
            .first().click();
        if(isMulti){
            self.toggle();
        }
    }

    /**
     * @description unchecks all dropdown options according to the opts specification
     */
    function unselectAllDropdownOptions() {
        logger.trace('unselecting all options');
        self.toggle();
        base.all(by.css('[checked=checked]')).click();
        self.toggle();
    }

    //This function opens the drop down list But does not closes it!
    //so you can perform actions such as getText while the elements are visible.
    /**
     * @description gets all dropdown options that are selected
     */
    function getSelectedOptions() {
        logger.trace('returning all selected list items');
        if(isMulti === false){
            return base.$('label t');
        } else{
            self.toggle();
            return base.all(by.css('li')).filter(function(item){
                return item.all(by.css('input[checked=checked]')).count().then(function(count){
                    return count > 0;
                });
            });
        }
    }

    /**
     * @description gets the text of all dropdown options that are selected
     */
    function getSelectedOptionsText() {
        return self.getSelected().getText().then(function(texts){
            if(isMulti !== false){
                self.toggle();
            }
            return texts;
        });
    }

    function getAllOptionsText(){
        self.toggle();
        return base.all(by.css('li>div')).getText().then(function(texts){
            self.toggle();
            return texts;
        });
    }

    function getMarked(){
        return base.$('.markNav');
    }

    function getMarkedText(){
        return self.getMarked().getText().then(function(text){
            return text;
        });
    }

    function filter(value){
        base.$('input.no-click').sendKeys(value);
    }

    this.toggle = toggleMenu;
    this.select = selectDropdownOption;
    this.unselectAll = unselectAllDropdownOptions;
    this.getSelected = getSelectedOptions;
    this.getSelectedText = getSelectedOptionsText;
    this.getOptionsTexts = getAllOptionsText;
    this.getMarked = getMarked;
    this.getMarkedText = getMarkedText;
    this.filter = filter;

}


module.exports = MultiSelectMenu;
