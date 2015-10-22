How to run with local UI for faster performance
````````````````````````````````````````````````

1. Run 'grunt build' on the cloudify-ui project.

2. Install nginx and modify it's configuration:
    a. sudo vim /etc/nginx/sites-enabled/default

    b. point root to the cloudify-ui dist folder:
       root /home/sefi/src/gigaSpaces/src/cloudify-ui/dist;

    c. modify 'location /' to be 'location /backend'

    d. inside the location block define:
       proxy_pass http://127.0.0.1:9001;
       (or use a domain name that you later define in hosts file).

3. Modify protractor.conf.js:
    baseUrl: process.env.PROTRACTOR_BASE_URL || 'http://127.0.0.1',


##Notes
###Make sure you have phantomjs installed before running grunt applitools:
```
sudo npm install -g phantomjs
```

###Make sure you have set the environment variable APPLITOOLS_KEY
```
export APPLITOOLS_KEY="YOUR_PRIVATE_APPLITOOLS_KEY"
```

# How to fill in configuration?

 our configuration is a JSON file found at components/conf

 The structure for the configuration is

  - suite <according to folder name e.g.: sanity>
    - spec (describe) the name of the describe (without the suite name) .. more if needed e.g. deployments
      - test (it) the name of the test e.g. "delete_deployment"


Do not try to reuse configuration.
Do not enter secret values! Currently configuration does not support secret values but there are ways to get them there..
lets talk about it.


# Key things to note when writing a test

 - Tests should autonomous
   This means we need the ability to run each tests by itself(!) without it being dependent on other tests running first
 - Tests should be rerunable
   You should be able to rerun tests over and over again
 - Tests can assume things on environment
   For example you can assume blueprint X exists.
   However, this also means that when the test finishes, all assumptions are still true. The state must remain the same


# How to run a specific suite (other than sanity)?

available suites can be seen in protractor.conf.js file under property 'suites'

manually - run `grunt protract:suiteName` e.g. `grunt protract:sanity`

# How to run a specific test?

use the `custom` suite combined with environment variable CFY_SPEC

```
export CFY_SPEC='**/sanity/deployments*'
grunt protract:custom
```

will only run the file 'spec/sanity/deployments.js'

NOTE: normalize script will run anyway..

# What is normalize script

Normalize means we set every test the same timeouts and window size.


# How to debug phantomjs failures?

We have added support for "recording" the test.
What we do is we take a photo every 500ms.

You can then convert it to a moving gif using imagemagick (install it if you don't have it, cool software)

`convert -delay 100 -loop 0 *.png animation.gif`