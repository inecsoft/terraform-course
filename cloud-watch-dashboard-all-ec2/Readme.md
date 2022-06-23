***

# __Create Cross-Account User Roles for AWS with Terraform__

<div align="center">
    <img src="images/assumed-role.jpg" width="700" />
</div>

***


### __1. Get the role ARN.__
```
aws iam list-roles --query "Roles[?RoleName == 's3-list-role'].[RoleName, Arn]"
```

### __2. Request STS from AWS using the role ARN and a session name of your choosing.__
```
aws sts assume-role --role-arn "arn:aws:iam::123456789012:role/example-role" --role-session-name "cross-account" --profile log-dev-beenetwork
```

### __3. User gets temporary credentials, export these as environment variables.__
```
export AWS_ACCESS_KEY_ID=ExampleAccessKeyID
export AWS_SECRET_ACCESS_KEY=ExampleSecretKey
export AWS_SESSION_TOKEN=ExampleSessionToken
```
### __4. Access S3 using the temp credentials.__
```
aws s3api list-buckets
```

### __To Verify that you assumed the IAM role by running__
```
aws sts get-caller-identity
```
```
[profile cross-account]
    role_arn = arn:aws:iam::123456789012:role/s3-list-role
    source_profile = log-dev-beenetwork
```
[cross-account]
aws_access_key_id = ASIAQXK5GCB4WCEE6HVH
aws_secret_access_key = QNyZT4SmaMRUSCV8EJBG7DwcOWZw1oldWq/oW++O
aws_session_token = IQoJb3JpZ2luX2VjEAIaCWV1LXdlc3QtMSJGMEQCIHYnlssBsPnuXFZJpo88liAGJRjDPsFYhIE8k9j8L/ndAiBOz+65NgHEVx9lCWoe1u8+7H+NIahCqXJjebbp6W+AgCqaAggbEAQaDDA1MDEyNDQyNzM4NSIMw8/1g7OiSjZrO4UEKvcB7nODakKDiZPOjykVXUsguOqCnnPSnfkQvwi+qVkERon5zwQXN3R+LTYuraROOfLpH5KkbPh3Mu5BRNHmCKCYVi9nkI0DrEs9UJxMy+YYbEoSy4clA7+kk6XvLZvBnaLQd7lCXvYME8fCCwiUGe9ZukC5cCJVqpbu88ZdMIBvAnn/xFJAw5LvTV+Y0s72ixiO4VBTSsfBm2IkoDZZZ1BaWcn7kaqlHhd5ZA27yDJts5habHHulBNWCaiUzZMUI14egmky8UdtFX5DBK92K2g83aXh2yqc/xHqeEqyG1m/9R9VKRU1Apm+rqp/SPIYJjBCI/ujjxCjpTDMyb2VBjqeASUKW+WCxtwciXABrSNPNtBmT30gWhlQ6gp//x5xq7QSnKl5fP86c+ZmeoRbKmvoL0EJiVpAZa0Vg7Ba5T2NHg2tm9PRwDzIEjAO69ke7i+zxkO6JDUWOGmFP8dFfM3QoVgKKy4/lD5kNPB9U/Orkwymeb/DG8YxErfASRvmleCdy+PoNqP5j/sbJtSuKbqAL27ANS5IFA+DHdAQ55AJ
```
aws s3 ls --profile cross-account
```
***