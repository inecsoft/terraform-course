#-----------------------------------------------------------------------------------------
#S3 Protection is not enabled for this account have to be disabled to be deleted
#-----------------------------------------------------------------------------------------
resource "aws_guardduty_detector" "guardduty_detector" {
  enable = true
}
#-----------------------------------------------------------------------------------------
module "aws_guardduty_s3_bucket" {
  source          = "terraform-aws-modules/s3-bucket/aws"
  version         = "1.17.0" 
  bucket          = "${local.default_name}-guarduty-s3-bucket"
  policy          = data.aws_iam_policy_document.iam_policy_doc_bucket.json
  attach_policy   = true
  # Allow deletion of non-empty bucket
  force_destroy = true

  tags = { 
    Name = "${local.default_name}-guarduty-s3-bucket"
  }
}
#-----------------------------------------------------------------------------------------
data "aws_iam_policy_document" "iam_policy_doc_bucket" {
  statement {
    sid = "Allow PutObject"
    actions = [ 
      "s3:PutObject"
    ]
    resources = [ "${module.aws_guardduty_s3_bucket.this_s3_bucket_arn}/*"    ]
    principals { 
      type        = "Service"
      identifiers = ["guardduty.amazonaws.com"]
    } 
  }
  statement { 
    sid       = "Allow GetBucketLocation"
    actions   = [ "s3:GetBucketLocation" ]
    resources = [ module.aws_guardduty_s3_bucket.this_s3_bucket_arn ]
    principals {     
      type        = "Service"
      identifiers = ["guardduty.amazonaws.com"]
    }
  } 
}    
#-----------------------------------------------------------------------------------------
data "aws_iam_policy_document" "iam_policy_doc_kms" {

  statement {
    sid = "Allow GuardDuty to encrypt findings"
    actions = [ "kms:GenerateDataKey"  ]
    resources = [  
      "arn:aws:kms:${var.AWS_REGION}:${data.aws_caller_identity.current.account_id}:key/*"
    ]
    principals {
      type        = "Service"     
      identifiers = ["guardduty.amazonaws.com"]    
    } 
  }

  statement {    
    sid = "Allow all users to modify/delete key (test only)"
    actions = [ "kms:*" ]   
    resources = [ 
      "arn:aws:kms:${var.AWS_REGION}:${data.aws_caller_identity.current.account_id}:key/*"    ]   
    principals { 
      type        = "AWS"      
      identifiers = [
        "arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"
      ] 
    } 
  }
}
#-----------------------------------------------------------------------------------------
resource "aws_kms_key" "kms_key" {
  description             = "guard duty kms key"
  enable_key_rotation     = true
  deletion_window_in_days = 7
  policy                  = data.aws_iam_policy_document.iam_policy_doc_kms.json
  
  tags = {
    Name = "${local.default_name}-kms-key-guarduty"
  }
}
#-----------------------------------------------------------------------------------------
resource "aws_guardduty_publishing_destination" "guardduty_publishing_destination" { 
  detector_id     = aws_guardduty_detector.guardduty_detector.id
  destination_arn = module.aws_guardduty_s3_bucket.this_s3_bucket_arn
  kms_key_arn     = aws_kms_key.kms_key.arn
  depends_on      = [    module.aws_guardduty_s3_bucket.guardduty_bucket_policy,  ]
}
#-----------------------------------------------------------------------------------------