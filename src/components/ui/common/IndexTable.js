'use strict';

exports.getSelectedItemIndex = function(){
    var selectedIndex = -1;
    return $$('tr[ng-click]').each(function (ele, index) {
        ele.getAttribute('class').then(function(cssClass) {
            if (cssClass === 'selected') {
                selectedIndex = index;
            }
        });
    }).then(function(){
        return selectedIndex;
    });
};