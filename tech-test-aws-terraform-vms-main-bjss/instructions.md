# BJSS AWS Tech Test

## Overview
This technical test is intended to demonstrate knowledge on using AWS with Terraform, primarily around the use of EC2 and VPC. The code will not initially run, you are expected to fix various issues and then extend the solution.

The bootstrap file used to run the application does not need to be altered in this exercise and the tasks can all be completed without accessing the instance. If you do wish to access the instance for troubleshooting, you can use SSM Session Manager to connect to the instance if the AMI used has SSM Agent installed, however no access is required to complete this test.

Feel free to tackle these tasks in any order.

If you create any new resources that are taggable, please give them a tag with the key "Name" and the value matching the candidate variable. Your IAM access is based off of this tag and as such you may experience permission issues if you do not tag resources correctly.

## Tasks
- The supplied configuration has a number of errors in it that means terraform will not successfully plan, fix them.

- The terraform may not successfully apply, if not, work out why and apply a sensible fix.

- Fix the infrastructure applied to make sure the application is working, accessing port 80 over HTTP on its public IP from anywhere should return a message like:

```
hostname is: ip-xxx-xxx-xxx-xxx.eu-west-2.compute.internal
```

- Restrict the security groups used to the minimum necessary for the application to be available on port 80 to any IP and internal communication limited to the minimum possible.

- Apply the necessary changes to make the application have 3 nodes

- Create an ALB to balance traffic between the nodes

- Ensure the application nodes are in a private subnet without a public IP address

- Makes sure the nodes are spread across multiple AZs

- Remove any terraform warnings

