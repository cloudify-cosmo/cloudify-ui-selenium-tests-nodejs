'use strict';

exports.getNodesGroups = function(){
    return $$('.gs-table tr td:nth-last-child(2)').map(function(element){
        return element.getText();
    });
};