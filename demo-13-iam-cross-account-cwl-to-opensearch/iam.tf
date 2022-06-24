#the log data recipient account has an AWS account ID of "prod" 999999999999, while the log data sender AWS account ID is "dev" 111111111111.

data "aws_iam_policy_document" "assume_role" {
  provider =  aws.log-dev-beenetwork
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::${data.aws_caller_identity.prod.account_id}:root"]
    }
  }
}

data "aws_iam_policy" "OpenSearchServiceFullAccess" {
  provider = aws.log-dev-beenetwork
  name     = "AmazonOpenSearchServiceFullAccess"
}

resource "aws_iam_role" "assume_role" {
  provider            = aws.log-dev-beenetwork
  name                = "assume_role"
  assume_role_policy  = data.aws_iam_policy_document.assume_role.json
  managed_policy_arns = [data.aws_iam_policy.OpenSearchServiceFullAccess.arn]
}

output "cross-account-role-arn" {
  value = aws_iam_role.assume_role.arn
}

#############################################################################################
data "aws_iam_policy_document" "TrustPolicyForCWL_policy_doc" {
  provider = aws.log-dev-beenetwork
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::${data.aws_caller_identity.prod.account_id}:root"]
    }
  }
}

#cat << EOF | iam-policy-json-to-terraform 
resource "aws_iam_role" "role_cross_account_cw_to_es" {
  name = "CWLtoEsRole"
  provider = aws.log-dev-beenetwork
  assume_role_policy = data.aws_iam_policy_document.TrustPolicyForCWL_policy_doc.json
}

#Create the IAM role that will grant CloudWatch Logs the permission to put data into your Kinesis stream | Open search


resource "aws_iam_policy" "PermissionsForCWL_policy" {
  name        = "PermissionsForCWL"
  description = "allows cloud watch log to es"
  #policy      = file("role_permissions_policy.json")
  policy =  data.aws_iam_policy_document.PermissionsForCWL_policy_doc.json

  provider = aws.log-dev-beenetwork

  tags = {
    "Name" = "PermissionsForCWL"
  }
}

data "aws_iam_policy_document" "PermissionsForCWL_policy_doc" {
  provider = aws.log-dev-beenetwork
 
  statement {
    sid       = ""
    effect    = "Allow"
    resources = ["arn:aws:logs:${var.region}:${data.aws_caller_identity.log-dev-beenetwork.account_id}:log-group:*"]
    actions   = [
      "logs:PutLogEvents",
      "logs:PutSubscriptionFilter"
    ]
  }
}

resource "aws_iam_policy_attachment" "cw_policy_attach" {
  name       = "cloudwatch-policy-role-attach"
  roles      = [ aws_iam_role.role_cross_account_cw_to_es.name ]
  policy_arn = aws_iam_policy.PermissionsForCWL_policy.arn 
  provider   = aws.log-dev-beenetwork
}

resource "aws_iam_policy_attachment" "es_policy_attach" {
  name       = "es-policy-role-attach"
  roles      = [ aws_iam_role.role_cross_account_cw_to_es.name ]
  policy_arn = data.aws_iam_policy.OpenSearchServiceFullAccess.arn 
  provider   = aws.log-dev-beenetwork
}

resource "aws_cloudwatch_log_subscription_filter" "test_lambdafunction_logfilter" {
  name            = "test_lambdafunction_logfilter"
  provider        = aws.tfgm
  role_arn        = aws_iam_role.role_cross_account_cw_to_es.arn
  log_group_name  = "/aws/lambda/example_lambda_name"
  filter_pattern  = "logtype test"
  destination_arn = aws_kinesis_stream.test_logstream.arn
  #Valid values are "Random" for es only and "ByLogStream". 
  distribution    = "Random"
}


output "role_cross_account_cw_to_es_arn" {
  value = aws_iam_role.role_cross_account_cw_to_es.arn
}