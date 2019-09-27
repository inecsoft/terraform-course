variable "AWS_REGION" {
  default = "eu-west-1"
}

variable "AMIS" {
  type = "map"
  default = {
    eu-west-1 = "ami-0bbc25e23a7640b9b"
 }

}

variable "PATH_TO_PRIVATE_KEY" {
  default = "mykey"
}

variable "PATH_TO_PUBLIC_KEY" {
  default = "mykey.pub"
}

variable "INSTANCE_USERNAME" {
  default = "ubuntu"
}
variable "INSTANCE_DEVICE_NAME" {
  default = "/dev/xvdh"
}
