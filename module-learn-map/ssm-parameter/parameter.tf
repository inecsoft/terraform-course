resource "aws_ssm_parameter" "ssm-parameter" {
  name       = var.name
  type       = var.type
  data_type  = var.data_type
  value      = var.value

  tags = {
    Name = "${terraform.workspace}-${var.name}"
  }
}
