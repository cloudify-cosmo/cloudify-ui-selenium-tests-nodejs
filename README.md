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