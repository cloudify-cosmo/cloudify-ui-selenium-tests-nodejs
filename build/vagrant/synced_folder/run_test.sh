

SYSTEM_TESTS_FOLDER=system-tests
rm -rf $SYSTEM_TESTS_FOLDER || echo "folder does not exist"
git clone https://github.com/cloudify-cosmo/cloudify-ui-selenium-tests-nodejs.git $SYSTEM_TESTS_FOLDER
cd $SYSTEM_TESTS_FOLDER


sudo npm cache clean
npm install

export PROTRACTOR_BASE_URL=http://localhost
echo "export PROTRACTOR_BASE_URL=http://localhost" >> /home/ubuntu/.profile

if [ "$TEST_TYPE" = "" ];then
    TEST_TYPE="test"
fi
echo "TEST_TYPE is $TEST_TYPE"

grunt $TEST_TYPE

