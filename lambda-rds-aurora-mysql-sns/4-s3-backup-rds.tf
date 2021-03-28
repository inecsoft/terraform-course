#-------------------------------------------------------------------------------------------------------
data archive_file s3-backup-rds {
  type        = "zip"
  source_file = "data/aurora_new_order_trigger_create.sql"
  #source_dir = "data" 
  output_path = "data.zip"
}
#-------------------------------------------------------------------------------------------------------
resource "aws_s3_bucket" "s3-backup-rds" {
  bucket = "${local.default_name}-s3-backup-rds"
  acl    = "private"

  #force destroy for not prouction env
  force_destroy = true

  tags = {
    Name = "${local.default_name}-s3-backup-rds"
  }
}
#-------------------------------------------------------------------------------------------------------
output "s3-backup-rds-name" {
  value =  aws_s3_bucket.s3-backup-rds.id
}
#-------------------------------------------------------------------------------------------------------
#echo 'formatdate("YYYYMMDDHHmmss", timestamp())'| terraform console
#formatdate("YYYYMMDDHHmmss", timestamp())
resource "aws_s3_bucket_object" "s3-backup-rds-object" {
  key    = "data/data.zip"
  bucket = aws_s3_bucket.s3-backup-rds.id
  #content    = "web/index.html"
  #source = "web/index.html"
  source  = data.archive_file.s3-backup-rds.output_path
  content_type = "application/zip"
 
  #Encrypting with KMS Key
  #kms_key_id = aws_kms_key.key.arn

  #Server Side Encryption with S3 Default Master Key  
  #server_side_encryption = "aws:kms" 
  #metadata = var.metadata

  tags = {
    Name = "${local.default_name}-s3-content-bucket-object"
  }
}
#-------------------------------------------------------------------------------------------------------
data "aws_iam_policy_document" "iam-policy-doc-rdsToS3" {
  statement {
    sid = "rdsToS3"
    effect = "Allow"
    actions = [
      "s3:PutObject",
      "s3:GetObject",
      "s3:AbortMultipartUpload",
      "s3:ListBucket",
      "s3:DeleteObject",
      "s3:ListMultipartUploadParts"
    ]

    resources = [
      aws_s3_bucket.s3-backup-rds.arn,
      "${aws_s3_bucket.s3-backup-rds.arn}/*"
    ]
  }
}
#-------------------------------------------------------------------------------------------------------
resource "aws_iam_policy" "iam-policy-rdsToS3" {
  name        = "${local.default_name}-iam-policy-doc-rdsToS3"
  description = "allow rds to backup data to s3"
  path        = "/"
  policy      = data.aws_iam_policy_document.iam-policy-doc-rdsToS3.json
}
#-------------------------------------------------------------------------------------------------------
resource "aws_iam_role_policy_attachment" "iam-role-policy-attach-rdsToS3" {
  role       = aws_iam_role.s3_import.name
  policy_arn = aws_iam_policy.iam-policy-rdsToS3.arn
}
#-------------------------------------------------------------------------------------------------------
data "aws_iam_policy_document" "s3_import_assume" {
  statement {
    actions = [
      "sts:AssumeRole",
    ]

    principals {
      type        = "Service"
      identifiers = ["rds.amazonaws.com"]
    }
  }
}
#-------------------------------------------------------------------------------------------------------
resource "aws_iam_role" "s3_import" {
  name                  = "${local.default_name}-s3-import-role"
  description           = "IAM role to allow RDS to import MySQL backup from S3"
  assume_role_policy    = data.aws_iam_policy_document.s3_import_assume.json
  force_detach_policies = true

   tags = {
    Name = "${local.default_name}-s3-content-bucket-object"
  }
}
#-------------------------------------------------------------------------------------------------------
data "aws_iam_policy_document" "s3_import" {
  statement {
    actions = [
      "s3:ListBucket",
      "s3:GetBucketLocation",
    ]

    resources = [
      aws_s3_bucket.s3-backup-rds.arn
    ]
  }

  statement {
    actions = [
      "s3:GetObject",
    ]

    resources = [
      "${aws_s3_bucket.s3-backup-rds.arn}/*",
    ]
  }
}
#-------------------------------------------------------------------------------------------------------
resource "aws_iam_role_policy" "s3_import" {
  name   = "${local.default_name}-s3-import-role-policy"
  role   = aws_iam_role.s3_import.id
  policy = data.aws_iam_policy_document.s3_import.json

  # We need the files uploaded before the RDS instance is created, and the instance
  # also needs this role so this is an easy way of ensuring the backup is uploaded before
  # the instance creation starts
  #command = "unzip backup.zip && aws s3 sync data/backup s3://${aws_s3_bucket.s3-backup-rds.id}"
  provisioner "local-exec" {
    command = "unzip data.zip && aws s3 sync aurora_new_order_trigger_create.sql s3://${aws_s3_bucket.s3-backup-rds.id}"
  }
}
#-------------------------------------------------------------------------------------------------------
