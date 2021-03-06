'use strict';

// we test on 1920 x 1080 by default

var Eyes = require('eyes.protractor').Eyes;
var _ = require('lodash');
var eyes = new Eyes();
eyes.setApiKey(process.env.APPLITOOLS_KEY);
var logger = require('log4js').getLogger('example_spec');

describe('cloudify-ui', function(){

    var categories = {
        misc: {
            'Logs Page': '/#/logs',
            'Login Page' : '/#/login',
            'Nodes Page': '/#/hosts',
            'Interface Page': '/#/interface'
        },
        blueprints: {
            'Blueprints Page': '/#/blueprints',
            'Missing Blueprint': '/#/blueprint/6ada83ac689c31fc0d5ed4f1fa8b22a7/topology',
            'Blueprint Topology': '/#/blueprint/nodecellar1/topology',
            'Blueprint Nodes': '/#/blueprint/nodecellar1/nodes',
            'Blueprint Source': '/#/blueprint/nodecellar1/source'
        },
        deployments: {
            'Deployments Page': '/#/deployments',
            'Missing Deployment': '/#/deployment/6ada83ac689c31fc0d5ed4f1fa8b22a7/topology',
            'Deployment Topology': '/#/deployment/installed_deployment/topology',
            'Deployment Nodes': '/#/deployment/installed_deployment/nodes',
            'Deployment Executions': '/#/deployment/installed_deployment/executions',
            'Deployment Inputs Outputs': '/#/deployment/installed_deployment/inputs-outputs',
            'Deployment Source': '/#/deployment/installed_deployment/source',
            'Deployment Monitoring': '/#/deployment/installed_deployment/monitoring'
        }


        };

    _.each(categories, function (tests, c) {
        it('should have ' + c, function () {
            eyes.setMatchLevel('Layout');
            eyes.open(browser, c + ' Cloudify UI', c + ' Sanity Suite', {width: 1920, height: 1080});
            _.each(tests, function (url, name) {
                browser.get(url);
                eyes.checkWindow(name);
            });

        });
    });

    afterEach(function(){
        try {
            eyes.close();
        }catch(e){
            logger.warn('could not close eyes',e);
        }
    });


});
