#-----------------------------------------------------------------------------------------------------------------------------
resource "aws_cloudwatch_log_group" "cloudwatch-log-group-cloudtrail" {
  name = "${local.default_name}-cloudwatch-log-group-cloudtrail"

  tags = {
    Environment = local.default_name
    Project     = var.project
    Name        = "${local.default_name}-cloudwatch-log-group-cloudtrail"
  }
}
#-----------------------------------------------------------------------------------------------------------------------------
resource "aws_cloudtrail" "cloudtrail" {
  name           = "${local.default_name}-cloudtrail"
  s3_bucket_name = aws_s3_bucket.s3-bucket-cloudtrail.id
  #   s3_bucket_name                = module.aws_cloudtrail_s3_bucket.s3_bucket_id
  #s3_key_prefix                 = "prefix"
  cloud_watch_logs_group_arn    = "${aws_cloudwatch_log_group.cloudwatch-log-group-cloudtrail.arn}:*"
  cloud_watch_logs_role_arn     = aws_iam_role.iam-role-cloudtrail.arn
  enable_logging                = true
  is_multi_region_trail         = true
  include_global_service_events = true
  enable_log_file_validation    = true
  kms_key_id                    = aws_kms_key.kms-key.arn

  tags = {
    Environment = local.default_name
    Project     = var.project
    Name        = "${local.default_name}-cloudtrail"
  }
}
#-----------------------------------------------------------------------------------------------------------------------------
resource "aws_iam_role" "iam-role-cloudtrail" {
  name               = "${local.default_name}-cloudtrail-role"
  path               = "/service-role/"
  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "cloudtrail.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
POLICY
}
#-----------------------------------------------------------------------------------------------------------------------------
resource "aws_iam_policy" "iam-policy-cloudtrail" {
  name        = "${local.default_name}-iam-policy-cloudtrail"
  description = "Access to cloudwatch logs by cloudtrail"
  policy      = data.aws_iam_policy_document.iam-policy-doc-cloudtrail.json
}
#-----------------------------------------------------------------------------------------------------------------------------
data "aws_iam_policy_document" "iam-policy-doc-cloudtrail" {
  statement {
    sid       = "AWSCloudTrailCreateLogStream2014110"
    effect    = "Allow"
    resources = ["arn:aws:logs:${var.AWS_REGION}:${data.aws_caller_identity.current.id}:log-group:${local.default_name}-cloudwatch-log-group-cloudtrail:log-stream:${data.aws_caller_identity.current.id}_CloudTrail_${var.AWS_REGION}*"]
    actions   = ["logs:CreateLogStream"]
  }

  statement {
    sid       = "AWSCloudTrailPutLogEvents20141101"
    effect    = "Allow"
    resources = ["arn:aws:logs:${var.AWS_REGION}:${data.aws_caller_identity.current.id}:log-group:${local.default_name}-cloudwatch-log-group-cloudtrail:log-stream:${data.aws_caller_identity.current.id}_CloudTrail_${var.AWS_REGION}*"]
    actions   = ["logs:PutLogEvents"]
  }
}
#-----------------------------------------------------------------------------------------------------------------------------
resource "aws_iam_role_policy_attachment" "iam-role-policy-attach-cloudtrail" {
  role       = aws_iam_role.iam-role-cloudtrail.name
  policy_arn = aws_iam_policy.iam-policy-cloudtrail.arn
}
#-----------------------------------------------------------------------------------------------------------------------------