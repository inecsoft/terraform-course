#__Documentation__
***
1- Go to iam and select your user 
2- Go to security credential
3- Upload you public key pair
4- Copy the id

vim ~/.ssh/config

Host git-codecommit.*.amazonaws.com
  User APKAEIBAERJR2EXAMPLE
  IdentityFile ~/.ssh/codecommit_rsa


chmod 600 ~/.ssh/config

###  _Test if repo works_
ssh git-codecommit.us-east-2.amazonaws.com

### _Clone repo_
git clone ssh://git-codecommit.eu-west-1.amazonaws.com/v1/repos/app-node-prod
### _To push to the repo_

git add .
git commit -m "first commit"
git push --set-upstream ssh://git-codecommit.eu-west-1.amazonaws.com/v1/repos/app-node-prod master

git remote add origin ssh://git-codecommit.eu-west-1.amazonaws.com/v1/repos/app-node-prod

### _push repo_
git clone ssh://Your-SSH-Key-ID@git-codecommit.eu-west-1.amazonaws.com/v1/repos/app-node-pro   my-demo-repo

efs-id = fs-d89b1513
ipaddress = 52.51.140.11
url-http = https://git-codecommit.eu-west-1.amazonaws.com/v1/repos/app-node-prod
url-ssh = ssh://git-codecommit.eu-west-1.amazonaws.com/v1/repos/app-node-prod
***
