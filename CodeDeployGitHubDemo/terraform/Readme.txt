1- go to iam and select your user 
2- go to security credential
3- upload you public key pair
4- copy the id

vim ~/.ssh/config

Host git-codecommit.*.amazonaws.com
  User APKAEIBAERJR2EXAMPLE
  IdentityFile ~/.ssh/codecommit_rsa


chmod 600 ~/.ssh/config

#test if repo works
ssh git-codecommit.us-east-2.amazonaws.com

#clone repo
git clone ssh://git-codecommit.eu-west-1.amazonaws.com/v1/repos/app-node-prod
#to push to the repo
git add .
git commit -m "first commit"
git push --set-upstream ssh://git-codecommit.eu-west-1.amazonaws.com/v1/repos/app-node-prod master

git remote add origin ssh://git-codecommit.eu-west-1.amazonaws.com/v1/repos/app-node-prod

#push repo 
git clone ssh://Your-SSH-Key-ID@git-codecommit.eu-west-1.amazonaws.com/v1/repos/app-node-pro   my-demo-repo

efs-id = fs-d89b1513
ipaddress = 52.51.140.11
url-http = https://git-codecommit.eu-west-1.amazonaws.com/v1/repos/app-node-prod
url-ssh = ssh://git-codecommit.eu-west-1.amazonaws.com/v1/repos/app-node-prod
