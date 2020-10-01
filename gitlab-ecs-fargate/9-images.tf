#-------------------------------------------------------------------
# Define the RHEL 8.0 AMI by:
# RedHat, Latest, x86_64, EBS, HVM, RHEL 8.0
#-------------------------------------------------------------------
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

#-------------------------------------------------------------------
data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["137112412989"] # Amazon

  filter {
    name = "name"

    values = [
      "amzn2-ami-hvm-*-x86_64-gp2",
    ]
  }

  filter {
    name = "owner-alias"

    values = [
      "amazon",
    ]
  }
}

#-------------------------------------------------------------------
data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-*-*-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}
#-------------------------------------------------------------------
output "ami-amazon-id" {
  description = "Description of ami amazon"
  value       = data.aws_ami.amazon_linux.id
}
#-------------------------------------------------------------------
output "ami-amazon-name" {
  description = "Description of ami amazon"
  value       = data.aws_ami.amazon_linux.name
}
#-------------------------------------------------------------------
output "ami-ubuntu-id" {
  description = "description of ami ubuntu"
  value       = data.aws_ami.ubuntu.id
}
#-------------------------------------------------------------------
output "ami-ubuntu-name" {
  description = "description of ami ubuntu"
  value       = data.aws_ami.ubuntu.name 
}
#-------------------------------------------------------------------
output "ami-redhat-id" {
  description = "Description of ami redhat"
  value       = data.aws_ami.redhat.id
}
#-------------------------------------------------------------------
output "ami-redhat-name" {
  description = "Description of ami redhat"
  value       = data.aws_ami.redhat.name
}
#-------------------------------------------------------------------