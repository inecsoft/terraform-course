#-------------------------------------------------------------------
#declare variables
#-------------------------------------------------------------------
variable "AWS_REGION" {
  default = "eu-west-1"
}
variable "profile" {
  default = "cmrs"
}
#-------------------------------------------------------------------
variable "vpc_cidr" {
  default = "10.0.0.0/16"
}
#---------------------------------------------------------------------
variable "subnet_cidr_public" {
  type    = list(string)
  default = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]

}
#--------------------------------------------------------------------
variable "subnet_cidr_private" {
  type    = list(string)
  default = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

}
#-------------------------------------------------------------------
variable "INSTANCE_DEVICE_NAME" {
  default = "/dev/xvdh"
}
#ssh-keygen -t ecdsa -f cmrs

variable "PATH_TO_PRIVATE_KEY" {
  default = "cmrs"
}
variable "PATH_TO_PUBLIC_KEY" {
  default = "cmrs.pub"
}
variable "user" {
  default = "ec2-user"
}
#-------------------------------------------------------------------
locals {
  default_name = "${join("-", list(terraform.workspace, "cmrs"))}"
}
#-------------------------------------------------------------------
variable "ses_bucket" {
  type        = string
  default     = "mycmrs-email-storage"
  description = "Name of the S3 bucket to store received emails."
}
#-------------------------------------------------------------------
variable "receive_s3_prefix" {
  default = "received_emails"
}
#-------------------------------------------------------------------
