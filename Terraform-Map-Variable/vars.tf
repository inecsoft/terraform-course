#----------------------------------------------------------------------------
resource "random_password" "password" {
  length  = 20
  special = true
  #override_special = "_@\/ "
}
#--------------------------------------------------------------------------------------

#-------------------------------------------------------------------
#----------------------------------------------------------------------------
locals {
  default_name = join("-", tolist([terraform.workspace, "fargate"]))
}
#-------------------------------------------------------------------
data "aws_caller_identity" "current" {}

#-------------------------------------------------------------------
variable "AWS_REGION" {
  default = "eu-west-1"
}
#-------------------------------------------------------------------
variable "region" {
  default = "eu-west-1"
}

variable "ecs_cluster" {
  default = "ecs-fargate-cluster"
}

variable "key_pair_name" {
  default = "bastion-key"
}

variable "max_instance_size" {
  default = 5
}

variable "min_instance_size" {
  default = 1
}

variable "desired_capacity" {
  default = 1
}

variable "ami" {
  type = map(string)
  default = {
    "eu-west-2" = "ami-00a1270ce1e007c27"
    "eu-west-1" = "ami-0ce71448843cb18a1"
    "eu-west-3" = "ami-03b4b78aae82b30f1"
  }
}

data "aws_availability_zones" "azs" {
}

variable "vpc_cidr" {
  default = "10.100.0.0/16"
}

variable "subnet_cidr" {
  type    = list(string)
  default = ["10.100.1.0/24", "10.100.2.0/24", "10.100.3.0/24"]
}

# Map of string

variable "map_string" {
  type = map(string)
  default = {
    luke  = "jedi"
    yoda  = "jedi"
    darth = "sith"
  }
}

# Map of object
variable "map_object" {
  type = map(object({
    name = string
    enemies_destroyed = number
    badguy = bool
  }))
  default = {
    key1 = {
      name = "luke"
      enemies_destroyed = 4252
      badguy = false
    }
    key2 = {
      name = "yoda"
      enemies_destroyed = 900
      badguy = false
    }
    key3 = {
      name = "darth"
      enemies_destroyed=  20000056894
      badguy = true
    }
  }
}

# Map of lists
variable "map_list" {
  type = map(list(string))
  default = {
    luke = ["green", "blue"]
    yoda = ["green"]
    darth = ["red"]
  }
}

# Map of number
variable "map_number" {
  type = map(number)
  default = {
    luke  = 4252
    yoda  = 900
    darth = 20000056894
  }
}

locals {
  characters = ["luke", "yoda", "darth"]
  enemies_destroyed = [4252, 900, 20000056894]

  map = {
    for index, character in toset(local.characters) : # Convert character list to a set
      character => local.enemies_destroyed  # [index]
  }
}