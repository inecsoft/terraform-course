#!/usr/bin/sudo bash

# sleep 5m
#sudo su -
# Helper function
yum update -y
yum upgrade -y
yum install openswan -y

export VPC_CIDR_BLOCK_CLIENT="${VPC_CIDR_BLOCK_CLIENT}"
export VPC_CIDR_BLOCK_MAIN="${VPC_CIDR_BLOCK_MAIN}"

sudo cat << EOF >> /etc/sysctl.conf
  net.ipv4.ip_forward = 1
  net.ipv4.conf.default.rp_filter = 0
  net.ipv4.conf.default.accept_source_route = 0
EOF

sysctl -p

echo "remove auth=esp from the following config"
cat << EOF > /etc/ipsec.d/tunnel1_aws.conf
conn Tunnel1
	authby=secret
	auto=start
	left=%defaultroute
	leftid=54.155.93.109
	right=34.252.31.172
	type=tunnel
	ikelifetime=8h
	keylife=1h
	phase2alg=aes128-sha1;modp1024
	ike=aes128-sha1;modp1024
	keyingtries=%forever
	keyexchange=ike
	leftsubnet=10.1.0.0/16
	rightsubnet=10.2.0.0/16
	dpddelay=10
	dpdtimeout=30
	dpdaction=restart_by_peer
EOF

cat << EOF > /etc/ipsec.d/tunnel2_aws.conf
conn Tunnel2
	authby=secret
	auto=start
	left=%defaultroute
	leftid=54.155.93.109
	right=52.31.63.4
	type=tunnel
	ikelifetime=8h
	keylife=1h
	phase2alg=aes128-sha1;modp1024
	ike=aes128-sha1;modp1024
	keyingtries=%forever
	keyexchange=ike
	leftsubnet=10.1.0.0/16
	rightsubnet=10.2.0.0/16
	dpddelay=10
	dpdtimeout=30
	dpdaction=restart_by_peer
EOF

cat << EOF > /etc/ipsec.d/aws.secrets
54.155.93.109 34.252.31.172: PSK "8hjkQNkD0dnfOrttWpKZ73eXcxqlngBO"
54.155.93.109 52.31.63.4: PSK "zFJzXQVSCxuK.231nPKSRgEaQchfx7S2"
EOF

systemctl start ipsec
systemctl restart ipsec
systemctl status ipsec

if [ $? != 0 ];
    then
	 systemctl restart ipsec
fi
exit


