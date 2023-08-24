locals {
  s3_origin_id = "s3Origin"
  api_origin_id = "apigatewayOrigin"
}

resource "aws_cloudfront_origin_access_identity" "cloudfront_origin_access_identity" {
  comment = "Some comment"
}

/* terraform import aws_cloudfront_distribution.s3_distribution E20YD09V8BYCFP	 */
resource "aws_cloudfront_distribution" "s3_distribution" {
    depends_on = [ aws_s3_bucket.s3_bucket_cdn ]

    origin {
        connection_attempts      = 3  
        connection_timeout       = 10  
        domain_name = aws_s3_bucket.s3_bucket_cdn.bucket_regional_domain_name
        origin_id   = aws_s3_bucket.s3_bucket_cdn.bucket_regional_domain_name
        origin_access_control_id = aws_cloudfront_origin_access_control.cloudfront_origin_access_control.id
    }

    origin {
        connection_attempts = 3  
        connection_timeout  = 10  
        domain_name         = "${aws_api_gateway_rest_api.simple_api.id}.execute-api.${data.aws_region.current.name}.amazonaws.com" 
        origin_id           = local.api_origin_id  

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
    comment             = "serving s3 bucket resources"
    default_root_object = "index.html"

    logging_config {
        include_cookies = false
        bucket          = aws_s3_bucket.logging_bucket.bucket_domain_name
        prefix          = "cloudfront-access-logs"
    }

    /* aliases = ["mysite.example.com", "yoursite.example.com"] */

    default_cache_behavior {
        #allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
        allowed_methods  = [ "GET", "HEAD", "OPTIONS" ]
        cached_methods   = ["GET", "HEAD"]
        cache_policy_id = data.aws_cloudfront_cache_policy.cloudfront_cache_policy_s3.id
        #cache_policy_id = aws_cloudfront_cache_policy.cloudfront_cache_policy.id
        target_origin_id = aws_s3_bucket.s3_bucket_cdn.bucket_regional_domain_name

        /* forwarded_values {
        query_string = false

        cookies {
        forward = "none"
        }
        } */

        viewer_protocol_policy = "redirect-to-https"
        min_ttl                = 0
        default_ttl            = 0 #3600
        max_ttl                = 0 #86400
        compress               = false
        origin_request_policy_id   = data.aws_cloudfront_origin_request_policy.cloudfront_origin_request_policy_s3.id
        response_headers_policy_id = data.aws_cloudfront_response_headers_policy.cloudfront_response_headers_policy.id
    }

    # Cache behavior with precedence 0
    ordered_cache_behavior {
        path_pattern     = "v1/hello"
        allowed_methods  = ["GET", "HEAD", "OPTIONS"]
        cached_methods   = ["GET", "HEAD"]
        target_origin_id = "apigatewayOrigin"

        /* forwarded_values {
            query_string = false
            headers      = ["Origin"]

            cookies {
                forward = "none"
            }
        } */

        viewer_protocol_policy = "redirect-to-https"
        min_ttl                = 0
        default_ttl            = 0 #3600
        max_ttl                = 0 #86400
        compress               = false
        origin_request_policy_id   = data.aws_cloudfront_origin_request_policy.cloudfront_origin_request_policy_api.id
        response_headers_policy_id = data.aws_cloudfront_response_headers_policy.cloudfront_response_headers_policy.id
        cache_policy_id            = data.aws_cloudfront_cache_policy.cloudfront_cache_policy_api.id
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
        minimum_protocol_version       = "TLSv1"  #"TLSv1.2_2021"
    }
}


#terraform import aws_cloudfront_origin_access_control.cloudfront_origin_access_control ES8OBUDB71KYB
resource "aws_cloudfront_origin_access_control" "cloudfront_origin_access_control" {
  name                              = aws_s3_bucket.s3_bucket_cdn.bucket_regional_domain_name
  description = "Default Origin Access Control"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

data "aws_cloudfront_response_headers_policy" "cloudfront_response_headers_policy" {
  name = "Managed-SecurityHeadersPolicy"
}

data "aws_cloudfront_origin_request_policy" "cloudfront_origin_request_policy_api" {
  name = "Managed-AllViewerExceptHostHeader" #b689b0a8-53d0-40ab-baf2-68738e2966ac
}

data "aws_cloudfront_origin_request_policy" "cloudfront_origin_request_policy_s3" {
  name = "Managed-CORS-S3Origin" #88a5eaf4-2fd4-4709-b370-b4c650ea3fcf
}

data "aws_cloudfront_cache_policy" "cloudfront_cache_policy_s3" {
  name = "Managed-CachingOptimized" #658327ea-f89d-4fab-a63d-7e88639e58f6
}

data "aws_cloudfront_cache_policy" "cloudfront_cache_policy_api" {
  name = "Managed-CachingDisabled" #"4135ea2d-6df8-44a3-9df3-4b5a84be39ad"
}

output "cf_distribution_url" {
  value = aws_cloudfront_distribution.s3_distribution.domain_name
}