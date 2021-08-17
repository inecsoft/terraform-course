#-----------------------------------------------------------------------------
# resource "aws_wafv2_web_acl_association" "wafv2-web-acl-association" {
#   resource_arn = aws_api_gateway_stage.api-gateway-stage-dev.arn
#   web_acl_arn  = aws_wafv2_web_acl.wafv2-web-acl.arn
# }
#-----------------------------------------------------------------------------
#terraform import aws_wafv2_web_acl.wafv2-web-acl 4250059d-abb3-4e86-b073-8dd60bebdc0d/name-dev-web-acl-tfgm/REGIONAL
#-----------------------------------------------------------------------------
resource "aws_wafv2_web_acl" "wafv2-web-acl" {
  name        = "${local.default_name}-managed-rule-wafv2-web-acl-ipgroup"
  description = "${local.default_name}-managed-rule-wafv2-web-acl-ipgroup to protect api"
  scope       = "REGIONAL"


  default_action {
    # allow {}
    block {}
  }

  rule {
    name     = "${local.default_name}-managed-rule-wafv2-web-acl-ipgroup"
    priority = 0

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

  rule {
    name     = "${local.default_name}-rule-wafv2-web-acl-ipgroup-GB"
    priority = 1

    action {
      allow {}
    }

    statement {
      geo_match_statement {
        country_codes = ["GB"]
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "${local.default_name}-rule-wafv2-web-acl-ipgroup-GB"
      sampled_requests_enabled   = true
    }
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "${local.default_name}-managed-rule-wafv2-web-acl"
    sampled_requests_enabled   = true
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
