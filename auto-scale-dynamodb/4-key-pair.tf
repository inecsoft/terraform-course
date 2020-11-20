#---------------------------------------------------------
resource "aws_key_pair" "key-pair" {
  key_name = "${local.default_name}-key-pair"
  public_key = file(var.PATH_TO_PUBLIC_KEY)

  tags = {
    Name = "${local.default_name}-key-pair"
  }
}
#-----------------------------------------------------------
