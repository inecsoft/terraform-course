# __Steps to follow__

ssh-keygen -t rsa -b 4096 -f  ~/.ssh/codecommit_rsa  
cd docker/  
cp ../app/config/* .  
cp ../app/scripts/create-new-task-def.sh .  
