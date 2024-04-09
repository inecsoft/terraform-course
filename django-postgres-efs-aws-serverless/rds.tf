# RDS Security Group (traffic Fargate -> RDS)
resource "aws_security_group" "rds" {
  name        = "rds-security-group"
  description = "Allows inbound access from Fargate only"
  vpc_id      = aws_vpc.ecs_vpc.id

  ingress {
    protocol        = "tcp"
    from_port       = "5432"
    to_port         = "5432"
    security_groups = [ aws_security_group.ecs_security_group.id ]
  }

  ingress {
    protocol        = "tcp"
    from_port       = "5432"
    to_port         = "5432"
    cidr_blocks = var.subnet_cidr_public
  }



  ingress {
    protocol        = "tcp"
    from_port       = "5432"
    to_port         = "5432"
    cidr_blocks = [  local.workstation-external-cidr ]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_subnet_group" "db_subnet_group_rds" {
  name       = "main"
  subnet_ids =  aws_subnet.ecs_subnets_private.*.id

}

resource "aws_db_instance" "db_instance" {
  identifier              = "${jsondecode(aws_secretsmanager_secret_version.secret_version.secret_string)["POSTGRES_DB"]}"
  # db_name                 = "${jsondecode(aws_secretsmanager_secret_version.secret_version.secret_string)["POSTGRES_DB"]}"
  username                = "${jsondecode(aws_secretsmanager_secret_version.secret_version.secret_string)["POSTGRES_USER"]}"
  password                = "${jsondecode(aws_secretsmanager_secret_version.secret_version.secret_string)["DATABASE_PASSWORD"]}"
  port                    = "${jsondecode(aws_secretsmanager_secret_version.secret_version.secret_string)["POSTGRES_PORT"]}"
  engine                  = "postgres"
  engine_version          = "15.4"
  instance_class          = var.rds_instance_class
  allocated_storage       = "20"
  storage_encrypted       = false
  vpc_security_group_ids  = [aws_security_group.rds.id]
  db_subnet_group_name    = aws_db_subnet_group.db_subnet_group_rds.name
  multi_az                = false
  storage_type            = "gp2"
  publicly_accessible     = false
  backup_retention_period = 7
  skip_final_snapshot     = true
}


output "db_instance_endpoint" {
  description = "enpoint rds"
  value       = aws_db_instance.db_instance.address
}
