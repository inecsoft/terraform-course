#-------------------------------------------------------------------
variable "AWS_REGION" {
  default = "eu-west-1"
}
#-------------------------------------------------------------------
data "http" "workstation-external-ip" {
  url = "http://ipv4.icanhazip.com"
}

locals {
  workstation-external-cidr = "${chomp(data.http.workstation-external-ip.body)}/32"
}
#----------------------------------------------------------------------------
variable "redhat-user" {
  default = "ec2-user"
}
#-------------------------------------------------------------------
locals {
  default_name = join("-", list(terraform.workspace, "proxy"))
}
#-------------------------------------------------------------------
variable "domain" {
  default = "proxy.inchoratech.com"
}
#-------------------------------------------------------------------
#ssh-keygen -t ecdsa -b 384 -f proxy
variable "PATH_TO_PRIVATE_KEY" {
  default = "proxy"
}

variable "PATH_TO_PUBLIC_KEY" {
  default = "proxy.pub"
}
#-------------------------------------------------------------------
