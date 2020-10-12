#!/bin/bash
#troubleshoot cloud init vim /var/log/cloud-init-output.log

sudo su - root
sudo setenforce 0
#set -xv

sudo yum update -y
sudo yum install -y python36
sudo alternatives --set python /usr/bin/python3
#for development sdk
sudo yum install -y dotnet-sdk-3.0
#for production runtime
#sudo yum install -y dotnet-runtime-3.0
dotnet --version


#variable mapping
export this_rds_cluster_endpoint="${this_rds_cluster_endpoint}"
export this_rds_cluster_reader_endpoint="${this_rds_cluster_reader_endpoint}"
export this_rds_cluster_database_name="${this_rds_cluster_database_name}"
export this_rds_cluster_master_username="${this_rds_cluster_master_username}"
export this_rds_cluster_master_password="${this_rds_cluster_master_password}"
export this_rds_cluster_port="${this_rds_cluster_port}"

sudo yum -y install \
            firewalld \
            httpd \
            mod_wsgi \
            mod_ssl \
            git \
            wget \
            curl \
            vim-enhanced \
            setroubleshoot-server


yum install -y /usr/sbin/semanage

sudo echo "alias vi='vim'" >> /etc/profile
source /etc/profile

sudo rm -rf /etc/httpd/conf.d/welcome.conf

cd /var/www/
mkdir -p app
sudo dotnet new razor -o prodasp.net
cd prodasp.net
#dotnet run &

#https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/docker/building-net-docker-images?view=aspnetcore-3.1
#from your development environment to package your
#application into a self-contained directory that can run on your server.
#git https://github.com/dotnet/dotnet-docker.git
#mkdir app
#dotnet publish -c Release
sudo dotnet publish -c release -o /var/www/app --no-restore

sudo chown -R apache:apache /var/www

#selinux
#Ref: https://www.systutorials.com/docs/linux/man/8-apache_selinux/
#getsebool -a  | grep "httpd"
#sudo semanage permissive -a httpd_t
#sudo ausearch -m AVC,USER_AVC,SELINUX_ERR -ts today

sudo chcon -t httpd_sys_rw_content_t /var/www/app -R
sudo setsebool -P httpd_can_network_connect 1
sudo setsebool -P httpd_can_network_connect_db 1
sudo setsebool -P httpd_can_network_memcache  1
sudo semanage port -a -t http_port_t -p tcp 5000

#sudo ausearch -m AVC -ts today | audit2allow -a -M proxy-allow
#semodule -i proxy-allow.pp

semanage port -l

#sudo yum remove -y dotnet-sdk-3.0
#sudo yum install -y dotnet-runtime-3.0

#git

sudo bash -c "cat  <<- 'EOT' >> /etc/httpd/conf.d/aspnetapp.conf

<VirtualHost *:80>
        ProxyPreserveHost On
        ProxyPass / http://127.0.0.1:5000/ connectiontimeout=5 timeout=10
        ProxyPassReverse / http://127.0.0.1:5000/
  <IfModule mod_ratelimit.c>
       <Location />
          SetOutputFilter RATE_LIMIT
          SetEnv rate-limit 600
       </Location>
  </IfModule>

   #Secure Apache from clickjacking
   Header append X-FRAME-OPTIONS "SAMEORIGIN"

    #MIME-type sniffing
    Header set X-Content-Type-Options "nosniff"

    ErrorLog /var/log/httpd/prodasp.net-error.log
    CustomLog /var/log/httpd/prodasp.net-access.log common
</VirtualHost>
EOT"



sudo bash -c "cat <<  'EOT' >> /etc/systemd/system/aspnet.service

 [Unit]
    Description=Suluq .NET Web API Application running on CentOS 8

    [Service]
    ExecStart=/usr/bin/dotnet /var/www/app/prodasp.net.dll
    Restart=always
    RestartSec=10                                          # Restart service after 10 seconds if dotnet service crashes
    KillSignal=SIGINT
    SyslogIdentifier=dotnet-app
    User=apache
    Group=apache
    Environment=ASPNETCORE_ENVIRONMENT=Production 

    [Install]
    WantedBy=multi-user.target

EOT"

#sudo journalctl -fu aspnet

sudo systemctl start aspnet
sudo systemctl enable aspnet
#sudo systemctl daemon-reload

sudo systemctl start httpd
sudo systemctl enable httpd

cd /tmp
wget https://s3.amazonaws.com/amazoncloudwatch-agent/redhat/amd64/latest/amazon-cloudwatch-agent.rpm
sudo rpm -U ./amazon-cloudwatch-agent.rpm

cd /opt/aws/amazon-cloudwatch-agent/bin
#run sudo ./amazon-cloudwatch-agent-config-wizard

sudo amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c default -s
sudo amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c ssm:AmazonCloudWatch-linux-frondend -s
#sudo amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c default -s
#sudo amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c file:/tmp/config.json -s

sudo systemctl status amazon-cloudwatch-agent

sudo systemctl start firewalld
sudo systemctl enable firewalld

#curl localhost:5000 enable the following
#sudo firewall-cmd --add-port=5000/tcp --permanent

sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --permanent --add-service=nfs
sudo firewall-cmd --permanent --add-service=ssh

sudo firewall-cmd --reload
sudo setenforce 1