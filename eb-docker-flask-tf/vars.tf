#-------------------------------------------------------------------
variable "AWS_REGION" {
 default = "eu-west-2"
}
#-------------------------------------------------------------------
data "http" "workstation-external-ip" {
  url = "http://ipv4.icanhazip.com"
}

locals {
  workstation-external-cidr = "${chomp(data.http.workstation-external-ip.body)}/32"
}
#----------------------------------------------------------------------------
variable "redhat-user" {
  default = "ec2-user"
}
#-------------------------------------------------------------------
locals {
  default_name = "${join("-", list(terraform.workspace, "eb-docker-flask"))}"
}
#-------------------------------------------------------------------
#ssh-keygen -t ecdsa -b 384 -f vpc-endpoint
variable "PATH_TO_PRIVATE_KEY" {
  default = "eb-docker-flask"
}

variable "PATH_TO_PUBLIC_KEY" {
    default = "eb-docker-flask.pub"
}
#-------------------------------------------------------------------
locals {
  s3_bucket_name            = "vpc-flow-logs-to-s3-${random_pet.this.id}"
  cloudwatch_log_group_name = "vpc-flow-logs-to-cloudwatch-${random_pet.this.id}"
}

resource "random_pet" "this" {
  length = 2
}
#-------------------------------------------------------------------

