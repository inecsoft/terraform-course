#!/bin/bash
sudo  su

yum install -y lvm2

set -ex 

vgchange -ay

DEVICE_FS=`blkid -o value -s TYPE ${DEVICE} || echo ""`
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

# if [ -e ${EXT_DEVICE} ]; then
#    pvcreate -y ${EXT_DEVICE}
#    vgextend data ${EXT_DEVICE}
#    lvextend /dev/data/volume1 ${EXT_DEVICE}

#    # for the case of extending ext4 filesystem
#    resize2fs /dev/data/volume1
# fi

mkdir -p /data
echo '/dev/data/volume1 /data ext4 defaults 0 0' >> /etc/fstab
mount /data

# install docker
curl https://get.docker.com | bash

sudo docker run --detach \
  --hostname $HOSTNAME \
  --publish 443:443 --publish 80:80 --publish 22:22 \
  --name gitlab \
  --restart always \
  --volume /srv/gitlab/config:/etc/gitlab \
  --volume /srv/gitlab/logs:/var/log/gitlab \
  --volume /srv/gitlab/data:/var/opt/gitlab \
  gitlab/gitlab-ce:latest

#sudo docker restart gitlab

if [ -e /srv/gitlab/config/gitlab.rb ]; then
  cp /srv/gitlab/config/gitlab.rb /srv/gitlab/config/gitlab.rb.back
  sed -ie "s/# external_url 'https:\/\/gitlab.example.com'/external_url 'https:\/\/$HOSTNAME'/"  /srv/gitlab/config/gitlab.rb
  sed -ie "s/# letsencrypt\['enable'\] = nil/letsencrypt\['enable'\] = true/"  /srv/gitlab/config/gitlab.rb
  sed -ie "s/# registry_external_url 'https:\/\/registry.gitlab.example.com'/registry_external_url 'https:\/\/registry.$HOSTNAME'/" /srv/gitlab/config/gitlab.rb
fi

if [ -e /srv/gitlab/config/gitlab.rb ]; then
  if [ -z $SMTP_ADDRESS ]; then
    sed -ie "s/# gitlab_rails\['smtp_enable'\] = true/gitlab_rails\['smtp_enable'\] = true/" /srv/gitlab/config/gitlab.rb 
    sed -ie "s/# gitlab_rails\['smtp_address'\] = 'localhost'/gitlab_rails\['smtp_address'\] = 'localhost'/" /srv/gitlab/config/gitlab.rb
    sed -ie "s/# gitlab_rails\['smtp_port'\] = 25/gitlab_rails\['smtp_port'\] = 25/" /srv/gitlab/config/gitlab.rb
    sed -ie "s/# gitlab_rails\['smtp_domain'\] = 'localhost'/gitlab_rails\['smtp_domain'\] = 'localhost'/" /srv/gitlab/config/gitlab.rb
    sed -ie "s/# gitlab_rails\['smtp_tls'\] = false/gitlab_rails\['smtp_tls'\] = false/" /srv/gitlab/config/gitlab.rb
    sed -ie "s/# gitlab_rails\['smtp_openssl_verify_mode'\] = 'none'/gitlab_rails\['smtp_openssl_verify_mode'\] = 'none'/" /srv/gitlab/config/gitlab.rb
    sed -ie "s/# gitlab_rails\['smtp_enable_starttls_auto'\] = false/gitlab_rails\['smtp_enable_starttls_auto'\] = false/" /srv/gitlab/config/gitlab.rb
    sed -ie "s/# gitlab_rails\['smtp_ssl'\] = false/gitlab_rails\['smtp_ssl'\] = false/" /srv/gitlab/config/gitlab.rb
    sed -ie "s/# gitlab_rails\['smtp_force_ssl'\] = false/gitlab_rails\['smtp_force_ssl'\] = false/" /srv/gitlab/config/gitlab.rb
  else: 
    sed -ie "s/# gitlab_rails\['smtp_enable'\] = true/gitlab_rails\['smtp_enable'\] = true/" /srv/gitlab/config/gitlab.rb
    sed -ie "s/# gitlab_rails\['smtp_address'\] = "email-smtp.region-1.amazonaws.com"/gitlab_rails\['smtp_address'\] = "$SMTP_ADDRESS"/" /srv/gitlab/config/gitlab.rb
    sed -ie "s/# gitlab_rails\['smtp_port'\] = 587/gitlab_rails\['smtp_port'\] = 587/" /srv/gitlab/config/gitlab.rb
    sed -ie "s/# gitlab_rails\['smtp_user_name'\] = "IAMmailerKey"/gitlab_rails\['smtp_user_name'\] = "$SMTP_USER_NAME"/" /srv/gitlab/config/gitlab.rb
    sed -ie "s/# gitlab_rails\['smtp_password'\] = "IAMmailerSecret"/gitlab_rails\['smtp_password'\] = "$SMTP_PASSWORD"/" /srv/gitlab/config/gitlab.rb
    sed -ie "s/# gitlab_rails\['smtp_domain'\] = "yourdomain.com"/gitlab_rails\['smtp_domain'\] = "$SMTP_DOMAIN"/ " /srv/gitlab/config/gitlab.rb
    sed -ie "s/# gitlab_rails\['smtp_authentication'\] = "login"/gitlab_rails\['smtp_authentication'\] = "login"/" /srv/gitlab/config/gitlab.rb
    sed -ie "s/# gitlab_rails\['smtp_enable_starttls_auto'\] = true/gitlab_rails\['smtp_enable_starttls_auto'\] = true/" /srv/gitlab/config/gitlab.rb
  fi
fi

#sudo docker restart gitlab
#troubleshoot 
#sudo docker logs -f gitlab

#gitlab backup
#sudo docker exec -t gitlab-rake gitlab:backup:create
#backup store
# cd /srv/gitlab/data/backups