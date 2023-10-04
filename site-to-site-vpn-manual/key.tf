#---------------------------------------------------------
resource "aws_key_pair" "key-pair_client" {
  provider   = aws.client
  key_name   = "client-site-to-site-vpn-key"
  public_key = file(var.PATH_TO_PUBLIC_KEY)

  tags = {
    Name = "client-site-to-site-vpn-key"
  }
}
#-----------------------------------------------------------
#---------------------------------------------------------
resource "aws_key_pair" "key-pair_main" {
  provider   = aws.main
  key_name   = "main-site-to-site-vpn-key"
  public_key = file(var.PATH_TO_PUBLIC_KEY)

  tags = {
    Name = "main-site-to-site-vpn-key"
  }
}
#-----------------------------------------------------------
