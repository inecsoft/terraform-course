variable "candidate" {
  description = "Candidate name"
  default     = "ivanarteaga"
}

variable "vpc_cidr" {
  description = "CIDR to use for the VPC"
  default     = "10.111.0.0/20"
}

variable "cidr_block" {
  type        = string
  description = "subnets"
  default     = "10.111.1.0/24"
}

variable "min_size" {
  type        = string
  description = "description"
  default     = "3"
}

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

variable "subnet_cidr_public" {
  type    = list(string)
  default = ["10.111.1.0/24", "10.111.2.0/24", "10.111.3.0/24"] # Need to be able to hold maximum 11 instances

}
#--------------------------------------------------------------------
variable "subnet_cidr_private" {
  type    = list(string)
  default = ["10.111.4.0/24", "10.111.5.0/24", "10.111.6.0/24"] # Need to be able to hold maximum 11 instances

}

data "aws_availability_zones" "azs" {}