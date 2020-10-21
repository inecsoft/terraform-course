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
data "aws_ami" "ecs-optimized" {
  most_recent = true
  owners = ["591542846629"] # AWS

  filter {
    name   = "name"
    values = ["amzn-ami*amazon-ecs-optimized"] #amzn2-ami-ecs
  }

  filter {
    name = "owner-alias"

    values = [
      "amazon",
    ]
  }
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
  description = "description of ami ubuntu "
  value       = data.aws_ami.ubuntu.id
}
#-------------------------------------------------------------------
output "ami-ubuntu-name" {
  description = "description of ami ubuntu "
  value       = data.aws_ami.ubuntu.name 
}
#-------------------------------------------------------------------

output "ami-ecs-optimized-id" {
  description = "Description of ami amazon"
  value       = data.aws_ami.ecs-optimized.id
}
#-------------------------------------------------------------------