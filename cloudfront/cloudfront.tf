resource "aws_cloudfront_distribution" "s3_distribution" {
    aliases                        = [
        "mygetmethere.tv",
        "www.mygetmethere.tv",
    ]
    
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
        cache_policy_id        = "658327ea-f89d-4fab-a63d-7e88639e58f6"
        cached_methods         = [
            "GET",
            "HEAD",
        ]
        compress               = true
        default_ttl            = 0
        max_ttl                = 0
        min_ttl                = 0
        smooth_streaming       = false
        target_origin_id       = "mygetmethere.tv"
        trusted_key_groups     = []
        trusted_signers        = []
        viewer_protocol_policy = "redirect-to-https"
    }

    origin {
        connection_attempts = 3
        connection_timeout  = 10
        domain_name         = "mygetmethere.tv.s3-website-eu-west-1.amazonaws.com"
        origin_id           = "mygetmethere.tv"

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
        acm_certificate_arn            = "arn:aws:acm:us-east-1:050124427385:certificate/16049186-d49f-4bde-b746-c4059a6d7422"
        cloudfront_default_certificate = false
        minimum_protocol_version       = "TLSv1.2_2021"
        ssl_support_method             = "sni-only"
    }

    tags                           = {
        Name = "mygetmethere.tv"
    }

}

