#-----------------------------------------------------------------------------
# resource "aws_wafregional_web_acl_association" "wafregional-web-acl-association" {
#   resource_arn = aws_api_gateway_stage.api-gateway-stage-dev.arn
#   web_acl_id   = aws_wafregional_web_acl.foo.id
# }
#-----------------------------------------------------------------------------