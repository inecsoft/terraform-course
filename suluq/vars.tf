variable "AWS_REGION" {
  default = "eu-west-1"
}

#-------------------------------------------------------------------
variable "env" {}
variable "domain" {
  default = "roadtohealth.inchoratech.com"
}
variable "sub-domain" {
  default = "dev.roadtohealth.inchoratech.com"
}

variable "project" {
  default = "suluq"
}
variable "prod-db-instance-type" {
  default = "db.t3.medium"
}
variable "dev-db-instance-type" {
  default = "db.t3.medium"
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
#ssh-keygen -t rsa -b 4096 -f suluq
variable "PATH_TO_PRIVATE_KEY" {
  default = "suluq"
}

variable "PATH_TO_PUBLIC_KEY" {
  default = "suluq.pub"
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
  default = "2.190.3"
}
#-------------------------------------------------------------------
variable "INSTANCE_USERNAME" {
  default = "Terraform"
}
variable "INSTANCE_PASSWORD" {
  default = "Bu70xZf3yVGzHQoe9XVP9UDkG1c="
}

variable "db-password" {
  default = "2Xg75Yb80RhLv8RJ8FldNQZQuL4P8VqLYj3N41+H8E="
}

#-------------------------------------------------------------------
data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["137112412989"] # Amazon

  filter {
    name = "name"

    values = [
      "amzn-ami-hvm-*-x86_64-gp2",
    ]
  }

  filter {
    name = "owner-alias"

    values = [
      "amazon",
    ]
  }
}

# Define the RHEL 8.0 AMI by:
# RedHat, Latest, x86_64, EBS, HVM, RHEL 8.0
data "aws_ami" "redhat" {
  most_recent = true

  owners = ["309956199498"] // Red Hat's account ID.

  filter {
    name   = "architecture"
    values = ["x86_64"]
  }

  filter {
    name   = "root-device-type"
    values = ["ebs"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  filter {
    name   = "name"
    values = ["RHEL-8.0*"]
  }
}

#----------------------------------------------------------------------------
variable "redhat-user" {
  default = "ec2-user"

}

variable "ubuntu-user" {
  default = "ubuntu"

}

#-------------------------------------------------------------------
locals {
  default_name = join("-", list(terraform.workspace, "suluq"))
}
#-------------------------------------------------------------------

