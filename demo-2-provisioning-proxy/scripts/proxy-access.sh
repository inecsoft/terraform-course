#!/bin/bash
profile=$1
profile=log-dev-beenetwork

echo "Connecting to ES cluster with $profile profile"

ec2=$(aws ec2 describe-instances --query 'Reservations[*].Instances[*].InstanceId'  --filters "Name=tag-value,Values=*bastion_proxy" --output text --profile $profile)

aws ssm start-session --target $ec2 --document-name AWS-StartPortForwardingSession --parameters '{"portNumber":["443"], "localPortNumber":["9200"]}' --profile $profile

#nc -zv 127.0.0.1 9200
#ref https://medium.com/life-at-apollo-division/cdk-secure-access-aws-vpc-based-elasticsearch-cluster-locally-without-ssh-keys-48d161477912
#ssh -i "bastion_proxy" ec2-user@ec2-54-75-75-61.eu-west-1.compute.amazonaws.com

# set profile=%1

# echo "Connecting to ES cluster with %profile% profile"

# for /f %%i in ('aws ec2 describe-instances --query "Reservations[*].Instances[*].InstanceId" --filters "Name=tag-value,Values=*bastion_proxy" --output text --profile %profile%') do set ec2=%%i

# echo "InstanceId %ec2%"

# aws ssm start-session --target %ec2% --document-name AWS-StartPortForwardingSession --parameters "{\"portNumber\":[\"443\"], \"localPortNumber\":[\"9200\"]}" --profile %profile%