#!/usr/bin/env bash

echo "read configuration"

source /etc/ENVIRONMENT_VARIABLES.sh || echo "no environment variables file.. skipping.. "

source /vagrant/dev/ENVIRONMENT_VARIABLES.sh || echo "no dev environment variables file.. skipping.. "

echo "define variables"
export REPORTS_BASE=`echo ~`/reports
export PROJECT_NAME="cloudify-ui-selenium-tests-nodejs"
export PROJECT_PARENT_DIR="`pwd`"
export GIT_DEST="${PROJECT_PARENT_DIR}/${PROJECT_NAME}"
export GIT_URL="https://$GITHUB_USER:$GITHUB_TOKEN@github.com/cloudify-cosmo/${PROJECT_NAME}.git"
export NO_COLOR="--no-color"


pushd /vagrant
    ./install_prereq.sh
    ./run_test.sh
popd




