
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
variable  "MYSQL_HOST" {
  value = aws_db_instance.mariadb.endpoint
}

variable "MYSQL_USER" {
      value = "codepipeline"
}

variable "MYSQL_PASSWORD" {
      value = "JO3a2NIXapLl0zG76AE41o2e4jdqB66oinmegVPL1y5bRvo=" 
}
variable "MYSQL_DATABASE" {
      value = "codepipeline"
}
#-------------------------------------------------------------------

