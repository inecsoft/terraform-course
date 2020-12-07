***
 <div align="center">
    <img src="images/sampleapp.JPG" width="700" />
</div>

***

1- Install git
2- Go to Iam user and Upload ssh key pair and get the iam ssh key id
3- Edit local ssh configuration
```
Host git-codecommit.*.amazonaws.com
User Your-IAM-SSH-Key-ID-Here
IdentityFile ~/.ssh/Your-Private-Key-File-Name-Here
```
```
4- git clone ssh://git-codecommit.eu-west-1.amazonaws.com/v1/repos/default-serverless-web-app-repo
```
```
cd default-serverless-web-app-repo
aws s3 cp s3://wildrydes-us-east-1/WebApplication/1_StaticWebHosting/website ./ --recursive
```
or 

```
npx create-react-app amplifyapp
cd amplifyapp
npm start

git add .
git commit -am "first commit"
git remote add origin ssh://git-codecommit.eu-west-1.amazonaws.com/v1/repos/default-serverless-web-app-repo
git push --set-upstream origin master

```

```
git add .
```
```
git commit -am "first commit"
```
```
git push -u origin master
```
```
ssh -v git-codecommit.eu-west-1.amazonaws.com
```
### __Install amplify__
```
npm install -g @aws-amplify/cli
```
### __Initialise project__
```
amplify init
```
### __List the env__
```
amplify env list
```
### __Add api gateway__
```
amplify add api
```
### ____
```
amplify hosting add
```
### __Lunch the app__
```
amplify publish
```
### __Deploy locally__
```
amplify serve
```
### __Delete project__
```
amplify delete --force
```

***