#------------------------------------------------------------------------------------------------------
# security group
#------------------------------------------------------------------------------------------------------
resource "aws_security_group" "ecs-codepipeline" {
  name        = "${local.default_name}-ECS-sg"
  vpc_id      = module.vpc.vpc_id
  description = "ECS codepipeline"

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    #cidr_blocks = ["0.0.0.0/0"]
    security_groups = ["${aws_security_group.codepipeline-lb-sg.id}","${aws_security_group.codepipeline-bastion.id}"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    #cidr_blocks = ["0.0.0.0/0"]
    security_groups = ["${aws_security_group.codepipeline-bastion.id}"]
  }

  egress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    cidr_blocks = [
      "0.0.0.0/0"
    ]
  }

   tags = {
    Name = "${local.default_name}-ECS-sg"
  }
}
#------------------------------------------------------------------------------------------------------