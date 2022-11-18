#--------------------------------------------------------------------------------------
data "http" "workstation-external-ip" {
  url = "http://ipv4.icanhazip.com"
}

locals {
  workstation-external-cidr = "${chomp(data.http.workstation-external-ip.response_body)}/32"
}
#----------------------------------------------------------------------------
variable "AWS_REGION" {
  default = "eu-west-1"
}
#----------------------------------------------------------------------------------------
data "aws_caller_identity" "current" {}
#---------------------------------------------------------
data "aws_availability_zones" "azs" {}
#-------------------------------------------------------------------
locals {
  default_name = join("-", list(terraform.workspace, "dumy"))
}
# #-------------------------------------------------------------------
# variable "dynamic-rule" {
#   type = map(object({
#     origins = set(object({
#       hostname = string
#     }))
#   }))
#   default = {

#     from_port   = "443"
#     to_port     = "443"
#     protocol    = "tcp"
#     cidr_blocks = "192.160.1.33/32"
#     description = "user name ivan pedro"

#   }
# }
#-------------------------------------------------------------------
variable "devops" {
  type = list(object({
    from_port   = string
    to_port     = string
    protocol    = string
    cidr_blocks = list(string)
    description = string
  }))
  default = []
}

variable "devs" {
  type = list(object({
    from_port   = string
    to_port     = string
    protocol    = string
    cidr_blocks = list(string)
    description = string
  }))
  default = []
}