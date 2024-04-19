# {
#   "Version": "2012-10-17",
#   "Statement": [
#     {
#       "Effect": "Allow",
#       "Principal": {
#         "Service": "macie.amazonaws.com"
#       },
#       "Action": [
#         "sts:AssumeRole"
#       ]
#     }
#   ]
# }

# {
#   "Version": "2012-10-17",
#   "Statement": [
#     {
#       "Effect": "Allow",
#       "Action": [
#         "cloudtrail:DescribeTrails",
#         "cloudtrail:GetEventSelectors",
#         "cloudtrail:GetTrailStatus",
#         "cloudtrail:ListTags",
#         "cloudtrail:LookupEvents",
#         "iam:ListAccountAliases",
#         "organizations:DescribeAccount",
#         "organizations:ListAccounts",
#         "s3:GetAccountPublicAccessBlock",
#         "s3:ListAllMyBuckets",
#         "s3:GetBucketAcl",
#         "s3:GetBucketLocation",
#         "s3:GetBucketLogging",
#         "s3:GetBucketPolicy",
#         "s3:GetBucketPolicyStatus",
#         "s3:GetBucketPublicAccessBlock",
#         "s3:GetBucketTagging",
#         "s3:GetBucketVersioning",
#         "s3:GetBucketWebsite",
#         "s3:GetEncryptionConfiguration",
#         "s3:GetLifecycleConfiguration",
#         "s3:GetReplicationConfiguration",
#         "s3:ListBucket",
#         "s3:GetObject",
#         "s3:GetObjectAcl",
#         "s3:GetObjectTagging"
#       ],
#       "Resource": "*"
#     },
#     {
#       "Effect": "Allow",
#       "Action": [
#         "cloudtrail:CreateTrail",
#         "cloudtrail:StartLogging",
#         "cloudtrail:StopLogging",
#         "cloudtrail:UpdateTrail",
#         "cloudtrail:DeleteTrail",
#         "cloudtrail:PutEventSelectors"
#       ],
#       "Resource": "arn:aws:cloudtrail:*:*:trail/AWSMacieTrail-DO-NOT-EDIT"
#     },
#     {
#       "Effect": "Allow",
#       "Action": [
#         "s3:CreateBucket",
#         "s3:DeleteBucket",
#         "s3:DeleteBucketPolicy",
#         "s3:DeleteBucketWebsite",
#         "s3:DeleteObject",
#         "s3:DeleteObjectTagging",
#         "s3:DeleteObjectVersion",
#         "s3:DeleteObjectVersionTagging",
#         "s3:PutBucketPolicy"
#       ],
#       "Resource": [
#         "arn:aws:s3:::awsmacie-*",
#         "arn:aws:s3:::awsmacietrail-*",
#         "arn:aws:s3:::*-awsmacietrail-*"
#       ]
#     },
#     {
#       "Effect": "Allow",
#       "Action": [
#         "logs:CreateLogGroup"
#       ],
#       "Resource": [
#         "arn:aws:logs:*:*:log-group:/aws/macie/*"
#       ]
#     },
#     {
#       "Effect": "Allow",
#       "Action": [
#         "logs:CreateLogStream",
#         "logs:PutLogEvents",
#         "logs:DescribeLogStreams"
#       ],
#       "Resource": [
#         "arn:aws:logs:*:*:log-group:/aws/macie/*:log-stream:*"
#       ]
#     }
#   ]
# }