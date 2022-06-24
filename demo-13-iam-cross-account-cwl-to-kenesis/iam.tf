#the log data recipient account has an AWS account ID of "prod" 999999999999, while the log data sender AWS account ID is "dev" 111111111111.
resource "aws_kinesis_stream" "kenesis_stream" {
  name             = "terraform-kinesis-test"
  provider = aws.tfgm
  shard_count      = 1
  retention_period = 10

  shard_level_metrics = [
    "IncomingBytes",
    "OutgoingBytes",
  ]

  stream_mode_details {
    stream_mode = "PROVISIONED"
  }

  tags = {
    Name = "kenesis_stream"
  }
}
#############################################################################################
#cat << EOF | iam-policy-json-to-terraform 
resource "aws_iam_role" "role_cross_account_cw_to_kenesis" {
  name = "CWLtoKenesisRole"
  provider = aws.tfgm
  assume_role_policy = data.aws_iam_policy_document.TrustPolicyForCWL_policy_doc.json
}

#Create the IAM role that will grant CloudWatch Logs the permission to put data into your Kinesis stream | Open search
data "aws_iam_policy_document" "TrustPolicyForCWL_policy_doc" {
  provider = aws.tfgm
  statement {
    sid     = ""
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    condition {
      test     = "StringLike"
      variable = "aws:SourceArn"

      values = [
        #"arn:aws:logs:region:sourceAccountId:*",
        #"arn:aws:logs:region:recipientAccountId:*"
        "arn:aws:logs:${var.region}:${data.aws_caller_identity.prod.account_id}:*",
        "arn:aws:logs:${var.region}:${data.aws_caller_identity.log-dev-beenetwork.account_id}:*",
      ]
    }

    principals {
      type        = "Service"
      identifiers = ["logs.region.amazonaws.com"]
    }
  }
}

resource "aws_iam_policy" "PermissionsForCWL_policy" {
  name        = "PermissionsForCWL"
  description = "allows cloud watch log to kenesis"
  #policy      = file("role_permissions_policy.json")
  policy =  data.aws_iam_policy_document.PermissionsForCWL_policy_doc.json

  provider = aws.tfgm

  tags = {
    "Name" = "PermissionsForCWL"
  }
}

data "aws_iam_policy_document" "PermissionsForCWL_policy_doc" {
  provider = aws.tfgm
 
  statement {
    sid       = ""
    effect    = "Allow"
    resources = ["arn:aws:kinesis:${var.region}:${data.aws_caller_identity.prod.account_id}:stream/RecipientStream"]
    actions   = ["kinesis:PutRecord"]
  }
}

resource "aws_iam_policy_attachment" "cw_to_kenesis_policy_attach" {
  name       = "cloudwatch policy to role"
  roles      = [ aws_iam_role.role_cross_account_cw_to_kenesis.name ]
  policy_arn = aws_iam_policy.PermissionsForCWL_policy.arn
  provider   = aws.tfgm
}

resource "aws_cloudwatch_log_destination" "kenesis_log_destination" {
  name       = "kenesis_log_destination"
  role_arn   = aws_iam_role.role_cross_account_cw_to_kenesis.arn
  target_arn = aws_kinesis_stream.kenesis_stream.arn
}

data "aws_iam_policy_document" "cw_destination_policy" {
  statement {
    effect = "Allow"

    principals {
      type = "AWS"

      identifiers = [
        data.aws_caller_identity.log-dev-beenetwork.account_id,
      ]
    }

    actions = [
      "logs:PutSubscriptionFilter",
    ]

    resources = [
      aws_cloudwatch_log_destination.kenesis_log_destination.arn,
    ]
  }
}

resource "aws_cloudwatch_log_destination_policy" "test_destination_policy" {
  destination_name = aws_cloudwatch_log_destination.kenesis_log_destination.name
  access_policy    = data.aws_iam_policy_document.cw_destination_policy.json
}