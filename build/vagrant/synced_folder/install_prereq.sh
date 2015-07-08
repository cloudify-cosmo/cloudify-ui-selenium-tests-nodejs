##########
#
#  Installs node, git, java etc..
#
##########


set -v
set -e
set -x

if [ ! -f /usr/bin/node ];then
    echo "installing node"
    NODEJS_VERSION=0.10.35
    NODEJS_HOME=/opt/nodejs
    sudo mkdir -p $NODEJS_HOME
    sudo chown $USER:$USER $NODEJS_HOME
    curl --fail --silent http://nodejs.org/dist/v${NODEJS_VERSION}/node-v${NODEJS_VERSION}-linux-x64.tar.gz -o /tmp/nodejs.tar.gz
    tar -xzf /tmp/nodejs.tar.gz -C ${NODEJS_HOME} --strip-components=1
    sudo ln -s /opt/nodejs/bin/node /usr/bin/node
    sudo ln -s /opt/nodejs/bin/npm /usr/bin/npm
else
    echo "node already installed"
fi

if [ ! -f /usr/bin/git ]; then
    echo "installing git"
    sudo apt-get install -y git
else
    echo "git already installed"
fi

if [ ! -f /usr/bin/java ]; then
    echo "installing java"
    sudo apt-get install -y openjdk-7-jre-headless
else
    echo "java already installed"
fi

if [ ! -f /usr/bin/grunt ]; then
    echo "installing grunt and phantom"
    sudo npm install -g grunt-cli
    # sudo npm install -g phantomjs # not using anymore since protractor team is against it

else
    echo "grunt and phantom already installed"
fi

# using chrome in headless mode since phantomjs is not fully supported
# https://github.com/angular/protractor/blob/master/docs/browser-setup.md#setting-up-phantomjs
if [ !  -f /usr/bin/google-chrome ];then
    echo "installing chrome"
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
    sudo sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
    sudo apt-get update -y
    sudo apt-get install google-chrome-stable -y
else
    echo "chrome already installed"
fi

sudo apt-get install xvfb x11-xkb-utils xfonts-100dpi xfonts-75dpi xfonts-scalable xfonts-cyrillic -y

echo "starting headless display"
Xvfb :99 &
export DISPLAY=:99