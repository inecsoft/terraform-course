#-------------------------------------------------------------------------
resource "aws_eip" "eip" {
  vpc = true

  tags = {
    Name = "${local.default_name}-eip"
  }
}
#-------------------------------------------------------------------------
resource "aws_eip_association" "eip_assoc" {
  instance_id   = aws_instance.gitlab.id
  allocation_id = aws_eip.eip.id

  depends_on = [aws_eip.eip]
}
#-------------------------------------------------------------------------
output "eip_id" {
  value = aws_eip.eip.id
}
#-------------------------------------------------------------------------
output "eip_public_ip" {
  value = aws_eip.eip.public_ip
}
#-------------------------------------------------------------------------
