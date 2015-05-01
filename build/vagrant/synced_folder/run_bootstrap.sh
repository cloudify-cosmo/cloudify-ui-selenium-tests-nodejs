sudo apt-get install python-pip python-dev -y
sudo pip install virtualenv
virtualenv myenv
source myenv/bin/activate
pip install cloudify --pre
cfy init

ssh-keygen -t rsa -f ~/.ssh/id_rsa -q -N ''
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys

cfy bootstrap -v -p blueprint.yaml -i inputs.yaml --install-plugins