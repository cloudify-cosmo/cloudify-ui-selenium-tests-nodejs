/**
 * Created by krzysztof on 01.02.16.
 */
var logger = require('log4js').getLogger('CLI');
var SSH = require('simple-ssh');
var fs = require('fs');

process.chdir('build/vagrant-quickstart');

describe('CLI test', function () {

    var deploymentName = 'nodecellar';
    var stdOptions = {
        out: function (result) {
            console.log('Out: ' + result);
        }, exit: function (code, out, err) {
            console.log('Exit: ' + code + ' ' + out + 'err: ' + err);
        }
    };
    var ssh;

    // no angular. so ignoreSynchro
    browser.ignoreSynchronization = true;

    function createSSH(baseDir) {
        return new SSH(
            {
                host: '127.0.0.1',
                user: 'vagrant',
                port: 2222,
                key: fs.readFileSync('.vagrant/machines/default/virtualbox/private_key'),
                baseDir: baseDir
            }
        );
    }

    it('should clone nodecellar from repo', function (done) {
        ssh = createSSH('/home/vagrant/cloudify');
        ssh.exec('git clone https://github.com/cloudify-cosmo/cloudify-nodecellar-example blueprints/cloudify-nodecellar-example',
            {
                out: stdOptions.out,
                exit: function (code, out, err) {
                    stdOptions.exit(code, out, err);
                    ssh.end();
                    browser.sleep(1000);
                    done();
                }
            }).start();
    });

    it('should checkout 3.2.1', function (done) {
        ssh = createSSH('/home/vagrant/cloudify/blueprints/cloudify-nodecellar-example');
        ssh.exec('git checkout tags/3.2.1', {
            out: stdOptions.out,
            exit: function(code, out, err){
                stdOptions.exit(code, out, err);
                done();
            }
        }).start();
    });

    it('should upload blueprint, create and install a deployment', function (done) {
        ssh = createSSH('/home/vagrant/cloudify');
        ssh.exec('bin/cfy blueprints upload -b nodecellar -p blueprints/cloudify-nodecellar-example/singlehost-blueprint.yaml', {
            out: stdOptions.out,
            exit: function (code, out, err) {
                stdOptions.exit(code, out, err);
                expect(out).toMatch('Uploaded blueprint, blueprint\'s id is: nodecellar');
            }
        }).exec('bin/cfy deployments create -d ' + deploymentName + ' -b nodecellar --inputs blueprints/inputs/nodecellar-singlehost.yaml', {
            out: stdOptions.out,
            exit: function (code, out, err) {
                stdOptions.exit(code, out, err);
                expect(out).toMatch('Deployment created, deployment\'s id is: ' + deploymentName);
            }
        }).exec('bin/cfy executions start -w install -d ' + deploymentName, {
            out: stdOptions.out,
            exit: function (code, out, err) {
                stdOptions.exit(code, out, err);
                expect(out).toMatch('Finished executing workflow \'install\' on deployment \'' + deploymentName + '\'');
                browser.sleep(5000);
                done();
            }
        }).start();
    });

    it('should have nodecellar working', function (done) {
        browser.get('http://10.10.1.10:8080/');
        browser.findElement(By.tagName('h1')).then(function (b) {
            expect(b.isDisplayed()).toBe(true);
            done();
        });
    });

    it('should uninstall, delete the deployment and teardown', function (done) {
        ssh = createSSH('/home/vagrant/cloudify');
        ssh.exec('bin/cfy executions start -w uninstall -d nodecellar', {
            out: stdOptions.out,
            exit: function (code, out, err) {
                stdOptions.exit(code, out, err);
                expect(out).toMatch('Finished executing workflow \'uninstall\' on deployment \''+ deploymentName + '\'');
            }
        }).exec('bin/cfy deployments delete -d ' + deploymentName, {
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
                browser.sleep(1000).then(done);
            }
        }).start();
    });
});

