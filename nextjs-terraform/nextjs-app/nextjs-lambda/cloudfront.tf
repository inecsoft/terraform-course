#CloudFront
#CloudFront distribution is created with the S3 bucket as the source.
#Managed policies and other essential configurations are defined.
#Origin Access Control (OAC) is used to access the S3 bucket content.

resource "aws_cloudfront_origin_access_control" "s3_bucket_oac" {
  name                              = "${var.CDN_URL}_oac"
  description                       = "OAC policy for ${var.CDN_URL}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

data "aws_cloudfront_cache_policy" "CachingOptimized" {
  name = "Managed-CachingOptimized"
}

data "aws_cloudfront_response_headers_policy" "CORS_With_Preflight" {
  name = "Managed-CORS-With-Preflight"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name              = aws_s3_bucket.cdn_bucket.bucket_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.s3_bucket_oac.id
    origin_id                = var.CDN_URL
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "cloudfront-nextjs-cdn"
  http_version        = "http2and3"
  price_class         = "PriceClass_All"
  wait_for_deployment = false

  #aliases = [var.CDN_URL]

  /* web_acl_id =  */

  depends_on = [aws_acm_certificate.acm-certificate-us]
  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.acm-certificate-us.arn
    minimum_protocol_version = "TLSv1.2_2021"
    #cloudfront_default_certificate = true
    ssl_support_method = "sni-only"
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = var.CDN_URL
    cache_policy_id  = data.aws_cloudfront_cache_policy.CachingOptimized.id

    viewer_protocol_policy     = "redirect-to-https"
    response_headers_policy_id = data.aws_cloudfront_response_headers_policy.CORS_With_Preflight.id
    compress                   = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

  logging_config {
    include_cookies = false
    bucket          = aws_s3_bucket.logging_bucket.bucket_domain_name
    prefix          = "cloudfront-access-logs"
  }
}

output "cloudfront_domain_name_url" {
  description = "cloudfront_domain_name"
  value       = aws_cloudfront_distribution.s3_distribution.domain_name
}
