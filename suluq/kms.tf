resource "aws_kms_key" "suluq-kms-db" {
  description             = "KMS key kms-db"
  deletion_window_in_days = 30
  is_enabled              = true 
  enable_key_rotation     = true 
  
  policy = <<EOF
  {
    "Id": "key-consolepolicy-3",
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Enable IAM User Permissions",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::752068220484:root"
            },
            "Action": "kms:*",
            "Resource": "*"
        },
        {
            "Sid": "Allow access for Key Administrators",
            "Effect": "Allow",
            "Principal": {
                "AWS": [
                    "arn:aws:iam::752068220484:user/JohnAllen",
                    "arn:aws:iam::752068220484:user/AlexHarley",
                    "arn:aws:iam::752068220484:user/AmarPatel",
                    "arn:aws:iam::752068220484:user/IvanPedroArteaga"
                ]
            },
            "Action": [
                "kms:Create*",
                "kms:Describe*",
                "kms:Enable*",
                "kms:List*",
                "kms:Put*",
                "kms:Update*",
                "kms:Revoke*",
                "kms:Disable*",
                "kms:Get*",
                "kms:Delete*",
                "kms:TagResource",
                "kms:UntagResource",
                "kms:ScheduleKeyDeletion",
                "kms:CancelKeyDeletion"
            ],
            "Resource": "*"
        },
        {
            "Sid": "Allow use of the key",
            "Effect": "Allow",
            "Principal": {
                "AWS": [
                    "arn:aws:iam::752068220484:user/JohnAllen",
                    "arn:aws:iam::752068220484:user/AlexHarley",
                    "arn:aws:iam::752068220484:user/AmarPatel",
                    "arn:aws:iam::752068220484:user/IvanPedroArteaga"
                ]
            },
            "Action": [
                "kms:Encrypt",
                "kms:Decrypt",
                "kms:ReEncrypt*",
                "kms:GenerateDataKey*",
                "kms:DescribeKey"
            ],
            "Resource": "*"
        },
        {
            "Sid": "Allow attachment of persistent resources",
            "Effect": "Allow",
            "Principal": {
                "AWS": [
                    "arn:aws:iam::752068220484:user/JohnAllen",
                    "arn:aws:iam::752068220484:user/AlexHarley",
                    "arn:aws:iam::752068220484:user/AmarPatel",
                    "arn:aws:iam::752068220484:user/IvanPedroArteaga"
                ]
            },
            "Action": [
                "kms:CreateGrant",
                "kms:ListGrants",
                "kms:RevokeGrant"
            ],
            "Resource": "*",
            "Condition": {
                "Bool": {
                    "kms:GrantIsForAWSResource": "true"
                }
            }
        }
    ]
}
EOF

  tags = {
    name = "suluq-kms-db"

  }
}

resource "aws_kms_alias" "suluq-kms-db" {
  name          = "alias/suluq-kms-db"
  target_key_id = "${aws_kms_key.suluq-kms-db.key_id}"
}

output "suluq-kms-db-id" {
  value = "${aws_kms_key.suluq-kms-db.key_id}"
}
