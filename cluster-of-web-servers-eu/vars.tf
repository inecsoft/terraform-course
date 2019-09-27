#declare variables
#-------------------------------------------------------------------
variable "AWS_REGION" {
 default = "eu-west-1"

}
#-------------------------------------------------------------------
data "aws_availability_zones" "azs" {}

variable "vpc_cidr" {
  default = "10.0.0.0/16"
}
#---------------------------------------------------------------------
variable "subnet_cidr_public" {
  type = "list"
  default = ["10.0.1.0/24","10.0.2.0/24","10.0.3.0/24"]

}
#--------------------------------------------------------------------
variable "subnet_cidr_private" {
  type = "list"
  default = ["10.0.101.0/24","10.0.102.0/24","10.0.103.0/24"]

}

#-------------------------------------------------------------------
# ---------------------------------------------------------------------------------------------------------------------
# ENVIRONMENT VARIABLES
# Define these secrets as environment variables
# ---------------------------------------------------------------------------------------------------------------------

# AWS_ACCESS_KEY_ID
# AWS_SECRET_ACCESS_KEY

# ---------------------------------------------------------------------------------------------------------------------
# OPTIONAL PARAMETERS
# ---------------------------------------------------------------------------------------------------------------------

variable "server_port" {
  description = "The port the server will use for HTTP requests"
  type        = number
  default     = 8080
}

variable "elb_port" {
  description = "The port the ELB will use for HTTP requests"
  type        = number
  default     = 80
}#declare variables


#-------------------------------------------------------------------

# ---------------------------------------------------------------------------------------------------------------------
# GET THE LIST OF AVAILABILITY ZONES IN THE CURRENT REGION
# Every AWS accout has slightly different availability zones in each region. For example, one account might have
# us-east-1a, us-east-1b, and us-east-1c, while another will have us-east-1a, us-east-1b, and us-east-1d. This resource
# queries AWS to fetch the list for the current account and region.
# ---------------------------------------------------------------------------------------------------------------------

data "aws_availability_zones" "all" {}
# ---------------------------------------------------------------------------------------------------------------------
#resource "aws_default_subnet" "default" {                                   
#  availability_zone = "eu-west-1"                        
#}
