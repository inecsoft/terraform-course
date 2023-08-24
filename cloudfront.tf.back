locals {
  s3_origin_id = "calabs-s3cf-ivan"
}

#terraform import aws_cloudfront_origin_access_control.cloudfront_origin_access_control ES8OBUDB71KYB
resource "aws_cloudfront_origin_access_control" "cloudfront_origin_access_control" {
  name                              = aws_s3_bucket.s3_bucket_cdn.bucket_regional_domain_name
  description                       = "testing s3 cloudfron origin access"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

/* terraform import aws_cloudfront_distribution.s3_distribution E20YD09V8BYCFP	 */
resource "aws_cloudfront_distribution" "s3_distribution" {
  depends_on = [ aws_s3_bucket.s3_bucket_cdn ]
  origin {
    domain_name = aws_s3_bucket.s3_bucket_cdn.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.s3_bucket_cdn.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.cloudfront_origin_access_control.id

    /*
	s3_origin_config {
	  origin_access_identity = "origin-access-identity/cloudfront/ABCDEFG1234567"
	} */
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "serving s3 bucket resources"
  default_root_object = "/gallery/index.html"

  /* logging_config {
	include_cookies = false
	bucket          = "mylogs.s3.amazonaws.com"
	prefix          = "myprefix"
  }

  aliases = ["mysite.example.com", "yoursite.example.com"] */

  default_cache_behavior {
    #allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    allowed_methods  = [ "GET", "HEAD" ]
    cached_methods   = ["GET", "HEAD"]
    cache_policy_id = aws_cloudfront_cache_policy.cloudfront_cache_policy.id
    target_origin_id = aws_s3_bucket.s3_bucket_cdn.bucket_regional_domain_name

    /* forwarded_values {
      query_string = false

      cookies {
      forward = "none"
      }
    } */

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 0 #3600
    max_ttl                = 0 #86400
    compress               = true
  }


  price_class = "PriceClass_100"
  http_version = "http2and3"

  restrictions {
    geo_restriction {
      restriction_type = "none"
      #locations        = ["US", "CA", "GB", "DE"]
    }
  }


  viewer_certificate {
    cloudfront_default_certificate = true
    minimum_protocol_version       = "TLSv1" # "TLSv1.2_2021"
  }
}

#aws cloudfront list-cache-policies --profile ivan-arteaga-dev
#terraform import aws_cloudfront_cache_policy.cloudfront_cache_policy 658327ea-f89d-4fab-a63d-7e88639e58f6
resource "aws_cloudfront_cache_policy" "cloudfront_cache_policy" {
  name        = "custom-Managed-CachingOptimized"
  comment     = "Policy with caching enabled. Supports Gzip and Brotli compression."
  default_ttl = 86400
  max_ttl     = 31536000
  min_ttl     = 1
  parameters_in_cache_key_and_forwarded_to_origin {
	enable_accept_encoding_brotli = true
	enable_accept_encoding_gzip   = true
    cookies_config {
      cookie_behavior = "none"
      /* cookies {
        items = ["example"]
      } */
    }
    headers_config {
      header_behavior = "none"
      /* headers {
        items = ["example"]
      } */
    }
    query_strings_config {
      query_string_behavior = "none"
      /* query_strings {
        items = ["example"]
      } */
    }
  }
}