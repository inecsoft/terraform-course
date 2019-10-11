#---------------------------------------------------------------------
resource "aws_route53_zone" "primary" {
  name = "my-example.com"
}

#---------------------------------------------------------------------
resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = "www.my-example.com"
  type    = "CNAME"
  ttl     = "300"
  # TF-UPGRADE-TODO: In Terraform v0.10 and earlier, it was sometimes necessary to
  # force an interpolation expression to be interpreted as a list by wrapping it
  # in an extra set of list brackets. That form was supported for compatibilty in
  # v0.11, but is no longer supported in Terraform v0.12.
  #
  # If the expression in the following list itself returns a list, remove the
  # brackets to avoid interpretation as a list of lists. If the expression
  # returns a single list item then leave it as-is and remove this TODO comment.
  records = [module.elb.this_elb_name]
}

#---------------------------------------------------------------------

