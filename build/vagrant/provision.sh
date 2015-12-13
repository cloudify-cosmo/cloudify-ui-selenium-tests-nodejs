echo "Provision TAG is "$TAG
echo "Provision TYPE is "$TYPE

set -e
set -v
set -x



export NO_COLOR="--no-color"

cd /vagrant
# sudo apt-get update -y
./install_prereq.sh

## bootstrap
source /etc/ENVIRONMENT_VARIABLES.sh || echo "no environment variables file.. skipping.. "
sudo npm -g install cloudify-cosmo/cloudify-installer#master --ignore-scripts

# preparation for overriding this value
if [ "$INSTALL_SYSTEM_TESTS_REQ" = "" ]; then
    export INSTALL_SYSTEM_TESTS_REQ="true"
fi

cloudify-installer run_script -s 3.3.0/vagrant_install_simple/script.sh

./run_test.sh
