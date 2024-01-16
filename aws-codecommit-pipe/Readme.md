***
# We are going to create the CodeCommit, CodeBuild, and CodePipeline objects
# This will NOT add code to CodeCommit, that must be done separately
# You will need the name of the state_bucket created in 5-remote-state-setup
***

#### Rename terraform.tfvars.example to terraform.tfvars and update values

### __Initialize the terraform configuration__
```
terraform init
```
### __Plan the terraform deployment__
```
terraform plan -out code.tfplan
```
### __Apply the deployment__
```
terraform apply "code.tfplan"
```
### Make note of the code commit url
### Get Git credentials from the Console for https
### Clone the git repo locally and copy files in 7-code-commit-files to the repo

```
git clone "https://git-codecommit.eu-west-1.amazonaws.com/v1/repos/vpc-deploy"
cp implementing-Terraform-on-AWS\7-code-commit-files\* .
```

### __Commit changes to the repo and push__


***