#--------------------------------------------------------------------------------------------
resource "aws_security_group" "security-group-dynamic" {
  name        = "${local.default_name}-security-group-dynamic"
  description = "Allow https inbound traffic"
  vpc_id      = module.vpc.vpc_id

  dynamic "ingress" {
    iterator = rule
    for_each = [for entry in concat(var.devops, var.devs) : entry]
    # for_each = var.dynamic-rule

    content {
      from_port   = rule.value["from_port"]
      to_port     = rule.value["to_port"]
      protocol    = rule.value["protocol"]
      cidr_blocks = rule.value["cidr_blocks"]
      description = rule.value["description"]
    }
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    #prefix_list_ids = ["pl-12c4e678"]
  }

  tags = {
    Name = "${local.default_name}-security-group-dynamic"
  }
}
#--------------------------------------------------------------------------------------------