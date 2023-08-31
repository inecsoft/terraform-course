#-----------------------------------------------------------------------------
# resource "aws_wafv2_web_acl_association" "wafv2-web-acl-association" {
#   resource_arn = aws_api_gateway_stage.api-gateway-stage-dev.arn
#   web_acl_arn  = aws_wafv2_web_acl.wafv2-web-acl.arn
# }
#-----------------------------------------------------------------------------
#terraform import aws_wafv2_web_acl.wafv2-web-acl 4250059d-abb3-4e86-b073-8dd60bebdc0d/name-dev-web-acl-tfgm/REGIONAL

resource "aws_wafv2_web_acl" "wafv2-web-acl" {
  name        = "${local.default_name}-managed-rule-wafv2-web-acl"
  description = "${local.default_name}-managed-rule-wafv2-web-acl to protect api"
  scope       = "REGIONAL"


  default_action {
    # allow {}
    block {}
  }

  rule {
    name     = "AWS-AWSManagedRulesBotControlRuleSet"
    priority = 0

    override_action {

      none {}
    }

    statement {

      managed_rule_group_statement {
        name        = "AWSManagedRulesBotControlRuleSet"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "AWS-AWSManagedRulesBotControlRuleSet"
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = "AWS-AWSManagedRulesCommonRuleSet"
    priority = 2

    override_action {

      none {}
    }

    statement {

      managed_rule_group_statement {
        name        = "AWSManagedRulesCommonRuleSet"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "AWS-AWSManagedRulesCommonRuleSet"
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = "AWS-AWSManagedRulesKnownBadInputsRuleSet"
    priority = 3

    override_action {

      none {}
    }

    statement {

      managed_rule_group_statement {
        name        = "AWSManagedRulesKnownBadInputsRuleSet"
        vendor_name = "AWS"
      }
      
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "AWS-AWSManagedRulesKnownBadInputsRuleSet"
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = "AWS-AWSManagedRulesSQLiRuleSet"
    priority = 1

    override_action {

      none {}
    }

    statement {

      managed_rule_group_statement {
        name        = "AWSManagedRulesSQLiRuleSet"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "AWS-AWSManagedRulesSQLiRuleSet"
      sampled_requests_enabled   = true
    }
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "${local.default_name}-managed-rule-wafv2-web-acl"
    sampled_requests_enabled   = true
  }

  rule {
    name     = "${local.default_name}-managed-rule-wafv2-web-acl-ipgroup"
    priority = 4

    action {
      allow {}
    }

    statement {
      ip_set_reference_statement {
        arn = aws_wafv2_ip_set.wafv2-ip-set.arn
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "${local.default_name}-managed-rule-wafv2-web-acl-ipgroup"
      sampled_requests_enabled   = true
    }
  }


  tags = {
    Name        = "${local.default_name}-managed-rule-wafv2-web-acl"
    Environment = terraform.workspace
  }

}
#-----------------------------------------------------------------------------

resource "aws_wafv2_ip_set" "wafv2-ip-set" {
  name               = "${local.default_name}-wafv2IpSet-for-wafv2-web-acl"
  description        = "${local.default_name}-wafv2IpSet-for-wafv2-web-acl allow web access"
  scope              = "REGIONAL"
  ip_address_version = "IPV4"
  addresses          = ["1.2.3.4/32", "5.6.7.8/32"]

  tags = {
    Name        = "${local.default_name}-wafv2IpSet-for-wafv2-web-acl"
    Environment = terraform.workspace
  }
}

#-----------------------------------------------------------------------------

resource "aws_cloudwatch_log_group" "cloudwatch_log_group" {
  name = "aws-waf-logs-${local.default_name}"
}

resource "aws_wafv2_web_acl_logging_configuration" "wafv2_web_acl_logging_configuration" {
  depends_on = [ aws_cloudwatch_log_group.cloudwatch_log_group ]
  log_destination_configs = [aws_cloudwatch_log_group.cloudwatch_log_group.arn]
  resource_arn            = aws_wafv2_web_acl.wafv2-web-acl.arn
}

resource "aws_cloudwatch_log_resource_policy" "cloudwatch_log_resource_poli" {
  policy_document = data.aws_iam_policy_document.cloudwatch_log_group_poli.json
  policy_name     = "${local.default_name}-webacl-policy"
}

data "aws_iam_policy_document" "cloudwatch_log_group_poli" {
  version = "2012-10-17"
  statement {
    effect = "Allow"
    principals {
      identifiers = ["delivery.logs.amazonaws.com"]
      type        = "Service"
    }
    actions   = ["logs:CreateLogStream", "logs:PutLogEvents"]
    resources = ["${aws_cloudwatch_log_group.cloudwatch_log_group.arn}:*"]
    condition {
      test     = "ArnLike"
      values   = ["arn:aws:logs:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:*"]
      variable = "aws:SourceArn"
    }
    condition {
      test     = "StringEquals"
      values   = [tostring(data.aws_caller_identity.current.account_id)]
      variable = "aws:SourceAccount"
    }
  }
}