***
<div align="center">
  <h1>
    <strong>Jenkins Pipeline</strong>
  </h1>
</div>

***

<div align="center">
    <img src="images/jenkinspipeline.JPG" width="700" />
</div>

***

### __Tools that creates the following resources:__

  * _Amazon S3 bucket-Stores the GitHub repository files and the CodeBuild artifact application file that CodeDeploy uses._
  * _IAM S3 bucket policy-Allows the Jenkins server access to the S3 bucket._
  * _JenkinsRole-An IAM role and instance profile for the Amazon EC2 instance for use as a Jenkins server. This role allows Jenkins on the EC2 instance to access the S3 bucket to write files and access to create CodeDeploy deployments._
  * _CodeDeploy application and CodeDeploy deployment group._
  * _CodeDeploy service role-An IAM role to enable CodeDeploy to read the tags applied to the instances or the EC2 Auto Scaling group names associated with the instances._
  * _CodeDeployRole-An IAM role and instance profile for the EC2 instances of CodeDeploy. This role has permissions to write files to the S3 bucket created by this template and to create deployments in CodeDeploy._
  * _CodeBuildRole-An IAM role to be used by CodeBuild to access the S3 bucket and create the build projects._
  * _Jenkins server-An EC2 instance running Jenkins._
  * _CodeBuild project-This is configured with the S3 bucket and S3 artifact._
  * _Auto Scaling group-Contains EC2 instances running Apache and the CodeDeploy agent fronted by an Elastic Load Balancer._
  * _Auto Scaling launch configurations-For use by the Auto Scaling group._
  * _Security groups-For the Jenkins server, the load balancer, and the CodeDeploy EC2 instances._

***

### __Jenkins set up__

1. _ssh to jenkins server_

```
cat /var/lib/jenkins/initialAdminPassword
```

2. _On the Customize Jenkins page, choose Install suggested plugins._
3. _On the Create First Admin User page, enter a user name, password, full name, and email address of the Jenkins user._
4. _Choose Save and continue, Save and finish, and Start using Jenkins._
5. _Install additional plugins_
 
 * AWS CodeDeploy
 * AWS CodeBuild
 * Http Request
 * File Operations

### __Create a project and configure the CodeDeploy Jenkins plugin__

1. _Login then choose New Item, Freestyle project._
2. _Enter a name for the project (for example, CodeDeployApp), and choose OK._

<div align="center">
    <img src="images/freestyleproject.JPG" width="700" />
</div>

3. _On the project configuration page, under Source Code Management, choose Git. For Repository URL, enter the URL of your GitHub repository._

<div align="center">
    <img src="images/sourcegit.JPG" width="700" />
</div>

4. _For Build Triggers, select the Poll SCM check box. In the Schedule, for testing enter H/2 * * * *. This entry tells Jenkins to poll GitHub every two minutes for updates._

<div align="center">
    <img src="images/buildtrigger.JPG" width="700" />
</div>

5. _Under Build Environment, select the Delete workspace before build starts check box. Each Jenkins project has a dedicated workspace directory. This option allows you to wipe out your workspace directory with each new Jenkins build, to keep it clean._

<div align="center">
    <img src="images/env.JPG" width="700" />
</div>

9. _Under Build Actions, add a Build Step, and AWS CodeBuild. On the AWS Configurations, choose Manually specify access and secret keys and provide the keys._

<div align="center">
    <img src="images/codebuild.JPG" width="700" />
</div>

10. _From the CloudFormation stack Outputs tab, copy the AWS CodeBuild project name (myProjectName) and paste it in the Project Name field. Also, set the Region that you are using and choose Use Jenkins source.
It is a best practice is to store AWS credentials for CodeBuild in the native Jenkins credential store. _

<div align="center">
    <img src="images/projectconfig.JPG" width="700" />
</div>

***