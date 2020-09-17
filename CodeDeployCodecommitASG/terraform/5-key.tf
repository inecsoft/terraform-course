#---------------------------------------------------------
resource "aws_key_pair" "codecommit-key" {
  key_name = "codecommit-key"
  public_key = file(var.PATH_TO_PUBLIC_KEY)
}
#-----------------------------------------------------------
