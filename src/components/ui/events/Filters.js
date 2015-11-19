var MultiSelectMenu = require('../common/MultiSelectMenu');
var elementsFilters = require('../../Utils/Filters');

var filters = {
    blueprints:{},
    deployments:{},
    logLevels:{},
    clearFilters:{},
    columnsOrganizer:{}
};

filters.blueprints = new MultiSelectMenu(element(by.name('blueprints')));
filters.deployments = new MultiSelectMenu(element(by.name('deployments')));
filters.logLevels = new MultiSelectMenu(element(by.name('logLevels')));

filters.clearFilters = function(){
    element(by.css('button[data-ng-click="clearFilters()"]')).click();
};

filters.columnsOrganizer.toggle = function(column){
    element(by.css('#columns-organizer')).click();
    elementsFilters.filterByText(element.all(by.css('#columns-organizer li span')), column).click();
    element(by.css('#columns-organizer')).click();
};

module.exports = filters;