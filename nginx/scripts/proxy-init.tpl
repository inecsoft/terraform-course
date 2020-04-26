#cloud-config
package_upgrade: true
packages:
  - nginx
  - nodejs
  - npm
groups:
    - node: [ node, ec2-user ]
users:
    - default
    - name: node
      gecos: app user
      homedir: /home/node
      selinux_user: node
write_files:
  - owner: www-data:www-data
    path: /etc/nginx/sites-available/default
    content: |
      server {
        listen      80 default_server;
        listen      [::]:80 default_server;
        server_name  proxy.inchoratech.com;

        proxy_redirect      off;
        proxy_set_header    X-Real-IP $remote_addr;

        location / {
          proxy_pass http://proxy.inchoratech.com:5001;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection keep-alive;
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
          proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header   X-Forwarded-Proto $scheme;
        }
      }
  - owner: node:node
    path: /home/node/myapp/index.js
    content: |
      var express = require('express')
      var app = express()
      var os = require('os');
      app.get('/', function (req, res) {
        res.send('Hello World from host ' + os.hostname() + '!')
      })
      app.listen(5001, function () {
        console.log('Hello world app listening on port 5001!')
      })
runcmd:
  - service nginx restart
  - cd "/home/node/myapp"
  - npm init
  - npm install express -y
  - nodejs index.js

preserve_hostname: false
fqdn: proxy.inchoratech.com
hostname: proxy

