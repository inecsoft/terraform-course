#cloud-config
yum_repos:
   packages-microsoft-com-prod:
       name: packages-microsoft-com-prod
       baseurl: https://packages.microsoft.com/rhel/7/prod
       enabled: true
       gpgcheck: true
       gpgkey: https://packages.microsoft.com/keys/microsoft.asc

package_update: true
package_upgrade: true
packages:
  - nginx
  - aws-cfn-bootstrap
  - nodejs
  - npm
  - firewalld 
  - vim 
  - git
  - wget
  - curl 
  - lvm2
  - policycoreutils-python-utils
  

write_files:
  - owner: root:root
    path: /etc/nginx/nginx.conf
    content: |
     # For more information on configuration, see:user nginx;
     user nginx;
     worker_processes 1;
     error_log /var/log/nginx/error.log;
     pid /run/nginx.pid;
      
     # Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
     include /usr/share/nginx/modules/*.conf;
      
     events {
         worker_connections 1024;
     }
      
     http {
         log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                           '$status $body_bytes_sent "$http_referer" '
                           '"$http_user_agent" "$http_x_forwarded_for"';
      
         access_log  /var/log/nginx/access.log  main;
      
         sendfile            on;
         tcp_nopush          on;
         tcp_nodelay         on;
         keepalive_timeout   65;
         types_hash_max_size 2048;
      
         include             /etc/nginx/mime.types;
         default_type        application/octet-stream;
      
         # Load modular configuration files from the /etc/nginx/conf.d directory.
         # See http://nginx.org/en/docs/ngx_core_module.html#include
         # for more information.
         include /etc/nginx/conf.d/*.conf;
      
         server {
             listen       80 default_server;
             listen       [::]:80 default_server;
             server_name   build.mycmrs.com;
         
          location / {
             proxy_pass         http://localhost:8080;
             proxy_http_version 1.1;
             proxy_set_header   Upgrade $http_upgrade;
             proxy_set_header   Connection keep-alive;
             proxy_set_header   Host $host;
             proxy_cache_bypass $http_upgrade;
             proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
             proxy_set_header   X-Forwarded-Proto $scheme;
             proxy_set_header   X-Real-IP         $remote_addr;
             proxy_set_header   X-Forwarded-Port  $server_port;
             proxy_connect_timeout   150;
             proxy_send_timeout      100;
             proxy_read_timeout      100;
             proxy_buffers           4 32k;
             client_max_body_size    8m;
             client_body_buffer_size 128k;

           }
       }
     }

runcmd:
  - sudo  service nginx restart
  - sudo  service enable firewalld
  - sudo  service start firewalld
  - sudo  setenforce 0 
  - sudo  firewall-cmd --add-service=http   --permanent
  - sudo  firewall-cmd --add-service=ssh    --permanent
  - sudo  firewall-cmd --add-port=8080/tcp  --permanent
  - sudo  firewall-cmd --reload
  - sudo  setsebool -P httpd_can_network_connect on
  - sudo  setenforce 1 
  - sudo  amazon-linux-extras install epel 

preserve_hostname: false
fqdn: build.mycmrs.com
hostname: mycmrs


