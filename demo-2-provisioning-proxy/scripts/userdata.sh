#!/bin/bash -xe
sudo su
yum update -y
yum install -y haproxy
yum install -y polkit

export endpoint="${endpoint}"
export region="${region}"
export stackName="${stackName}"
export logicalId="${logicalId}"

# sleep until instance is ready
until [[ -f /var/lib/cloud/instance/boot-finished ]]; do
  sleep 1
done

mv /etc/haproxy/haproxy.cfg /etc/haproxy/haproxy.cfg.back
cat <<EOF > /etc/haproxy/haproxy.cfg
global
    # for logging section
    log         127.0.0.1 local2 info
    chroot      /var/lib/haproxy
    pidfile     /var/run/haproxy.pid
      # max per-process number of connections
    maxconn     256
      # process' user and group
    user        haproxy
    group       haproxy
      # makes the process fork into background
    daemon
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


/usr/bin/aws configure set region ${region}
/opt/aws/bin/cfn-init -v --stack ${stackName} --resource ${logicalId} --configsets haproxy --region ${region}
/opt/aws/bin/cfn-signal -e $? --stack ${stackName} --resource ${logicalId} --region ${region}

mv /etc/rsyslog.conf /etc/rsyslog.conf.back

cat << EOF > /etc/rsyslog.conf
# rsyslog configuration file

# For more information see /usr/share/doc/rsyslog-*/rsyslog_conf.html
# If you experience problems, see http://www.rsyslog.com/doc/troubleshoot.html

#### MODULES ####

# The imjournal module bellow is now used as a message source instead of imuxsock.
$ModLoad imuxsock # provides support for local system logging (e.g. via logger command)
$ModLoad imjournal # provides access to the systemd journal
#$ModLoad imklog # reads kernel messages (the same are read from journald)
#$ModLoad immark  # provides --MARK-- message capability

# Provides UDP syslog reception
$ModLoad imudp
$UDPServerRun 514
$AllowedSender UDP, 127.0.0.1

# Provides TCP syslog reception
#$ModLoad imtcp
#$InputTCPServerRun 514


#### GLOBAL DIRECTIVES ####

# Where to place auxiliary files
$WorkDirectory /var/lib/rsyslog

# Use default timestamp format
$ActionFileDefaultTemplate RSYSLOG_TraditionalFileFormat

# File syncing capability is disabled by default. This feature is usually not required,
# not useful and an extreme performance hit
#$ActionFileEnableSync on

# Include all config files in /etc/rsyslog.d/
$IncludeConfig /etc/rsyslog.d/*.conf

# Turn off message reception via local log socket;
# local messages are retrieved through imjournal now.
$OmitLocalLogging on

# File to store the position in the journal
$IMJournalStateFile imjournal.state


#### RULES ####

# Log all kernel messages to the console.
# Logging much else clutters up the screen.
#kern.*                                                 /dev/console

# Log anything (except mail) of level info or higher.
# Don't log private authentication messages!
*.info;mail.none;authpriv.none;cron.none,local2.none                /var/log/messages
local2.*                                                /var/log/haproxy.log

# The authpriv file has restricted access.
authpriv.*                                              /var/log/secure

# Log all the mail messages in one place.
mail.*                                                  -/var/log/maillog


# Log cron stuff
cron.*                                                  /var/log/cron

# Everybody gets emergency messages
*.emerg                                                 :omusrmsg:*

# Save news errors of level crit and higher in a special file.
uucp,news.crit                                          /var/log/spooler

# Save boot messages also to boot.log
local7.*                                                /var/log/boot.log


# ### begin forwarding rule ###
# The statement between the begin ... end define a SINGLE forwarding
# rule. They belong together, do NOT split them. If you create multiple
# forwarding rules, duplicate the whole block!
# Remote Logging (we use TCP for reliable delivery)
#
# An on-disk queue is created for this action. If the remote host is
# down, messages are spooled to disk and sent when it is up again.
#$ActionQueueFileName fwdRule1 # unique name prefix for spool files
#$ActionQueueMaxDiskSpace 1g   # 1gb space limit (use as much as possible)
#$ActionQueueSaveOnShutdown on # save messages to disk on shutdown
#$ActionQueueType LinkedList   # run asynchronously
#$ActionResumeRetryCount -1    # infinite retries if host is down
# remote host is: name/ip:port, e.g. 192.168.0.1:514, port optional
#*.* @@remote-host:514
# ### end of the forwarding rule ###
EOF

systemctl enable haproxy
service haproxy restart 
service rsyslog restart

# Install the SSM agent.
cd /tmp
curl "https://s3.amazonaws.com/session-manager-downloads/plugin/latest/linux_64bit/session-manager-plugin.rpm" -o "session-manager-plugin.rpm"
sudo yum install -y session-manager-plugin.rpm

sudo systemctl enable amazon-ssm-agent
sudo systemctl start amazon-ssm-agent
