#the log data recipient account has an AWS account ID of "prod" 999999999999, while the log data sender AWS account ID is "dev" 111111111111.
resource "aws_iam_role" "lambda-role-toinvoke-elastisearch" {
  provider           = aws.tfgm
  name               = "lambda-role-toinvoke-elastisearch"
  path               = "/"
  assume_role_policy = data.aws_iam_policy_document.iam_policy_doc_lambda-role-toinvoke-elastisearch.json
  managed_policy_arns   = [ aws_iam_policy.iam_policy_lambdatoinvokeelastisearch_assume-cross-account-role-elasticsearch.arn]
  
  tags                  = {
    Name = "lambda-role-toinvoke-elastisearch"
  }
}

data "aws_iam_policy_document" "iam_policy_doc_lambda-role-toinvoke-elastisearch" {
  provider        = aws.tfgm
  statement {
    sid     = ""
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

/* resource "aws_iam_policy_attachment" "iam_policy_attach_lambdatoinvokeelastisearch_assume-cross-account-role-elasticsearch" {
  name       = "iam_policy_attach_lambdatoinvokeelastisearch_assume-cross-account-role-elasticsearch"
  roles      = [ aws_iam_role.lambda-role-toinvoke-elastisearch.name ]
  policy_arn = aws_iam_policy.iam_policy_lambdatoinvokeelastisearch_assume-cross-account-role-elasticsearch.arn 
  provider        = aws.tfgm
} */

resource "aws_iam_policy" "iam_policy_lambdatoinvokeelastisearch_assume-cross-account-role-elasticsearch" {
  name        = "iam_policy_lambdatoinvokeelastisearch_assume-cross-account-role-elasticsearch"
  description = "allows lambda to invoke  es in another account"
  policy =    data.aws_iam_policy_document.iam_policy_doc_lambdatoinvokeelastisearch_assume-cross-account-role-elasticsearch.json

  provider        = aws.tfgm

  tags = {
    "Name" = "iam_policy_lambdatoinvokeelastisearch_assume-cross-account-role-elasticsearch"
  }
}

data "aws_iam_policy_document" "iam_policy_doc_lambdatoinvokeelastisearch_assume-cross-account-role-elasticsearch" {
  provider        = aws.tfgm
  statement {
    sid       = ""
    effect    = "Allow"
    resources = [ aws_iam_role.role_cross_account_lambda_to_es.arn ]
    actions   = ["sts:AssumeRole"]
  }
}
###########################################


data "aws_iam_policy" "iam_policy_OpenSearchServiceFullAccess" {
  provider = aws.log-dev-beenetwork
  name     = "AmazonOpenSearchServiceFullAccess"
}

data "aws_iam_policy" "iam_policy_AWSLambdaVPCAccessExecutionRole" {
  provider = aws.log-dev-beenetwork
  name     = "AWSLambdaVPCAccessExecutionRole"
}

data "aws_iam_policy_document" "TrustPolicyForlambdatoelasticsearchL_policy_doc" {
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
resource "aws_iam_role" "role_cross_account_lambda_to_es" {
  name = "role_cross_account_lambda_to_es"
  provider = aws.log-dev-beenetwork
  assume_role_policy = data.aws_iam_policy_document.TrustPolicyForlambdatoelasticsearchL_policy_doc.json
  tags                  = {
    Name = "role_cross_account_lambda_to_es"
  }
}

#Create the IAM role that will grant CloudWatch Logs the permission to put data into your Kinesis stream | Open search


resource "aws_iam_policy_attachment" "es_policy_attach" {
  name       = "es-policy-role-attach"
  roles      = [ aws_iam_role.role_cross_account_lambda_to_es.name ]
  policy_arn = data.aws_iam_policy.iam_policy_OpenSearchServiceFullAccess.arn 
  provider   = aws.log-dev-beenetwork
}

resource "aws_iam_policy_attachment" "lambda_policy_attach" {
  name       = "lambda-policy-role-attach"
  roles      = [ aws_iam_role.role_cross_account_lambda_to_es.name ]
  policy_arn = data.aws_iam_policy.iam_policy_AWSLambdaVPCAccessExecutionRole.arn 
  provider   = aws.log-dev-beenetwork
}

output "role_cross_account_lambda_to_es_arn" {
  value = aws_iam_role.role_cross_account_lambda_to_es.arn
} 