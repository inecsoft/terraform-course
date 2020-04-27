#!/bin/bash
sudo  su

yum install -y lvm2

# volume setup
vgchange -ay

DEVICE_FS=`blkid -o value -s TYPE ${DEVICE}`
if [ "`echo -n $DEVICE_FS`" == "" ] ; then 
  # wait for the device to be attached
  DEVICENAME=`echo "${DEVICE}" | awk -F '/' '{print $3}'`
  DEVICEEXISTS=''
  while [[ -z $DEVICEEXISTS ]]; do
    echo "checking $DEVICENAME"
    DEVICEEXISTS=`lsblk |grep "$DEVICENAME" |wc -l`
    if [[ $DEVICEEXISTS != "1" ]]; then
      sleep 15
    fi
  done
  pvcreate ${DEVICE}
  vgcreate data ${DEVICE}
  lvcreate --name volume1 -l 100%FREE data
  mkfs.ext4 /dev/data/volume1
fi

mkdir -p /data
echo '/dev/data/volume1 /data ext4 defaults 0 0' >> /etc/fstab
mount /data


#install what you need
yum update -y && yum upgrade -y
yum -y install nginx \
               git \
               curl \
               wget \
               firewalld \
               https://packages.microsoft.com/config/rhel/7/packages-microsoft-prod.rpm \
               dotnet-sdk-3.1 \
               nodejs \
               npm     

cat >> /etc/systemd/system/app.service <<EOF
# My new app service daemon /etc/systemd/system/app.service file
[Service]
ExecStart=/usr/bin/node /data/app/index.js
Restart=always
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=node-app
User=app
Group=app
Environment=APP_ENV=production
[Install]
WantedBy=multi-user.target
EOF

useradd -d /data/app -s /bin/false  app
cp /root/index.js /data/app/index.js
cd /data/app

npm init -y
npm install express -y

chown -R app:app /data/app
semanage fcontext -a -t system_u:object_r:httpd_sys_content_t:s0 /data/app

systemctl enable nginx 
systemctl start nginx

systemctl enable firewalld 
systemctl start firewalld

systemctl enable app 
systemctl start app

setenforce 0
firewall-cmd --add-port=5001/tcp --permanent  
firewall-cmd --add-service=ssh --permanent
firewall-cmd --add-service=http --permanent
firewall-cmd --reload
setenforce 1

nginx -t && systemctl reload nginx

