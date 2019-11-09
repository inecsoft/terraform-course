#--------------------------------------------------------------------------------------------------
# iam roles
#--------------------------------------------------------------------------------------------------
resource "aws_iam_role" "app-ec2-role" {
  name               = "app-ec2-role"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF

}

#--------------------------------------------------------------------------------------------------
resource "aws_iam_instance_profile" "app-ec2-role" {
  name = "app-ec2-role"
  role = aws_iam_role.app-ec2-role.name
}

#--------------------------------------------------------------------------------------------------
# service
#--------------------------------------------------------------------------------------------------
resource "aws_iam_role" "elasticbeanstalk-service-role" {
  name               = "elasticbeanstalk-service-role"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "elasticbeanstalk.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF

}

#--------------------------------------------------------------------------------------------------
# policies
#--------------------------------------------------------------------------------------------------
resource "aws_iam_policy_attachment" "app-attach1" {
  name       = "app-attach1"
  roles      = [aws_iam_role.app-ec2-role.name]
  policy_arn = "arn:aws:iam::aws:policy/AWSElasticBeanstalkWebTier"
}

#--------------------------------------------------------------------------------------------------
resource "aws_iam_policy_attachment" "app-attach2" {
  name       = "app-attach2"
  roles      = [aws_iam_role.app-ec2-role.name]
  policy_arn = "arn:aws:iam::aws:policy/AWSElasticBeanstalkMulticontainerDocker"
}

#--------------------------------------------------------------------------------------------------
resource "aws_iam_policy_attachment" "app-attach3" {
  name       = "app-attach3"
  roles      = [aws_iam_role.app-ec2-role.name]
  policy_arn = "arn:aws:iam::aws:policy/AWSElasticBeanstalkWorkerTier"
}

#--------------------------------------------------------------------------------------------------
resource "aws_iam_policy_attachment" "app-attach4" {
  name       = "app-attach4"
  roles      = [aws_iam_role.elasticbeanstalk-service-role.name]
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSElasticBeanstalkEnhancedHealth"
}

#--------------------------------------------------------------------------------------------------
##################################################
# Create an IAM role to allow enhanced monitoring
##################################################
resource "aws_iam_role" "rds_enhanced_monitoring" {
  name_prefix        = "rds-enhanced-monitoring-"
  assume_role_policy = data.aws_iam_policy_document.rds_enhanced_monitoring.json
}

resource "aws_iam_role_policy_attachment" "rds_enhanced_monitoring" {
  role       = aws_iam_role.rds_enhanced_monitoring.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonRDSEnhancedMonitoringRole"
}

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
#--------------------------------------------------------------------------------------------------
##################################################
