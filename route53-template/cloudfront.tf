module "cloudfront_s3_distrubution" {
  source   = "./cloudfront"
  for_each = var.cloudfront_records
  
  aliases               = lookup(each.value, "aliases", "")
  domain                = lookup(each.value, "domain", "")
  #acm_certificate_arn   = lookup(viewer_certificate.value, "aws_acm_certificate_arn", "")
  tag                   = lookup(each.value, "tag", "")


  viewer_certificate    = lookup(each.value, "viewer_certificate", "")
  /* viewer_certificate = {
    #acm_certificate_arn      = lookup(each.value, "aws_acm_certificate_arn", null)
    minimum_protocol_version = lookup(each.value, "minimum_protocol_version", "TLSv1.2_2021")
    ssl_support_method       = "sni-only"
  } */

}