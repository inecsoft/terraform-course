#CloudFront
#CloudFront distribution is created with the S3 bucket as the source.
#Managed policies and other essential configurations are defined.
#Origin Access Control (OAC) is used to access the S3 bucket content.

resource "aws_cloudfront_origin_access_control" "s3_bucket_oac" {
  name                              = "${var.s3_bucket_cdn_name}"
  description                       = "OAC policy for ${var.s3_bucket_cdn_name}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

data "aws_cloudfront_cache_policy" "CachingOptimized" {
  name = "Managed-CachingOptimized"
}

data "aws_cloudfront_cache_policy" "CachingDisabled" {
  name = "Managed-CachingDisabled"
}

data "aws_cloudfront_response_headers_policy" "CORS_With_Preflight" {
  name = "Managed-CORS-With-Preflight"
}

# terraform import aws_cloudfront_distribution.distribution E74FTE3EXAMPLE
resource "aws_cloudfront_distribution" "s3_distribution" {
  provider                  = aws.cloudfront
  origin {
    domain_name              = aws_s3_bucket.s3_bucket_cdn.bucket_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.s3_bucket_oac.id
    origin_id                = "nextjsS3Origin"
    connection_attempts      = 3
    connection_timeout       = 10
  }

  # origin {
  #   connection_attempts = 3
  #   connection_timeout  = 10
  #   domain_name         = "nextjsbuckettesttfgm.s3.eu-west-1.amazonaws.com"
  #   origin_id           = "nextS3Origin"

  #   s3_origin_config {
  #     origin_access_identity = "origin-access-identity/cloudfront/EYB2CSASXE7RI"
  #   }
  # }

  #aws_apigatewayv2_domain_name.api_gw_domain.domain_name_configuration[0].target_domain_name

  origin {
    connection_attempts = 3
    connection_timeout  = 10
    domain_name         = "${aws_api_gateway_rest_api.rest-api-proxy.root_resource_id}.execute-api.eu-west-1.amazonaws.com"
    origin_id           = "nextjsAPIGatewayOrigin"
    origin_path         = "/Prod"

    custom_origin_config {
      http_port                = 80
      https_port               = 443
      origin_keepalive_timeout = 5
      origin_protocol_policy   = "https-only"
      origin_read_timeout      = 30
      origin_ssl_protocols     = [
        "SSLv3",
        "TLSv1",
        "TLSv1.1",
        "TLSv1.2",
      ]
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Next.js Distribution"
  http_version        = "http2" #"http2and3"
  price_class         = "PriceClass_100"
  wait_for_deployment = false

  # aliases = [
  #   var.DOMAIN_NAME,
  #   "api-${var.DOMAIN_NAME}",
  #   "www.${var.DOMAIN_NAME}"
  # ]

  web_acl_id = aws_wafv2_web_acl.wafv2webacl.arn

  depends_on = [aws_acm_certificate.acm-certificate-us]

  viewer_certificate {
    acm_certificate_arn            = aws_acm_certificate.acm-certificate-us.arn
    #cloudfront_default_certificate = true
    minimum_protocol_version       = "TLSv1"
    ssl_support_method             = "sni-only"
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS", "DELETE", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "nextjsAPIGatewayOrigin"
    cache_policy_id  = data.aws_cloudfront_cache_policy.CachingDisabled.id

    viewer_protocol_policy     = "redirect-to-https"
    response_headers_policy_id = data.aws_cloudfront_response_headers_policy.CORS_With_Preflight.id
    compress                   = true
  }

  ordered_cache_behavior {
    allowed_methods        = [
        "GET",
        "HEAD",
      ]
    cache_policy_id        = data.aws_cloudfront_cache_policy.CachingOptimized.id
    cached_methods         = [
        "GET",
        "HEAD",
      ]
    compress               = true
    default_ttl            = 0
    max_ttl                = 0
    min_ttl                = 0
    path_pattern           = "/_next/static/*"
    smooth_streaming       = false
    target_origin_id       = "nextjsS3Origin"
    trusted_key_groups     = []
    trusted_signers        = []
    viewer_protocol_policy = "https-only"
  }

  ordered_cache_behavior {
    allowed_methods        = [
        "GET",
        "HEAD",
      ]
    cache_policy_id        = data.aws_cloudfront_cache_policy.CachingOptimized.id
    cached_methods         = [
        "GET",
        "HEAD",
      ]
    compress               = true
    default_ttl            = 0
    max_ttl                = 0
    min_ttl                = 0
    path_pattern           = "/static/*"
    smooth_streaming       = false
    target_origin_id       = "nextjsS3Origin"
    trusted_key_groups     = []
    trusted_signers        = []
    viewer_protocol_policy = "https-only"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

  logging_config {
    include_cookies = false
    bucket          = aws_s3_bucket.s3_bucket_cdn_logs.bucket_domain_name
    prefix          = "cloudfront-access-logs"
  }
}

output "cloudfront_domain_name_url" {
  description = "cloudfront_domain_name"
  value       = aws_cloudfront_distribution.s3_distribution.domain_name
}
