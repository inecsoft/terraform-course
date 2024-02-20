#---------------------------------------------------------
resource "aws_key_pair" "key-pair" {
  key_name   = "bastion-key"
  public_key = file(var.PATH_TO_PUBLIC_KEY)

  tags = {
    Name = "bastion-key"
  }
}
#-----------------------------------------------------------
#ssh-keygen -t ecdsa -b 384 -f lambda
variable "PATH_TO_PRIVATE_KEY" {
  default = "bastion-ke"
}
#--------------------------------------------------------------------------------------
variable "PATH_TO_PUBLIC_KEY" {
  default = "bastion-key.pub"
}