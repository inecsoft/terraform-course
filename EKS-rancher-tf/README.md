## Amazon AWS Quick Start

**NOTE:** Terraform 0.12.0 or higher is required.

The aws folder contains terraform code to stand up a single Rancher server instance with a 1 node cluster attached to it.

You will need the following:

- An AWS Account with an access key and secret key
- The name of a pre-created AWS Key Pair
- Your desired AWS Deployment Region

This terraform setup will:

- Start an Amazon AWS EC2 instance running `rancher/rancher` version specified in `rancher_version`
- Create a custom cluster called `cluster_name`
- Start `count_agent_all_nodes` amount of AWS EC2 instances and add them to the custom cluster with all roles

### How to use

- Clone this repository and go into the aws subfolder
- Move the file `terraform.tfvars.example` to `terraform.tfvars` and edit (see inline explanation)
- Run `terraform init`
- Run `terraform apply`

When provisioning has finished you will be given the url to connect to the Rancher Server

### How to Remove

To remove the VM's that have been deployed run `terraform destroy --force`

### Optional adding nodes per role
- Start `count_agent_all_nodes` amount of AWS EC2 Instances and add them to the custom cluster with all role
- Start `count_agent_etcd_nodes` amount of AWS EC2 Instances and add them to the custom cluster with etcd role
- Start `count_agent_controlplane_nodes` amount of AWS EC2 Instances and add them to the custom cluster with controlplane role
- Start `count_agent_worker_nodes` amount of AWS EC2 Instances and add them to the custom cluster with worker role

**Please be aware that you will be responsible for the usage charges with Amazon AWS**