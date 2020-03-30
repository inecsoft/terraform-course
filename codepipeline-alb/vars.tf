
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

#-------------------------------------------------------------------
locals {
  default_name = "${join("-", list(terraform.workspace, "code-pipeline"))}"
}
#-------------------------------------------------------------------
