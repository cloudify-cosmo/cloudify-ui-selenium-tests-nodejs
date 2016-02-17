#!/usr/bin/env bash

set -e

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

export PROTRACTOR_BASE_URL=http://localhost
echo "TEST_TYPE: ${TEST_TYPE}"
echo "CLOUDIFY_INSTALLER_TAG: ${CLOUDIFY_INSTALLER_TAG}"


pushd /vagrant
    source install_prereq.sh
popd

pushd ${GIT_DEST}
    echo "TEST_TYPE: ${TEST_TYPE}"
    if [ "${TEST_TYPE}" = "" ]; then
        echo "no test type was declared -failing the job."
        exit 11
    fi
    grunt ${TEST_TYPE}
popd




