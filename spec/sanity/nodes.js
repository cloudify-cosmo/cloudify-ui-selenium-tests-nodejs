'use strict';
var components = require('../../src/components/index');
var nodes = components.ui.nodes;
var config = components.config.tests.sanity.nodes_spec;

describe('nodes page', function() {
    beforeEach(function() {
        nodes.route();
    });

    describe('on load', function(){
        it('should automatically select the first blueprint',function(){
            expect(nodes.filters.blueprints.getSelectedText()).toBe(config.firstBlueprint);
        });

       it('should not show undeployed blueprints', function(){
            expect(nodes.filters.blueprints.getOptionsTexts()).toEqual(config.deployedBlueprints);
        });
    });

    describe('filtering',function(){
        it('should filter by selecting a blueprint', function(){
            //since there is only one blueprint who is chosen automatically
            nodes.filters.clearFilters();
            var currentNodesCount = nodes.mainTable.getNumOfNodes();
            nodes.filters.blueprints.select(config.firstBlueprint);
            var filteredNodesCount = nodes.mainTable.getNumOfNodes();

            expect(currentNodesCount).not.toBe(filteredNodesCount);
        });

        it('should filter by selecting a deployment', function(){
            var currentNodesCount = nodes.mainTable.getNumOfNodes();
            nodes.filters.deployments.select(config.installedDeployment);
            var filteredNodesCount = nodes.mainTable.getNumOfNodes();

            expect(currentNodesCount).not.toBe(filteredNodesCount);
        });

        it('should filter by selecting a type', function(){
            var currentNodesCount = nodes.mainTable.getNumOfNodes();
            nodes.filters.types.select(config.computeType);
            var filteredNodesCount = nodes.mainTable.getNumOfNodes();

            expect(currentNodesCount).not.toBe(filteredNodesCount);
        });

        it('should filter by free text', function(){
            var currentNodesCount = nodes.mainTable.getNumOfNodes();
            nodes.filters.freeText.type('mongo');
            var filteredNodesCount = nodes.mainTable.getNumOfNodes();

            expect(currentNodesCount).not.toBe(filteredNodesCount);
        });

        it('should clear all filters', function(){
            //nodes.filters.blueprints.select(config.firstBlueprint);
            nodes.filters.deployments.select(config.installedDeployment);
            nodes.filters.types.select(config.computeType);
            nodes.filters.freeText.type('mongo');

            nodes.filters.clearFilters();

            expect(nodes.filters.blueprints.getSelectedText()).toBe('Choose a Blueprint');
            //deployments is disabled until a blueprint is chosen
            nodes.filters.blueprints.select(config.firstBlueprint);
            expect(nodes.filters.deployments.getSelectedText()).toEqual([]);
            expect(nodes.filters.types.getSelectedText()).toEqual([]);
            expect(nodes.filters.freeText.getText()).toBe('');
        });
    });
});
