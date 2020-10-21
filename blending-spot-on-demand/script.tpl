#!/bin/bash
sudo su - root
# Install AWS EFS Utilities
yum install -y amazon-efs-utils
# Mount EFS
mkdir /efs
efs_id="${efs_id}"
mount -t efs $efs_id:/ /efs
# Edit fstab so EFS automatically loads on reboot
echo $efs_id:/ /efs efs defaults,_netdev 0 0 >> /etc/fstab

#https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent-operations-install-linux.html
yum -y update
yum install -y ruby
yum install -y aws-cli
cd /home/ec2-user
wget https://aws-codedeploy-eu-west-1.s3.eu-west-1.amazonaws.com/latest/install
chmod +x ./install
./install auto


while sleep 5; do
  if [ -z $(curl -Isf http://169.254.169.254/latest/meta-data/spot/termination-time) ]; then
    /bin/false
  else
    ECS_CLUSTER=$(curl -s http://localhost:51678/v1/metadata | jq .Cluster | tr -d \")
    CONTAINER_INSTANCE=$(curl -s http://localhost:51678/v1/metadata \
      | jq .ContainerInstanceArn | tr -d \")
    aws ecs update-container-instances-state --cluster $ECS_CLUSTER \
      --container-instances $CONTAINER_INSTANCE --status DRAINING
  fi
done