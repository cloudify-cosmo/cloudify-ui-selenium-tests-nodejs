set -e
set -v
set -x

export NO_COLOR="--no-color"

cd /vagrant
# sudo apt-get update -y
./install_prereq.sh

# Note that the ui build url is contantly changing, make sure to change in accordance with your needs
export CLOUDIFY_INSTALLER_INPUT_WEBUI_SOURCE_URL="https://s3.amazonaws.com/cloudify-ui/continuous-build/nightly/cloudify-ui/3.4.0-m3-62/cloudify-ui-3.4.0-m3-b392.tgz"

## bootstrap
source /etc/ENVIRONMENT_VARIABLES.sh || source ./synced_folder/dev/ENVIRONMENT_VARIABLES.sh || echo "no environment variables file.. skipping.. "
sudo npm -g install cloudify-cosmo/cloudify-installer#master --ignore-scripts

export INSTALL_SYSTEM_TESTS_REQ="true"
cloudify-installer run_script -s 3.4.0/vagrant_install_simple/script.sh

./run_test.sh