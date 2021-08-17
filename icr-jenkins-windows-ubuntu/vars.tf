variable "AWS_REGION" {
  default = "eu-west-1"
}

#-------------------------------------------------------------------
variable "AMIS-UBUNTU" {
  type = map(string)
  default = {
    eu-west-1 = "ami-02df9ea15c1778c9c"
  }
}

variable "AMIS-AMAZON" {
  type = map(string)
  default = {
    eu-west-1 = "ami-01f14919ba412de34"
  }
}
variable "AMIS-REDHAT" {
  type = map(string)
  default = {
    eu-west-1 = "ami-04facb3ed127a2eb6"
  }
}
variable "AMIS-WIN" {
  type = map(string)
  default = {
    eu-west-1 = "ami-00f8336af4b6b40bf"
  }
}
#----------------------------------------------------------------------
variable "PATH_TO_PRIVATE_KEY" {
  default = "project"
}

variable "PATH_TO_PUBLIC_KEY" {
  default = "project.pub"
}

#-------------------------------------------------------------------
variable "instance_type" {
  default = "t2.micro"
}
#-------------------------------------------------------------------
data "aws_availability_zones" "azs" {}
#-------------------------------------------------------------------
data "aws_security_group" "default" {
  name   = "default"
  vpc_id = module.vpc.vpc_id
}
#-------------------------------------------------------------------

variable "INSTANCE_DEVICE_NAME" {
  default = "/dev/xvdh"
}

variable "JENKINS_VERSION" {
  default = "2.204.1"
}
#-------------------------------------------------------------------
variable "INSTANCE_USERNAME" {
  default = "Terraform"
}
variable "INSTANCE_PASSWORD" {
  default = "Bu70xZf3yVGzHQoe9XVP9UDkG1c="
}

variable "jenkins_USERNAME" {
  default = "jenkins"
}
variable "jenkins_PASSWORD" {
  default = "FkHuwIAQdt13cOk0ecQbsd6BsFYe3LJcvBSiCOz6zrn7PvM="
}
#-------------------------------------------------------------------


