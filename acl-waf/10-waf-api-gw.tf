#-----------------------------------------------------------------------------
# resource "aws_wafv2_web_acl_association" "wafv2-web-acl-association" {
#   resource_arn = aws_api_gateway_stage.api-gateway-stage-dev.arn
#   web_acl_arn  = aws_wafv2_web_acl.wafv2-web-acl.arn
# }
#-----------------------------------------------------------------------------
#terraform import aws_wafv2_web_acl.wafv2-web-acl 4250059d-abb3-4e86-b073-8dd60bebdc0d/name-dev-web-acl-tfgm/REGIONAL
#-----------------------------------------------------------------------------
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


  tags = {
    Name  = "${local.default_name}-managed-rule-wafv2-web-acl"
    Environment = terraform.workspace
  }

}
#-----------------------------------------------------------------------------