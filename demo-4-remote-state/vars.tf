variable "AWS_ACCESS_KEY" {}
variable "AWS_SECRET_KEY" {}
variable "AWS_REGION" {
  default = "eu-west-1"
}
variable "AMIS" {
  type = "map"
  default = {
    us-east-1 = "ami-07d0cf3af28718ef8"
    eu-west-2 = "ami-077a5b1762a2dde35"
    eu-west-1 = "ami-06358f49b5839867c"
  }
}
