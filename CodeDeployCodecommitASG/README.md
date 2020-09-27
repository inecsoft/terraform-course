***
# __CodeDeploy project__
***

1- Install git
2- Upload ssh key pair and get the iam ssh key id
3- Edit local ssh configuration
```
Host git-codecommit.*.amazonaws.com
User Your-IAM-SSH-Key-ID-Here
IdentityFile ~/.ssh/Your-Private-Key-File-Name-Here
```
4- git clone ssh://git-codecommit.eu-west-1.amazonaws.com/v1/repos/default-codedeployasg-repo

```
git remote add origin ssh://git-codecommit.eu-west-1.amazonaws.com/v1/repos/default-codedeployasg-repo
```
```
git add .
```
git commit -am "first commit"
```
```
git push -u origin master
```

***
*_REF:_* https://docs.aws.amazon.com/codepipeline/latest/userguide/tutorials-simple-codecommit.html
***