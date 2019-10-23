
https://learn.hashicorp.com/terraform/aws/lambda-api-gateway
#create a bucket
aws s3api create-bucket --bucket inecsoft-serverless  --region eu-west-1 --create-bucket-configuration LocationConstraint=eu-west-1

#pipeline update
cd example
#edit main.js
zip ../example.zip main.js
cd ..
#copy the  zip file to the bucket	
aws s3 cp example.zip s3://inecsoft-serverless/v1.0.0/example.zip
#After the function is created successfully, try invoking it using the AWS CLI:
aws lambda invoke --region=eu-west-1 --function-name=inecsoft-lambda output.txt

#to update
terraform apply -var="app_version=1.0.1" -auto-approve
#to go back
terraform apply -var="app_version=1.0.0" -auto-approve
