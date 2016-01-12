#!/usr/bin/env bash
set -e
##########
#
#  Installs node, git, java etc..
#
##########

echo "install nvm"
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.1/install.sh | bash
source ~/.nvm/nvm.sh

# for phantomjs https://github.com/Medium/phantomjs/issues/92
# https://www.centos.org/forums/viewtopic.php?t=21181
sudo yum install -y bzip2 gcc-c++


if [ ! -f /usr/bin/git ]; then
    echo "installing git"
    sudo yum install -y git
else
    echo "git already installed"
fi

pushd ${PROJECT_PARENT_DIR}
    rm -rf ${PROJECT_NAME}
    git clone ${GIT_URL} ${GIT_DEST}
    pushd ${GIT_DEST}
        nvm install &> /dev/null
        npm -g install guy-mograbi-at-gigaspaces/cloudify-ui-build-helper
        create-and-push-git-tag
    popd
popd


if [ ! -f /usr/bin/java ]; then
    echo "installing java"
    sudo yum install -y java-1.7.0-openjdk
#    sudo apt-get install -y openjdk-7-jre-headless
else
    echo "java already installed"
fi

if [ ! -f /usr/bin/grunt ]; then
    echo "installing grunt and phantom"
    npm install -g grunt-cli phantomjs

else
    echo "grunt and phantom already installed"
fi

npm -g install cloudify-cosmo/cloudify-installer#${BUILD_BRANCH} --ignore-scripts
export INSTALL_SYSTEM_TESTS_REQ=true
export TAG="${BUILD_BRANCH}"
cloudify-installer run_script -s ${CFY_VERSION}/vagrant_install_simple/script.sh

