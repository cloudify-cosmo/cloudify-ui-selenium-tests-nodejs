/**
 * Created by krzysztof on 31.08.15.
 */
module.exports = function ActionsDropdown(base) {

    return {
        clickDefaultAction: function () {
            return base.element(by.css('#split-button')).click();
        },
        clickMenuOption: function (option) {

            // open the dropdown list
            return base.element(by.css('[dropdown-toggle]'))
                .click()
                .then(function(){
                    return base.all(by.css('li > button')).filter(function (el) {
                        return el.getText().then(function (text) {
                            return text === option;
                        });
                    });
                })
                .then(function(filtered){
                    return filtered[0].click();
                });
        }
    };
};