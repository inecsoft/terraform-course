#-------------------------------------------------------------------
resource "aws_security_group" "dynamodb-sg" {
    name        = "${local.default_name}-dynamodb-sg"
    description = "Allow access to MyInstance"
    vpc_id      = module.vpc.vpc_id

    ingress {
        from_port       = 22
        to_port         = 22
        protocol        = "tcp"
        cidr_blocks     = ["0.0.0.0/0"]
    }

    egress {
        from_port       = 0
        to_port         = 0
        protocol        = "-1"
        cidr_blocks     = [local.workstation-external-cidr]
        #cidr_blocks     = ["0.0.0.0/0"]
    }

    tags {
        Name = = "${local.default_name}-dynamodb-sg"
    }
}
#-------------------------------------------------------------------
