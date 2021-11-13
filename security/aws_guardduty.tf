#Guard duty

resource "aws_guardduty_detector" "guardduty_detector_aws_guardduty" {
  enable = true

  tags = {
    Environment = local.default_name
    Project     = var.project
    Name        = "${local.default_name}-aws-guardduty"
  }
}


data "aws_iam_policy_document" "guardduty_kms_pol" {

  statement {
    sid = "Allow GuardDuty to encrypt findings"
    actions = [
      "kms:GenerateDataKey"
    ]
    resources = [
      "arn:aws:kms:${var.AWS_REGION}:${data.aws_caller_identity.current.id}:key/*"
    ]
    principals {
      type        = "Service"
      identifiers = ["guardduty.amazonaws.com"]
    }
  }

  statement {
    sid = "Allow all users to modify/delete key (test only)"
    actions = [
      "kms:*"
    ]
    resources = [
      "arn:aws:kms:${var.AWS_REGION}:${data.aws_caller_identity.current.id}:key/*"
    ]
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::${data.aws_caller_identity.current.id}:root"]
    }
  }
}

resource "aws_kms_key" "kms_key_aws_guardduty_key" {
  description             = "Temporary key for AccTest of TF"
  enable_key_rotation     = true
  deletion_window_in_days = 7
  policy                  = data.aws_iam_policy_document.guardduty_kms_pol.json

  tags = {
    Environment = local.default_name
    Project     = var.project
    Name        = "${local.default_name}-aws-guardduty"
  }
}

resource "aws_guardduty_publishing_destination" "guardduty_publishing_destination_aws_guardduty" {
  detector_id     = aws_guardduty_detector.guardduty_detector_aws_guardduty.id
  destination_arn = module.aws_guardduty_s3_bucket.s3_bucket_arn
  kms_key_arn     = aws_kms_key.kms_key_aws_guardduty_key.arn

  depends_on = [
    module.aws_guardduty_s3_bucket.aws_guardduty_bucket_policy,
  ]
}