/* #terraform import -var 'AWS_REGION=us-east-1' aws_s3_bucket.react-tfgm-web react-tfgm-web
resource "aws_s3_bucket" "react-tfgm-web" {
    bucket = "${local.default_name}-react-tfgm-web"
    acl    = "private"
    policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity E1DVOTC47HZ2FP"
      },
      "Action": [
        "s3:GetObject*",
        "s3:GetBucket*",
        "s3:List*"
      ],
      "Resource": [
        "arn:aws:s3:::react-tfgm-web",
        "arn:aws:s3:::react-tfgm-web/*"
      ]
    },
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity E1DVOTC47HZ2FP"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::react-tfgm-web/*"
    }
  ]
}
POLICY

    versioning {
        enabled    = false
        mfa_delete = false
    }

    website {
        index_document = "index.html"
        error_document = "error.html"
    }

    tags = {
        Name = "${local.default_name}-react-tfgm-web"
    }
}

#terraform import aws_cloudfront_distribution.s3_distribution E1LQ1W5MWC5J60
##################################
# aws_cloudfront_distribution.s3_distribution:
resource "aws_cloudfront_distribution" "s3_distribution" {
    aliases                        = []
    # arn                            = "arn:aws:cloudfront::488759774969:distribution/E1LQ1W5MWC5J60"
    # caller_reference               = "5ec1f122-a256-fa89-f101-650e2795a4af"
    
    # domain_name                    = "d3hufwgsoc7whv.cloudfront.net"
    
    # etag                           = "EPF8DG2TA9MMV"
    # hosted_zone_id                 = "Z2FDTNDATAQYW2"
    # http_version                   = "http2"
    # id                             = "E1LQ1W5MWC5J60"
    # in_progress_validation_batches = 0

    enabled                        = true
    is_ipv6_enabled                = true
    default_root_object            = "index.html"
    price_class                    = "PriceClass_100"

    # last_modified_time             = "2021-11-15 15:03:48.945 +0000 UTC"
    # retain_on_delete               = false
    # status                         = "Deployed"
    
    tags_all                       = {}

    # trusted_key_groups             = [
    #     {
    #         enabled = false
    #         items   = []
    #     },
    # ]
    # trusted_signers                = [
    #     {
    #         enabled = false
    #         items   = []
    #     },
    # ]
    wait_for_deployment            = true

    default_cache_behavior {
        allowed_methods        = [
            "GET",
            "HEAD",
        ]
        cached_methods         = [
            "GET",
            "HEAD",
        ]
        compress               = true
        default_ttl            = 86400
        max_ttl                = 31536000
        min_ttl                = 0
        smooth_streaming       = false
        target_origin_id       = "origin1"
        trusted_key_groups     = []
        trusted_signers        = []
        viewer_protocol_policy = "redirect-to-https"

        forwarded_values {
            headers                 = []
            query_string            = false
            query_string_cache_keys = []

            cookies {
                forward           = "none"
                whitelisted_names = []
            }
        }

        lambda_function_association {
            event_type   = "origin-request"
            include_body = false
            lambda_arn   = aws_lambda_function.lambda-function.arn
            # lambda_arn   = "arn:aws:lambda:us-east-1:488759774969:function:SSRAppStack-ssrEdgeHandler443FC458-E0dWgwjTSD4U:1"
        }
    }

    ordered_cache_behavior {
        allowed_methods        = [
            "GET",
            "HEAD",
        ]
        cached_methods         = [
            "GET",
            "HEAD",
        ]
        compress               = true
        default_ttl            = 86400
        max_ttl                = 31536000
        min_ttl                = 0
        path_pattern           = "/ssr"
        smooth_streaming       = false
        target_origin_id       = "origin2"
        trusted_key_groups     = []
        trusted_signers        = []
        viewer_protocol_policy = "redirect-to-https"

        forwarded_values {
            headers                 = []
            query_string            = false
            query_string_cache_keys = []

            cookies {
                forward           = "none"
                whitelisted_names = []
            }
        }
    }

    origin {
        connection_attempts = 3
        connection_timeout  = 10
        domain_name         = "${aws_api_gateway_rest_api.rest-api.id}.execute-api.us-east-1.amazonaws.com"
        origin_id           = "origin2"
        origin_path         = "/prod"

        custom_origin_config {
            http_port                = 80
            https_port               = 443
            origin_keepalive_timeout = 5
            origin_protocol_policy   = "https-only"
            origin_read_timeout      = 30
            origin_ssl_protocols     = [
                "TLSv1.2",
            ]
        }
    }

    origin {
        connection_attempts = 3
        connection_timeout  = 10
        domain_name         = "${aws_s3_bucket.react-tfgm-web.id}.s3.us-east-1.amazonaws.com"
        origin_id           = "origin1"

        s3_origin_config {
            origin_access_identity = "origin-access-identity/cloudfront/E1DVOTC47HZ2FP"
        }
    }

    restrictions {
        geo_restriction {
            locations        = []
            restriction_type = "none"
        }
    }

    viewer_certificate {
        cloudfront_default_certificate = true
        minimum_protocol_version       = "TLSv1"
    }

    tags = {
        Name = "${local.default_name}-cloudfront-distribution-s3"
    }
}

output "cloudfront-distribution" {
   value = aws_cloudfront_distribution.s3_distribution.domain_name
}

# resource "aws_cloudfront_distribution" "s3_distribution" {
#   origin {
#     domain_name = aws_s3_bucket.b.bucket_regional_domain_name
#     origin_id   = local.s3_origin_id

#     s3_origin_config {
#       origin_access_identity = "origin-access-identity/cloudfront/ABCDEFG1234567"
#     }
#   }

#   enabled             = true
#   is_ipv6_enabled     = true
#   comment             = "Some comment"
#   default_root_object = "index.html"

#   logging_config {
#     include_cookies = false
#     bucket          = "mylogs.s3.amazonaws.com"
#     prefix          = "myprefix"
#   }

#   aliases = ["mysite.example.com", "yoursite.example.com"]

#   default_cache_behavior {
#     allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
#     cached_methods   = ["GET", "HEAD"]
#     target_origin_id = local.s3_origin_id

#     forwarded_values {
#       query_string = false

#       cookies {
#         forward = "none"
#       }
#     }

#     viewer_protocol_policy = "allow-all"
#     min_ttl                = 0
#     default_ttl            = 3600
#     max_ttl                = 86400
#   }

#   # Cache behavior with precedence 0
#   ordered_cache_behavior {
#     path_pattern     = "/content/immutable/*"
#     allowed_methods  = ["GET", "HEAD", "OPTIONS"]
#     cached_methods   = ["GET", "HEAD", "OPTIONS"]
#     target_origin_id = local.s3_origin_id

#     forwarded_values {
#       query_string = false
#       headers      = ["Origin"]

#       cookies {
#         forward = "none"
#       }
#     }

#     min_ttl                = 0
#     default_ttl            = 86400
#     max_ttl                = 31536000
#     compress               = true
#     viewer_protocol_policy = "redirect-to-https"
#   }

#   # Cache behavior with precedence 1
#   ordered_cache_behavior {
#     path_pattern     = "/content/*"
#     allowed_methods  = ["GET", "HEAD", "OPTIONS"]
#     cached_methods   = ["GET", "HEAD"]
#     target_origin_id = local.s3_origin_id

#     forwarded_values {
#       query_string = false

#       cookies {
#         forward = "none"
#       }
#     }

#     min_ttl                = 0
#     default_ttl            = 3600
#     max_ttl                = 86400
#     compress               = true
#     viewer_protocol_policy = "redirect-to-https"
#   }

#   price_class = "PriceClass_200"

#   restrictions {
#     geo_restriction {
#       restriction_type = "whitelist"
#       locations        = ["US", "CA", "GB", "DE"]
#     }
#   }

#   tags = {
#     Environment = "production"
#   }

#   viewer_certificate {
#     cloudfront_default_certificate = true
#   }
# } */