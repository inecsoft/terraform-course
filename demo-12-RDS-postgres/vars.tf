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


variable "RDS_USERNAME" {
  default = "ivanpedro"
}
variable "RDS_PASSWORD" {
  default = "*cubasalsa123!!!"
}
variable "RDS_DB_NAME" {
  default = "demodb"
}
variable "RDS_DB_IDENTIFIER" {
  default = "demodb-postgres"
}
variable "RDS_DB_R_IDENTIFIER" {
  default = "demodb-postgres-replica"
}

#-------------------------------------------------------------------


