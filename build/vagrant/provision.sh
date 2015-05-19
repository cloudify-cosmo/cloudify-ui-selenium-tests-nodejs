cd /vagrant
sudo apt-get update -y
./install_prereq.sh

## bootstrap

sudo npm -g install cloudify-cosmo/cloudify-installer --ignore-scripts
export INSTALL_SYSTEM_TESTS_REQ=true

cloudify-installer run_script -s 3.2.0/vagrant_install_simple/script.sh

./run_test.sh
