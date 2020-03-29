
<div align="center">
    <h1>CodePipeline Project</h1>
</div>

***

<div align="center">
    <h3>"What is Codepipeline?"</h3>
</div>

<div align="center">
    <img src="images/codepipeline-1.png" width="600" />
</div>

<div align="center">
    <h3>"Codepipeline integrations"</h3>
</div>

<div align="center">
    <img src="images/codepipeline-2.png" width="600" />
</div>

***
<div align="center">
    <h3>Diagram</h3>
</div>

<div align="center">
    <img src="images/diagram-flow.png" width="1080" />
</div>

***
We will deploy a resource codepipeline which defines the following stages:

### __Stages of codepipeline__

  The develper pushes the code to AWS codecommit.

  * _Source_ __(CodeCommit)__

  CodeCommit is where we store our code. The code contains the app and the files to do the build step. Where codecommit detects new changes on the repo it triggers codepipeline to start building.

  * _Build_  __(CodeBuild)__

  The build uses docker build and docker push command (file config "buildspec.yml"). It creates the images using Dockerfile stored in git  repo. The image built will be stored in a container Registry.
  The artifacts will be stored in an S3 bucket. An S3 cache example is commented out in case we need it.
  The task defiinition will be updated with the latest image with and script called "create-new-task-def.sh"
   
    __creates and stores artifacts files in S3 bucket:__
     - appspec.yaml
     - taskdef.json

  * _Deploy_ __(CodeDeploy)__

    The deployment will be done on ECS service using a new task by pulling the images from docker registry. the task will be assign to a loadbalancer and when the task is healthy; the app is deployed using Blue/Green deployment strategy in a target group which will be swithed in every successful deployment. Then the user can reach the url of the loadbalancer app.

    The service fargate is used to provide autoscale.
    you can set up the fargate service in a private subnet to improve security. Make sure if you use private 
    subnets you have a nat gateway enable on your vpc.

<div align="center">
    <h3>WorkFlow detailed</h3>
</div>

<div align="center">
    <img src="images/codepipeline-3.png" width="1080" />
</div>

***
<div align="center">
    <h1>Process to work with Codecommit</h1>
</div>

***

1. Go to iam and select your user 
2. Go to security credential
3. Upload you public key pair
4. Copy the id

vim ~/.ssh/config

```
Host git-codecommit.*.amazonaws.com
  User APKAEIBAERJR2EXAMPLE
  IdentityFile ~/.ssh/codecommit_rsa
```

chmod 600 ~/.ssh/config

* ###  __Test if repo works__
ssh git-codecommit.us-east-2.amazonaws.com

* ### __Clone repo__
git clone ssh://git-codecommit.eu-west-1.amazonaws.com/v1/repos/app-node-prod
* ### __To push to the repo__

git add .  
git commit -m "first commit"  
git push --set-upstream ssh://git-codecommit.eu-west-1.amazonaws.com/v1/repos/app-node-prod master  
git remote add origin ssh://git-codecommit.eu-west-1.amazonaws.com/v1/repos/app-node-prod  

* ### __push repo__
git clone ssh://Your-SSH-Key-ID@git-codecommit.eu-west-1.amazonaws.com/v1/repos/app-node-pro  
url-http = https://git-codecommit.eu-west-1.amazonaws.com/v1/repos/app-node-prod  
url-ssh = ssh://git-codecommit.eu-west-1.amazonaws.com/v1/repos/app-node-prod  

***

