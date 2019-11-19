#---------------------------------------------------------------------------
resource "aws_db_subnet_group" "aurora-serverless" {
  name        = "${var.RDS_USERNAME}"
  description = "${var.RDS_USERNAME}"
  subnet_ids  = ["${aws_subnet.main-private-1.id}", "${aws_subnet.main-private-2.id}"]

  tags = {
    Name        = "${var.RDS_USERNAME}"
    Environment = "${var.env}"
  }
}
#---------------------------------------------------------------------------
resource "aws_rds_cluster" "aurora-serverless" {
  cluster_identifier      = "${var.RDS_IDENTIFIER}"
  vpc_security_group_ids  = ["${aws_security_group.allow-aurora-serverless.id}"]
  db_subnet_group_name    = "${aws_db_subnet_group.aurora-serverless.name}"
  engine_mode             = "serverless"
  master_username         = "${var.RDS_USERNAME}"
  master_password         = "${var.RDS_PASSWORD}"
  backup_retention_period = 7
  skip_final_snapshot     = true 
  final_snapshot_identifier = "aurora-serverless"

  #engine_version                      = "5.7"

  scaling_configuration {
    auto_pause               = true
    max_capacity             = 2
    min_capacity             = 2
    seconds_until_auto_pause = 300
  }

  lifecycle {
    ignore_changes = [
      "engine_version",
    ]
  }
}
#---------------------------------------------------------------------------
