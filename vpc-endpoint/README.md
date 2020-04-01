***

<div align="center">
  <h1>VPC Endpoint</h1>

</div>

***
#### __*NOTE:*__  
   VPC with enabled VPC flow log to S3 and CloudWatch logs.  
   Cloudwatch log group and IAM role will be created within the new vpc.  

### __VPC Endpoints Supports:__
  * ####  _Gateway_:  
    S3, DynamoDB  
  * #### _Interface:_  
    EC2, SSM, EC2 Messages, SSM Messages, SQS, ECR API, ECR DKR, API Gateway, KMS, ECS, ECS Agent, ECS Telemetry, SNS, STS, Glue, CloudWatch(Monitoring, Logs, Events), Elastic Load Balancing, CloudTrail, Secrets Manager, Config, CodeBuild, CodeCommit, Git-Codecommit, Transfer Server, Kinesis Streams, Kinesis Firehose, SageMaker(Notebook, Runtime, API), CloudFormation, CodePipeline, Storage Gateway, AppMesh, Transfer, Service Catalog, AppStream, Athena, Rekognition, Elastic File System (EFS), Cloud Directory


***

#### __To test:__
Delete the route table for the natgateway and create the endpoint then test that the EC2 instance has access to S3 bucket.
check that you have a route table pointing to the endpoint

***
