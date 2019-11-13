#-----------------------------------------------------------------------------------------------
#allows you to specify in what subnet that database will be in eu-west-1a and eu-west-1b if you 
#enable HA you will have RDS on both subnets.
#-----------------------------------------------------------------------------------------------
resource "aws_db_subnet_group" "postgresdb-subnet" {
  name        = "postgresdb-subnet"
  description = "RDS subnet group"
  subnet_ids  = [aws_subnet.main-private-1.id, aws_subnet.main-private-2.id]
}

#-----------------------------------------------------------------------------------------------
#allows you to specify parameters to cahnge settings in the database
#-----------------------------------------------------------------------------------------------
resource "aws_db_parameter_group" "postgresdb-parameters" {
  name        = "postgresdb-parameters"
  family      = "postgres11"
  description = "postgresDB parameter group"

#  parameter {
#    name  = "max_allowed_packet"
#    value = "16777216"
#  }
}

#---------------------------------------------------------------------------
# Get latest snapshot from production DB
#---------------------------------------------------------------------------
data "aws_db_snapshot" "db_snapshot" {
    most_recent = true
    db_instance_identifier = "db-prod"
}
#---------------------------------------------------------------------------
# Create new staging DB
#---------------------------------------------------------------------------
resource "aws_db_instance" "db_prod_restored" {
  instance_class       = "db.t2.micro"
  identifier           = var.RDS_DB_IDENTIFIER
  username             = var.RDS_USERNAME
  password             = var.RDS_PASSWORD
  db_subnet_group_name = "${aws_db_subnet_group.postgresdb-subnet.id}"
  snapshot_identifier  = "${data.aws_db_snapshot.db_snapshot.id}"
  vpc_security_group_ids = ["${aws_security_group.allow-postgresdb.id}"]
  skip_final_snapshot = true
}
#---------------------------------------------------------------------------
