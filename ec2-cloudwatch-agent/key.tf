resource "aws_key_pair" "keypair" {
  key_name   = "mykey"
  public_key = file(var.PATH_TO_PUBLIC_KEY)

  tags = {
    Name =  "${local.default_name}-keypair"
  }
}

