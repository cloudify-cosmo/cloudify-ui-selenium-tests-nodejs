

SYSTEM_TESTS_FOLDER=system-tests
rm -rf $SYSTEM_TESTS_FOLDER || echo "folder does not exist"
git clone https://github.com/cloudify-cosmo/cloudify-ui-selenium-tests-nodejs.git $SYSTEM_TESTS_FOLDER
cd $SYSTEM_TESTS_FOLDER


sudo npm cache clean
npm install

export BROWSER_TYPE="phantomjs"
export PROTRACTOR_BASE_URL=http://localhost
echo "export PROTRACTOR_BASE_URL=\"$PROTRACTOR_BASE_URL\"" >> /home/${USER}/.profile
echo "export BROWSER_TYPE=\"$BROWSER_TYPE\"" >> /home/${USER}/.profile

if [ "$TEST_TYPE" = "" ];then
    TEST_TYPE="protract"
fi

if [ "$SUITE_NAME" != "" ]; then
    TEST_TYPE="$TEST_TYPE:$SUITE_NAME"
fi

echo "TEST_TYPE is $TEST_TYPE"

( grunt $TEST_TYPE  2>&1 | tee protractor.log ) || echo "something failed.. lets check if it is important"
## see if tests failed
FAILURES=`cat protractor.log | grep ", 0 failures" | wc -l`
if [  "$FAILURES" != "1" ];then
    echo "found a failed system test"
    exit 1

fi

