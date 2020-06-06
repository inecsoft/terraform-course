sudo su
#!/bin/bash -ex
# Install Ruby
yum -y install ruby-2.0.0.648-29.amzn2 wget
# Install the AWS CodeDeploy Agent
cd /home/ec2-user/
wget https://aws-codedeploy-${AWS_Region}.s3.amazonaws.com/latest/codedeploy-agent.noarch.rpm
yum -y install codedeploy-agent.noarch.rpm
# Install the Amazon CloudWatch Logs Agent
yum install -y awslogs-1.1.4
mkdir -p /var/awslogs/etc/config
cp codedeploy_logs.conf /var/awslogs/etc/config/
sed -i 's/us-east-1/${AWS_Region}/g' /etc/awslogs/awscli.conf
# Start the service logs
systemctl start awslogsd
systemctl enable awslogsd