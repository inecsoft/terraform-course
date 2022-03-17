***

# __Manage Terraform State with AWS (S3 and DynamoDB)__

Working in a local environment and just for testing purposes, having the terraform.tfstate file only in your computer doesn’t have any downside, but working with a team and in a production-level environment you could face some of these issues:

  * Your team doesn’t know the current state of the terraform. None of the team members knows what is deployed in the cloud. Of course, you can use Git and Github, but this will not be an accurate solution.
  * Two team members try to deploy the resources to the cloud at the same time. This could lead to some conflicts in the Terraform state file, data loose and a lot of inconsistency.
  
This problem can be solved with Backend State and Locking State. Let’s explain what is these two new concepts and how they could help us work in a team.

### __Locking State__

When you deploy the infrastructure to the cloud running terraform apply you acquire a state lock. The state lock will lock the existing terraform state file from being updated by anyone other than the person who has the state lock. Once everything is deployed, the state lock will be released and another person in the team could acquire the state lock.

For the locking state we will configure the Terraform remote backend, to use AWS DynamoDB.

***
