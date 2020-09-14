#---------------------------------------------------------------
resource  "aws_key_pair" "sshkey" {
   key_name = "ec2-systems-manager"
   public_key = file(var.PATH_TO_PUBLIC_KEY)
}
#---------------------------------------------------------------

