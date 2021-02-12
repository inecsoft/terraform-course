resource "aws_ssm_parameter" "ssm-parameter" {
  name  = var.name
  type  = "String"
  value = var.value
}
