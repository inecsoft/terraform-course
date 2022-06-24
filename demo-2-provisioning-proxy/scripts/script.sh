#!/bin/bash

export endpoint="${endpoint}"
export region="${region}"
export stackName="${stackName}"
export logicalId="${logicalId}"

# sleep until instance is ready
until [[ -f /var/lib/cloud/instance/boot-finished ]]; do
  sleep 1
done

cat <<EOF > /etc/haproxy/haproxy.cfg
    global
    daemon
    maxconn 256
defaults
    mode tcp
    timeout connect 5000ms
    timeout client 5000ms
    timeout server 5000ms
listen elastic
    bind *:443
    server server1 ${endpoint} maxconn 32 check-ssl ssl verify none

EOF

chmod 0644 /etc/haproxy/haproxy.cfg
chown -R haproxy:haproxy /etc/haproxy/haproxy.cfg

#!/bin/bash -xe
yum update -y
yum install -y haproxy
yum install -y polkit
/usr/bin/aws configure set region ${region}
/opt/aws/bin/cfn-init -v --stack ${stackName} --resource ${logicalId} --configsets haproxy --region ${region}
/opt/aws/bin/cfn-signal -e $? --stack ${stackName} --resource ${logicalId} --region ${region}


systemctl enable haproxy
service haproxy restart 
service rsyslog restart

# Install the SSM agent.
cd /tmp
curl "https://s3.amazonaws.com/session-manager-downloads/plugin/latest/linux_64bit/session-manager-plugin.rpm" -o "session-manager-plugin.rpm"
sudo yum install -y session-manager-plugin.rpm

sudo systemctl enable amazon-ssm-agent
sudo systemctl start amazon-ssm-agent
