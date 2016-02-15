#!/usr/bin/env bash
set -e
##########
#
#  Installs node, git, java etc..
#
##########

# for phantomjs https://github.com/Medium/phantomjs/issues/92
# https://www.centos.org/forums/viewtopic.php?t=21181
echo "install bzip2, gcc, git and more.."
sudo yum install -y bzip2 gcc-c++ git &> /dev/null

echo "install nvm"
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.1/install.sh | bash
source ~/.nvm/nvm.sh || . ~/.nvm/nvm.sh




pushd ${PROJECT_PARENT_DIR}
    rm -rf ${PROJECT_NAME}
    echo "clone project"
    git clone ${GIT_URL} ${GIT_DEST}
    pushd ${GIT_DEST}
        git checkout ${BUILD_BRANCH}
        echo "install nodejs"
        ls -ll
        nvm install &> /dev/null  || echo "unable to run nvm install"
        echo "install npm dependencies"
        npm install &> /dev/null
        echo "install build helper"
        npm -g install guy-mograbi-at-gigaspaces/cloudify-ui-build-helper
        ## need to add a flag to skip this for when we debug the environment
#        echo "create tag"
#        create-and-push-build-tag
    popd
popd


if [ ! -f /usr/bin/java ]; then
    echo "installing java"
    sudo yum install -y java-1.7.0-openjdk &> /dev/null
#    sudo apt-get install -y openjdk-7-jre-headless
else
    echo "java already installed"
fi

if [ ! -f /usr/bin/grunt ]; then
    echo "installing grunt and phantom"
    npm install -g grunt-cli phantomjs &> /dev/null

else
    echo "grunt and phantom already installed"
fi

npm -g install cloudify-cosmo/cloudify-installer#${BUILD_BRANCH} --ignore-scripts
export INSTALL_SYSTEM_TESTS_REQ=true
cloudify-installer run_script -s ${CFY_VERSION}/vagrant_install_simple/script.sh

