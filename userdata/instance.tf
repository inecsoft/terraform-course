#-------------------------------------------------------------------------
resource "aws_key_pair" "mykey" {
  key_name   = "mykey"
  public_key = file("${var.PATH_TO_PUBLIC_KEY}")
}
#-------------------------------------------------------------------------
data "template_file" "userdata" {
  template = file("userdata.tpl")

}
#-------------------------------------------------------------------------

resource "aws_instance" "webserver" {
  ami                         = lookup(var.AMIS, var.AWS_REGION)
  instance_type               = "t2.micro"
  key_name                    = aws_key_pair.mykey.key_name
  associate_public_ip_address = true
  root_block_device {
    volume_type           = "gp2"
    volume_size           = "8"
    delete_on_termination = true
  }

  user_data = data.template_file.userdata.rendered

  tags = {
    Name = "webserver"
  }

  connection {
    host        = self.public_ip
    user        = var.INSTANCE_USERNAME
    private_key = file("${var.PATH_TO_PRIVATE_KEY}")
  }
}
#-------------------------------------------------------------------------
output "IPAddress" {
  value = aws_instance.webserver.public_ip
}
#-------------------------------------------------------------------------

