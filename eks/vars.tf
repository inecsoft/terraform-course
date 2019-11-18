#---------------------------------------------------
variable "region" {
	#default ="us-east-1"
	default ="eu-west-1"
}

#---------------------------------------------------
variable "cluster-name" {
  default = "terraform-eks-demo"
  type    = "string"
}

#---------------------------------------------------
variable "myip" {
  default = "192.168.1.100"
}
#---------------------------------------------------
variable "myip" {
  default = "192.168.1.33"
}

