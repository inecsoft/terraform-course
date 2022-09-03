
#terraform import aws_cloudfront_distribution.s3_distribution E1LQ1W5MWC5J60
resource "aws_cloudfront_distribution" "s3_distribution" {
  aliases                        = var.aliases
  
  enabled                        = true

  http_version                   = "http2"
  
  is_ipv6_enabled                = true
  price_class                    = "PriceClass_100"
  retain_on_delete               = false



  wait_for_deployment            = true

  default_cache_behavior {
    allowed_methods        = [
      "GET",
      "HEAD",
    ]
    #cache_policy_id        = "658327ea-f89d-4fab-a63d-7e88639e58f6"
    cached_methods         = [
      "GET",
      "HEAD",
    ]
    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    compress               = true
    default_ttl            = 0
    max_ttl                = 0
    min_ttl                = 0
    smooth_streaming       = false
    target_origin_id       = var.domain
    trusted_key_groups     = []
    trusted_signers        = []
    viewer_protocol_policy = "redirect-to-https"
  }

  origin {
    connection_attempts = 3
    connection_timeout  = 10
    domain_name         = "${var.domain}.s3-website-eu-west-1.amazonaws.com"
    origin_id           = var.domain
    origin_path         = var.origin_path

    custom_origin_config {
      http_port                = 80
      https_port               = 443
      origin_keepalive_timeout = 5
      origin_protocol_policy   = "http-only"
      origin_read_timeout      = 30
      origin_ssl_protocols     = [
        "TLSv1",
        "TLSv1.1",
        "TLSv1.2",
      ]
    }
  }

  restrictions {
    geo_restriction {
      locations        = []
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn             = lookup(var.viewer_certificate, "acm_certificate_arn", null)
    #acm_certificate_arn             = var.acm_certificate_arn
    #acm_certificate_arn            = aws_acm_certificate.acm-certificate.arn
    #acm_certificate_arn            = "arn:aws:acm:us-east-1:050124427385:certificate/13a89d00-d5bf-4f0a-91c8-31c3b3861135"
    cloudfront_default_certificate = false
    minimum_protocol_version       = lookup(var.viewer_certificate, "minimum_protocol_version", "TLSv1")
    ssl_support_method             = "sni-only"
  }

  tags = {
    Name = var.tag
  }
}

# #-----------------------------------------------------------------------------

data "aws_route53_zone" "selected" {
  name      = "${var.domain}"
}
resource "aws_route53_record" "route53_cloudfront" {
  #Hosted zone ID
  #zone_id = "Z032651526HZEQMSJ78MF"
  zone_id = data.aws_route53_zone.selected.zone_id
  allow_overwrite = true
  name    = "${var.domain}"
  type    = "A"

  alias {
    #name    = "d235vyhutff0z3.cloudfront.net"
    name    = aws_cloudfront_distribution.s3_distribution.domain_name
    #zone_id = "Z2FDTNDATAQYW2"
    zone_id = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }

}
