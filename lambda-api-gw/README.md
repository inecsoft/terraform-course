***

# **Overview of Lambda with S3 as source code, RestApi and more **
***

# __Create a bucket__
aws s3api create-bucket --bucket inecsoft-serverless  --region eu-west-1 --create-bucket-configuration LocationConstraint=eu-west-1

# __Pipeline update__
cd code 

# __edit main.js__
```
zip ../code.zip main.js
cd ..

```
# __Copy the  zip file to the bucket__
```
aws s3 cp code.zip s3://inecsoft-serverless/v1.0.0/code.zip
```
# __After the function is created successfully, try invoking it using the AWS CLI:__
```
aws lambda invoke --region=eu-west-1 --function-name=inecsoft-lambda output.txt
```
# __To update__
```
terraform apply -var="app_version=1.0.1" -auto-approve
```
# __To go back__
```
terraform apply -var="app_version=1.0.0" -auto-approve
```

Ref: https://learn.hashicorp.com/terraform/aws/lambda-api-gateway

***
