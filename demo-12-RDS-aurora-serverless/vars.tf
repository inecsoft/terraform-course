#-------------------------------------------------------------------
#set the environment variables
#-------------------------------------------------------------------
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
    us-east-1 = "ami-13be557e"
    us-west-2 = "ami-06b94666"
    eu-west-1 = "ami-844e0bf7"
  }
}

variable "RDS_IDENTIFIER" {
   default = "auroraserverless"
}

variable "RDS_USERNAME" {
   default = "auroraserverless"
}

variable "RDS_PASSWORD" {
   default = "AuroraServerlessPasswor123d"
}
variable "INSTANCE_USERNAME" {
   default = "ubuntu"
}
variable "env" {
   default = "prod"
}
variable "vpc_state_config" {
  description = "A config for accessing the vpc state file"
  type        = map(string)
  default = {
    bucket = "inecsoft.co.uk"
    #key    = "env:/development/my-vpc.tfstate"
    key    = "terraform/aurora-serverless.tfstate"
    region = "eu-west-1"
  } 
}
#-------------------------------------------------------------------


