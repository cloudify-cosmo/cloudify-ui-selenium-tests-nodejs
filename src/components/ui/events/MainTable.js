'use strict';

var filters = require('../common/Filters');
var mainTable = {pagination:{},timestamp:{}, logLevel:{}};

mainTable.countRows = function() {
    return element.all(by.css('.eventsTable tbody')).count().then(function(count){
        return count;
    });
};

mainTable.clickEvent = function(eventRowNum){
    element.all(by.css('.eventsTable tbody tr[data-ng-click]')).get(eventRowNum).click();
};

mainTable.isEventInfoOpen = function(eventRowNum){
    return $$('.eventsTable tbody tr:nth-child(2n)').get(eventRowNum).getAttribute('class').then(function(attr){
        return attr.indexOf('ng-hide') === -1;
    });
};

mainTable.pagination.goToPage = function(pageNum){
    filters.filterByText($$('ul.pagination li a'),String(pageNum)).first().click();
};

mainTable.pagination.isPageActive = function(pageNum){
    return filters.filterByText($$('ul.pagination li'),String(pageNum)).first().getAttribute('class').then(function(attr){
        return attr.indexOf('active') !== -1;
    });
};


function EventsTableColumn(columnClass){
    this.getHeader = function(){
        return element(by.css('.eventsTable p.'+columnClass));
    };

    this.getCells = function(){
        return element.all(by.css('.eventsTable p.'+columnClass));
    };

    this.getValues = function(){
        return element.all(by.css('.eventsTable p.'+columnClass)).getText();
    };

    this.sort = function(){
        return element(by.css('.eventsTable th .'+columnClass)).click();
    };
}

mainTable.timestamp = new EventsTableColumn('date');
mainTable.logLevel= new EventsTableColumn('level');


module.exports = mainTable;