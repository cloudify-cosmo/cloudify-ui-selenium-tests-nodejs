
sudo apt-get install python-pip python-dev -y
sudo pip install virtualenv
virtualenv myenv
source myenv/bin/activate
pip install cloudify --pre
cfy init

ssh-keygen -t rsa -f ~/.ssh/id_rsa -q -N ''
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys

cfy bootstrap -v -p manager_blueprint/blueprint_aws_commercial.yaml -i inputs.yaml --install-plugins --keep-up-on-failure
cfy blueprints publish-archive -l https://github.com/cloudify-cosmo/cloudify-nodecellar-example/archive/3.2m8.tar.gz -b nodecellar1 -n singlehost-blueprint.yaml