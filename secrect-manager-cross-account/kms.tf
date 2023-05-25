
/* provider                  = aws.user */


#-------------------------------------------------------------------------------------------
# kms provides encryption at rest
#-------------------------------------------------------------------------------------------

#-------------------------------------------------------------------------------------------
resource "aws_kms_key" "kms_key" {
    description = "kms key for my secrect-manager-cross-account project"
    #policy      = data.aws_iam_policy_document.iam-policy-doc-kms.json
    bypass_policy_lockout_safety_check = false
    deletion_window_in_days = 10
    key_usage               = "ENCRYPT_DECRYPT"
    is_enabled              = true
    enable_key_rotation     = true

    /* policy =  */

}
#-------------------------------------------------------------------------------------------
resource "aws_kms_alias" "kms_key_alias" {
  name          = "alias/secrect-manager-cross-account"
  target_key_id = aws_kms_key.kms_key.key_id
}

#-------------------------------------------------------------------------------------------
resource "aws_kms_key_policy" "kms_key_policy" {
  key_id = aws_kms_key.kms_key.id
  policy = <<POLICY
{
  "Version" : "2012-10-17",
  "Id" : "key-consolepolicy-3",
  "Statement" : [ {
    "Sid" : "Enable IAM User Permissions",
    "Effect" : "Allow",
    "Principal" : {
      "AWS" : "arn:aws:iam::${data.aws_caller_identity.dev.account_id}:root"
    },
    "Action" : "kms:*",
    "Resource" : "*"
  }, {
    "Sid" : "Allow access for Key Administrators",
    "Effect" : "Allow",
    "Principal" : {
      "AWS" : "arn:aws:iam::${data.aws_caller_identity.dev.account_id}:user/ivan.arteaga"
    },
    "Action" : [ "kms:Create*", "kms:Describe*", "kms:Enable*", "kms:List*", "kms:Put*", "kms:Update*", "kms:Revoke*", "kms:Disable*", "kms:Get*", "kms:Delete*", "kms:TagResource", "kms:UntagResource", "kms:ScheduleKeyDeletion", "kms:CancelKeyDeletion" ],
    "Resource" : "*"
  },
  {
    "Sid" : "Allow use for Key iam_developers_group",
    "Effect" : "Allow",
    "Principal" : {
      "AWS" : "${aws_iam_user.iam_user.arn}"
    },
    "Action" : [ "kms:Decrypt", "kms:DescribeKey" ],
    "Resource" : "${aws_kms_key.kms_key.arn}"
  },
  {
    "Sid" : "Allow use of the key",
    "Effect" : "Allow",
    "Principal" : {
      "AWS" : "arn:aws:iam::${data.aws_caller_identity.dev.account_id}:user/ivan.arteaga"
    },
    "Action" : [ "kms:Encrypt", "kms:Decrypt", "kms:ReEncrypt*", "kms:GenerateDataKey*", "kms:DescribeKey" ],
    "Resource" : "*"
  }, {
    "Sid" : "Allow attachment of persistent resources",
    "Effect" : "Allow",
    "Principal" : {
      "AWS" : "arn:aws:iam::${data.aws_caller_identity.dev.account_id}:user/ivan.arteaga"
    },
    "Action" : [ "kms:CreateGrant", "kms:ListGrants", "kms:RevokeGrant" ],
    "Resource" : "*",
    "Condition" : {
      "Bool" : {
        "kms:GrantIsForAWSResource" : "true"
      }
    }
  } ]
}
POLICY
}