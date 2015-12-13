set -e
set -v
set -x

echo "$1 is "$1
echo "$2 is "$2
echo "$TAG is "$TAG
echo "$TYPE is "$TYPE

export NO_COLOR="--no-color"

cd /vagrant
# sudo apt-get update -y
./install_prereq.sh

## bootstrap
source /etc/ENVIRONMENT_VARIABLES.sh || echo "no environment variables file.. skipping.. "
sudo npm -g install cloudify-cosmo/cloudify-installer#master --ignore-scripts

if [ "$INSTALL_SYSTEM_TESTS_REQ" = "" ]; then
    export INSTALL_SYSTEM_TESTS_REQ="true"
fi
echo "TAG is "$TAG
cloudify-installer run_script -s 3.3.0/vagrant_install_simple/script.sh

./run_test.sh
