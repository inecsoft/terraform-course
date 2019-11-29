#-----------------------------------------------------------------------
resource "aws_s3_bucket" "codepipeline-eu-west-1-620136413607" {
    bucket = "codepipeline-eu-west-1-620136413607"
    acl    = "private"
    force_destroy = true
    policy = <<POLICY
{
  "Version": "2012-10-17",
  "Id": "SSEAndSSLPolicy",
  "Statement": [
    {
      "Sid": "DenyUnEncryptedObjectUploads",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::codepipeline-eu-west-1-620136413607/*",
      "Condition": {
        "StringNotEquals": {
          "s3:x-amz-server-side-encryption": "aws:kms"
        }
      }
    },
    {
      "Sid": "DenyInsecureConnections",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:*",
      "Resource": "arn:aws:s3:::codepipeline-eu-west-1-620136413607/*",
      "Condition": {
        "Bool": {
          "aws:SecureTransport": "false"
        }
      }
    }
  ]
}
POLICY
   tags = {
            Name        = "codedeploybucket"
        }

         lifecycle {
    
             # Any Terraform plan that includes a destroy of this resource will
             # result in an error message.
             #
             prevent_destroy = false
         }
}
#-----------------------------------------------------------------------
## aws_s3_bucket_policy.codepipeline-eu-west-1-620136413607:
#resource "aws_s3_bucket_policy" "codepipeline-eu-west-1-620136413607" {
#    bucket = "${aws_s3_bucket.codepipeline-eu-west-1-620136413607.id}"
#    id     = "codepipeline-eu-west-1-620136413607"
#    policy = jsonencode(
#        {
#            Id        = "SSEAndSSLPolicy"
#            Statement = [
#                {
#                    Action    = "s3:PutObject"
#                    Condition = {
#                        StringNotEquals = {
#                            s3:x-amz-server-side-encryption = "aws:kms"
#                        }
#                    }
#                    Effect    = "Deny"
#                    Principal = "*"
#                    Resource  = "arn:aws:s3:::codepipeline-eu-west-1-620136413607/*"
#                    Sid       = "DenyUnEncryptedObjectUploads"
#                },
#                {
#                    Action    = "s3:*"
#                    Condition = {
#                        Bool = {
#                            aws:SecureTransport = "false"
#                        }
#                    }
#                    Effect    = "Deny"
#                    Principal = "*"
#                    Resource  = "arn:aws:s3:::codepipeline-eu-west-1-620136413607/*"
#                    Sid       = "DenyInsecureConnections"
#                },
#            ]
#            Version   = "2012-10-17"
#        }
#    )
#}
#
##-----------------------------------------------------------------------
#
