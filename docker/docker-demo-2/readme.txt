 
#get an example to build and image
git clone https://github.com/wardviaene/docker-demo.git

#cd docker-demo
#push the an image to the ecr repo:
docker build -t myapp-repository-url/myapp .
docker build -t 895352585421.dkr.ecr.eu-west-1.amazonaws.com/myapp:1 .

`aws ecr get-login`
#if you get and error with the -e none option, just remove the argument and run it the rest
aws ecr get-login

#problem solved
`aws ecr get-login | awk -F '-e none' '{print $1,$2}'`

#push the image to the ecr repo
docker push myapp-repository-url/myapp
docker push 895352585421.dkr.ecr.eu-west-1.amazonaws.com/myapp:1
# you need to copy the terraform state files from docker-demo-1 to
#docker-demo-2 then run terraform init terraform apply
#----------------------------------------------------------------------------------------
#working on the cluester

ssh -i mykey ec2-user@ip
ps aux | grep agent
docker ps


#to troubleshut
tail /var/log/ecs/ecs-agent.log
#
#to be able to scale change the ecs.tf max in autoscaler.
#change also desirable count in service config 
