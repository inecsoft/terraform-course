variable "AWS_REGION" {
  default = "eu-west-1"
}
variable "PATH_TO_PRIVATE_KEY" {
  default = "mykey"
}
variable "PATH_TO_PUBLIC_KEY" {
  default = "mykey.pub"
}
variable "AMIS" {
  type = map(string)
  default = {
    us-east-1 = "ami-0b69ea66ff7391e80"
    us-west-2 = "ami-04b762b4289fba92b"
    us-west-1 = "ami-0245d318c6788de52"
    eu-west-1 = "ami-0ce71448843cb18a1"
  }
}
