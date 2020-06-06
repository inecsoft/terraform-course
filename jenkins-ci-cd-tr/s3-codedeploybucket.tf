#--------------------------------------------------------------------------------------------
#artifacts bucket
#make sure if you change the name of the bucket change the police too.
#--------------------------------------------------------------------------------------------
resource "aws_s3_bucket" "jenkins-codedeploybucket" {
    bucket = "${local.default_name}-jenkins-codedeploybucket"
    acl    = "private"
 
    versioning {
      enabled = true
    }
    policy = <<POLICY
{
  "Version": "2008-10-17",
  "Statement": [
    {
      "Sid": "IPAllow",
      "Effect": "Allow",
      "Principal": "*",
      "Action": [
        "s3:Get*",
        "s3:List*"
      ],
      "Resource": "arn:aws:s3:::${local.default_name}-jenkins-codedeploybucket/*",
      "Condition": {
        "IpAddress": {
          "aws:SourceIp": "${local.workstation-external-cidr}"
        }
      }
    }
  ]
}
POLICY
   tags = {
    Env  = terraform.workspace 
   }
}
#--------------------------------------------------------------------------------------------
# aws_s3_bucket_policy.jenkins-codedeploybucket:
#--------------------------------------------------------------------------------------------
#resource "aws_s3_bucket_policy" "jenkins-codedeploybucket" {
#    bucket = aws_s3_bucket.jenkins-codedeploybucket.name
#    policy = jsonencode(
#        {
#            Statement = [
#                {
#                    Action    = [
#                        "s3:Get*",
#                        "s3:List*",
#                    ]
#                    Condition = {
#                        IpAddress = {
#                            aws:SourceIp = "${local.workstation-external-cidr}"
#                        }
#                    }
#                    Effect    = "Allow"
#                    Principal = "*"
#                    Resource  = "${aws_s3_bucket.jenkins-codedeploybucket.name}/*"
#                    Sid       = "IPAllow"
#                },
#            ]
#            Version   = "2008-10-17"
#        }
#    )
#}
#--------------------------------------------------------------------------------------------


