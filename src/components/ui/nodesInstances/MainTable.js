'use strict';

exports.getNumOfNodes = function() {
    return element.all(by.css('.gs-table tbody')).count();
};
