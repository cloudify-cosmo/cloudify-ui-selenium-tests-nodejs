/**
 * Created by krzysztof on 01.02.16.
 */

'use strict';

var logger = require('log4js').getLogger('CLI');
var SSH = require('simple-ssh');
var fs = require('fs');
var config = require('../../src/components/config');

process.chdir('build/vagrant-quickstart');

describe('CLI test', function () {

    var stdOptions;
    var createSSH;

    beforeAll(function (done) {

        stdOptions = {
            out: function (result) {
                logger.trace('Out: ' + result);
            }, exit: function (code, out, err) {
                logger.trace('Exit: ' + code + ' ' + out + 'err: ' + err);
            }
        };

        // no angular. so ignoreSynchro
        browser.ignoreSynchronization = true;

        createSSH = function (baseDir) {
            return new SSH(
                {
                    host: '127.0.0.1',
                    user: 'vagrant',
                    port: 2222,
                    key: fs.readFileSync('.vagrant/machines/default/virtualbox/private_key'),
                    baseDir: baseDir
                }
            );
        };

        createSSH('/home/vagrant/cloudify').exec('git clone https://github.com/cloudify-cosmo/cloudify-nodecellar-example blueprints/cloudify-nodecellar-example',
            {
                out: stdOptions.out,
                exit: function (code, out, err) {
                    stdOptions.exit(code, out, err);
                    browser.sleep(1000);

                    createSSH('/home/vagrant/cloudify/blueprints/cloudify-nodecellar-example')
                        .exec('git checkout tags/3.2.1', {
                            out: stdOptions.out,
                            exit: function (code, out, err) {
                                stdOptions.exit(code, out, err);
                                done();
                            }
                        }).start();

                }
            }).start();

    });

    it('should upload blueprint, create and install a deployment', function (done) {
        createSSH('/home/vagrant/cloudify')
            .exec('bin/cfy blueprints upload -b nodecellar -p blueprints/cloudify-nodecellar-example/singlehost-blueprint.yaml', {
                out: stdOptions.out,
                exit: function (code, out, err) {
                    stdOptions.exit(code, out, err);
                    expect(out).toMatch('Uploaded blueprint, blueprint\'s id is: nodecellar');
                }
            }).exec('bin/cfy deployments create -d ' + config.tests.quickstart.deploymentName + ' -b nodecellar --inputs blueprints/inputs/nodecellar-singlehost.yaml', {
                out: stdOptions.out,
                exit: function (code, out, err) {
                    stdOptions.exit(code, out, err);
                    expect(out).toMatch('Deployment created, deployment\'s id is: ' + config.tests.quickstart.deploymentName);
                }
            }).exec('bin/cfy executions start -w install -d ' + config.tests.quickstart.deploymentName, {
                out: stdOptions.out,
                exit: function (code, out, err) {
                    stdOptions.exit(code, out, err);
                    expect(out).toMatch('Finished executing workflow \'install\' on deployment \'' + config.tests.quickstart.deploymentName + '\'');
                    // sleep, otherwise it will exit the test without executing the expect
                    browser.sleep(0).then(done);
                }
            }).start();
    });

    it('should have nodecellar working', function (done) {
        browser.get('http://10.10.1.10:8080/');
        browser.findElement(By.tagName('h1')).then(function (b) {
            expect(b.isDisplayed()).toBe(true);
            browser.sleep(0).then(done);
        });
    });

    it('should uninstall, delete the deployment and teardown', function (done) {
        createSSH('/home/vagrant/cloudify')
            .exec('bin/cfy executions start -w uninstall -d nodecellar', {
                out: stdOptions.out,
                exit: function (code, out, err) {
                    stdOptions.exit(code, out, err);
                    expect(out).toMatch('Finished executing workflow \'uninstall\' on deployment \'' + config.tests.quickstart.deploymentName + '\'');
                }
            }).exec('bin/cfy deployments delete -d ' + config.tests.quickstart.deploymentName, {
                out: stdOptions.out,
                exit: function (code, out, err) {
                    stdOptions.exit(code, out, err);
                    expect(out).toMatch('Deleted deployment successfully');
                }
            }).exec('bin/cfy teardown -f ', {
                out: stdOptions.out,
                exit: function (code, out, err) {
                    stdOptions.exit(code, out, err);
                    expect(out).toMatch('teardown complete');
                    browser.sleep(0).then(done);
                }
            }).start();
    });
});

