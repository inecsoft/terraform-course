
#terraform import aws_wafv2_web_acl.wafv2webacl 4250059dabb34e86b0738dd60bebdc0d/namedevwebacltfgm/CLOUDFRONT
#
resource "aws_wafv2_web_acl" "wafv2webacl" {
  name        = "managedrulewafv2webacl"
  description = "managedrulewafv2webacl to protect api"
  scope       = "CLOUDFRONT"
  provider                = aws.cloudfront


  default_action {
    # allow {}
    block {}
  }

  rule {
    name     = "AWSAWSManagedRulesBotControlRuleSet"
    priority = 4

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
      metric_name                = "AWSAWSManagedRulesBotControlRuleSet"
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = "AWSAWSManagedRulesAmazonIpReputationList"
    priority = 0

    override_action {
        none {}
      }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesAmazonIpReputationList"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "AWSAWSManagedRulesAmazonIpReputationList"
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = "AWSAWSManagedRulesCommonRuleSet"
    priority = 1

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
      metric_name                = "AWSAWSManagedRulesCommonRuleSet"
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = "AWSAWSManagedRulesKnownBadInputsRuleSet"
    priority = 2

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
      metric_name                = "AWSAWSManagedRulesKnownBadInputsRuleSet"
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = "AWSAWSManagedRulesSQLiRuleSet"
    priority = 5

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
      metric_name                = "AWSAWSManagedRulesSQLiRuleSet"
      sampled_requests_enabled   = true
    }
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "managedrulewafv2webacl"
    sampled_requests_enabled   = true
  }


  tags = {
    Name        = "managedrulewafv2webacl"
  }

}
#