#!/usr/bin/env bash

set -e

echo "build started"
export BUILD_BRANCH=${GIT_REFERENCE}
export VAGRANT_BASEDIR="`pwd`/build/continuous-build" # contains provision script and synced folder
export VAGRANT_WORKDIR="${VAGRANT_BASEDIR}/aws" # contains the Vagrantfile itself
export REPORTS_BASEDIR="`pwd`"

echoerr() { echo "$@" 1>&2; }

echo "user is $USER";

echo "installing node"
nvm install 0.10.35 # keep this in older version deliberately.

# replace json file placeholders with environment variables. https://github.com/guy-mograbi-at-gigaspaces/node-replace-env-in-json-file
#curl -L https://goo.gl/j6qnth | INJECT_FILE="${CONFIG_FILE}" node
curl -L https://raw.githubusercontent.com/cloudify-cosmo/node-replace-env-in-json-file/master/inject.js | INJECT_FILE="${CONFIG_FILE}" node

## add inline editing for config.json

`which json` || npm install -g json
echo "TEST_TYPE is ${TEST_TYPE}"
json -I -f ${CONFIG_FILE} -e "this.environmentVariables.TEST_TYPE=\"${TEST_TYPE}\"" # TEST_TYPE = protract:sanity, applitools
json -I -f ${CONFIG_FILE} -e "this.environmentVariables.CLOUDIFY_INSTALLER_TAG=\"${CLOUDIFY_INSTALLER_TAG}\""
json -I -f ${CONFIG_FILE} -e "this.environmentVariables.CLOUDIFY_INSTALLER_TYPE=\"${CLOUDIFY_INSTALLER_TYPE}\"" # ssl, security, plain
json -I -f ${CONFIG_FILE} -e "this.environmentVariables.BROWSER_TYPE=\"${BROWSER_TYPE}\"" # phantomjs, firefox, chrome

if [ "${USE_UNSTABLE_UI}" = "true" ];then
    echo "using unstable ui url"
    npm install -g guy-mograbi-at-gigaspaces/cloudify-ui-build-helper
    source get-artifacts-files
    CLOUDIFY_INSTALLER_INPUT_WEBUI_SOURCE_URL="https://s3.amazonaws.com/cloudify-ui/`PROJECT_NAME=cloudify-ui get-unstable-s3-folder`/${CLOUDIFY_UI_TAR_GZ}"
    echo "using custom ui url ${CLOUDIFY_INSTALLER_INPUT_WEBUI_SOURCE_URL}"
    json -I -f ${CONFIG_FILE} -e "this.environmentVariables.CLOUDIFY_INSTALLER_INPUT_WEBUI_SOURCE_URL=\"${CLOUDIFY_INSTALLER_INPUT_WEBUI_SOURCE_URL}\"" #
fi

chmod 600  $PEM_FILE

npm install cloudify-cosmo/vagrant-automation-machines#dynamic-provision-arguments -g

function cleanup(){
    pushd ${VAGRANT_WORKDIR}
        echo "I am at `pwd` and I am destroying the machine"
        vagrant destroy -f
    popd
}
trap cleanup EXIT

pushd ${VAGRANT_BASEDIR}
    vagrant-automation-machines-setup --cloud aws --args GITHUB_USERNAME GITHUB_PASSWORD --locals S3_ACCESS_KEY S3_SECRET_KEY
    cleanup || echo "no need to teardown the machine because it was not running"
    pushd ${VAGRANT_WORKDIR}
        vagrant up --provider=aws
    popd
popd

if [ "${DEBUG_ENVIRONMENT}" = "true" ]; then
    echo "keeping environment for debugging"
    trap - EXIT
    pushd ${VAGRANT_WORKDIR}
        rm -rf .vagrant ## remove the .vagrant folder so next test won't remove the environment for debugging
    popd
fi

#pushd ${REPORTS_BASEDIR}
#    rm -rf reports
#    vagrant-automation-machines-copy reports # copy from guest machine!
#popd
