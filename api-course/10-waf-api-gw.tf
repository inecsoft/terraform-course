#-----------------------------------------------------------------------------
# resource "aws_wafregional_web_acl_association" "wafregional-web-acl-association" {
#   resource_arn = aws_api_gateway_stage.api-gateway-stage-dev.arn
#   web_acl_id   = aws_wafregional_web_acl.foo.id
# }
#-----------------------------------------------------------------------------
resource "aws_wafv2_web_acl" "wafv2_web_acl" {
  name        = "${local.default_name}-managed-rule-wafv2-web-acl"
  description = "${local.default_name}-managed-rule-wafv2-web-acl to protect api"
  scope       = "REGIONAL"

  default_action {
    allow {}
  }

  rule {
    name     = "rule-1"
    priority = 1

    override_action {
      count {}
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesCommonRuleSet"
        vendor_name = "AWS"

        excluded_rule {
          name = "SizeRestrictions_QUERYSTRING"
        }

        excluded_rule {
          name = "NoUserAgent_HEADER"
        }
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = false
      metric_name                = "friendly-rule-metric-name"
      sampled_requests_enabled   = false
    }
  }

  tags = {
    Tag1 = "Value1"
    Tag2 = "Value2"
  }

  visibility_config {
    cloudwatch_metrics_enabled = false
    metric_name                = "friendly-metric-name"
    sampled_requests_enabled   = false
  }
}