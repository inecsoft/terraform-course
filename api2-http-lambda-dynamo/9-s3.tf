#-----------------------------------------------------------------
resource "aws_s3_bucket" "s3-lambda-content-bucket" {
  for_each = toset(var.lambda-name)
  bucket   = "${local.default_name}-lambda-content-bucket-${each.key}"
  acl      = "private"

  #force destroy for not prouction env
  force_destroy = true

  versioning {
    enabled = true
  }

  object_lock_configuration {
    object_lock_enabled = "Enabled"
  }

  tags = {
    Name = "${local.default_name}-s3-content-bucket-${each.key}"
  }

}
#-----------------------------------------------------------------------
#echo 'formatdate("YYYYMMDDHHmmss", timestamp())'| terraform console
#formatdate("YYYYMMDDHHmmss", timestamp())
resource "aws_s3_bucket_object" "s3-lambda-content-bucket-object" {
  for_each = toset(var.lambda-name)
  key      = "${local.app_version}/${each.key}.zip"
  bucket   = aws_s3_bucket.s3-lambda-content-bucket[each.key].id
  #content    = "web/index.html"
  #source = "web/index.html"
  source       = data.archive_file.lambda[each.key].output_path
  content_type = "application/zip"

  #Encrypting with KMS Key
  #kms_key_id = aws_kms_key.key.arn

  #Server Side Encryption with S3 Default Master Key  
  #server_side_encryption = "aws:kms" 
  #metadata = var.metadata

  tags = {
    Name = "${local.default_name}-s3-content-bucket-object-${each.key}"
  }
}
#--------------------------------------------------------------------
output "bucket-name" {
  description = "backet names for the api websocket lambdas"
  value = {
    for instance in aws_s3_bucket.s3-lambda-content-bucket :
    instance.id => instance.id
  }
}
#-----------------------------------------------------------------------