#-------------------------------------

# TF-UPGRADE-TODO: Block type was not recognized, so this block and its contents were not automatically upgraded.
#--------------------------------------
#declare variable for region

#--------------------------------------
variable "AWS_REGION" {
  default = "eu-west-1"
}

#---------------------------------------
#declare the variable for private key
#-----------------------------------------
variable "PATH_TO_PRIVATE_KEY" {
  default = "mykey"
}

#------------------------------------------
#declare the variable for public key
#------------------------------------------
variable "PATH_TO_PUBLIC_KEY" {
  default = "mykey.pub"
}

#-----------------------------------------
variable "RDS_DATABASE_NAME"{
  default  = "mydatabase"
}
variable "RDS_USERNAME" {
  default = "ivanpedro"
}
variable "RDS_PASSWORD" {
  default  = "*cubasalsa123!!!"
}
#find out instance identifier

#data "aws_db_snapshot" "db_snapshot"{
#  most_recent =  "true"
#  db_instance_identifier = "db-eb"
#}
#-------------------------------------------
