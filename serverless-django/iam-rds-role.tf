##################################################
# Create an IAM role to allow enhanced monitoring
##################################################
#----------------------------------------------------------------------------
resource "aws_iam_role" "rds_enhanced_monitoring_db" {
  name_prefix        = "rds-enhanced-monitoring-db-"
  assume_role_policy = data.aws_iam_policy_document.rds_enhanced_monitoring.json
}
#----------------------------------------------------------------------------
resource "aws_iam_role_policy_attachment" "rds_enhanced_monitoring_db" {
  role       = aws_iam_role.rds_enhanced_monitoring_db.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonRDSEnhancedMonitoringRole"
}
#----------------------------------------------------------------------------
data "aws_iam_policy_document" "rds_enhanced_monitoring" {
  statement {
    actions = [
      "sts:AssumeRole",
    ]

    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["monitoring.rds.amazonaws.com"]
    }
  }
}
#----------------------------------------------------------------------------