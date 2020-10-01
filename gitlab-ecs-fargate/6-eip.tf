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
}
#-------------------------------------------------------------------------
output "eip_id" {
  value = aws_eip.eip.id
}
#-------------------------------------------------------------------------