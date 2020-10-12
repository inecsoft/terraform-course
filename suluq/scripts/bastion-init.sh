#!/bin/bash

sudo su - root
sudo yum update -y
sudo setenforce 0
sudo yum install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-8-x86_64/pgdg-redhat-repo-latest.noarch.rpm
sudo yum -qy module disable postgresql

sudo yum install -y  wget
sudo yum install -y  vim-enhanced
sudo yum install -y  python2
sudo yum install -y  python36
sudo yum install -y  git
sudo yum install -y  postgresql12
sudo yum install -y  postgresql12-server
sudo yum install -y  postgresql12-contrib
sudo yum install -y  firewalld
sudo yum install -y  httpd mod_wsgi mod_ssl

sudo echo "alias vi='vim'" >> /etc/profile
sudo source /etc/profile
sudo alternatives --set python /usr/bin/python3
sudo /usr/pgsql-12/bin/postgresql-12-setup initdb
sudo systemctl enable postgresql-12
sudo systemctl start postgresql-12

sudo systemctl start httpd
sudo systemctl enable httpd

sudo systemctl start firewalld
sudo systemctl enable firewalld

sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --permanent --add-service=nfs
sudo firewall-cmd --permanent --add-service=postgresql
sudo firewall-cmd --permanent --add-service=ssh

sudo firewall-cmd --reload



wget https://ftp.postgresql.org/pub/pgadmin/pgadmin4/v4.17/source/pgadmin4-4.17.tar.gz
tar -zxvf pgadmin4-4.17.tar.gz

sudo mkdir -p /opt/pgadmin4

sudo cp -rf  pgadmin4-4.17/* /opt/pgadmin4/
sudo chown -R apache:apache /opt/pgadmin4/


sudo pip3 install flask flask_babelex flask_login flask_mail flask_mail flask_paranoid flask_security flask_sqlalchemy simplejson flask_migrate

sudo yum install pgadmin4 2>&1 | grep -E python| awk -F' ' '{print $4}' |awk -F'python3-' '{print $2}'| xargs sudo pip3 install

sudo mkdir -p /var/lib/pgadmin4/
sudo mkdir -p /var/log/pgadmin4/
sudo chown -R apache:apache /var/lib/pgadmin4
sudo chown -R apache:apache /var/log/pgadmin4

sudo bash -c "cat << 'EOT'  >>  /opt/pgadmin4/web/config_local.py

LOG_FILE = '/var/log/pgadmin4/pgadmin4.log'
SQLITE_PATH = '/var/lib/pgadmin4/pgadmin4.db'
SESSION_DB_PATH = '/var/lib/pgadmin4/sessions'
STORAGE_DIR = '/var/lib/pgadmin4/storage'

EOT"


sudo yum install -y  https://dbeaver.io/files/dbeaver-ce-latest-stable.x86_64.rpm


#If you receive 403 error while accessing PgAdmin4 interface,
#you need to set the correct SELinux context on the following files.
sudo  chcon -t httpd_sys_rw_content_t /var/log/pgadmin4 -R
sudo  chcon -t httpd_sys_rw_content_t /var/lib/pgadmin4 -R

sudo setsebool -P httpd_can_network_connect 1

sudo rm -rf  /etc/httpd/conf.d/wellcome.conf

sudo setenforce 1




