#---------------------------------------------------------------
resource "aws_key_pair" "project" {
  key_name   = "project"
  public_key = file("${var.PATH_TO_PUBLIC_KEY}")
}
#---------------------------------------------------------------
