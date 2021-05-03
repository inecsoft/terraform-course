#----------------------------------------------------------------------------------------
data archive_file archive-file-lambda-getinventory {
  type        = "zip"
  #source_file = "code/app.js"
  source_dir  = "getinventory" 
  output_path = "getinventory.zip"
}
#----------------------------------------------------------------------------------------
data archive_file archive-file-lambda-getorderstatus {
  type        = "zip"
  #source_file = "code/app.js"
  source_dir  = "getorderstatus" 
  output_path = "getorderstatus.zip"
}
#-----------------------------------------------------------------
resource "aws_s3_bucket" "s3-lambda-content-bucket" {
  bucket = "${local.default_name}-s3-lambda-content-bucket"
  acl    = "private"

  #force destroy for not prouction env
  force_destroy = true

  tags = {
    Name = "${local.default_name}-s3-content-bucket"
  }
}
#-----------------------------------------------------------------------
output "bucket-name" {
  value =  aws_s3_bucket.s3-lambda-content-bucket.id
}
#-----------------------------------------------------------------------
#echo 'formatdate("YYYYMMDDHHmmss", timestamp())'| terraform console
#formatdate("YYYYMMDDHHmmss", timestamp())
resource "aws_s3_bucket_object" "s3-bucket-object-getinventory" {
  key          = "${local.app_version}/getinventory.zip"
  bucket       = aws_s3_bucket.s3-lambda-content-bucket.id
  #content     = "web/index.html"
  #source      = "web/index.html"
  source       = data.archive_file.archive-file-lambda-getinventory.output_path
  etag         = filemd5(data.archive_file.archive-file-lambda-getinventory.output_path)
  content_type = "application/zip"
 
  #Encrypting with KMS Key
  #kms_key_id = aws_kms_key.key.arn

  #Server Side Encryption with S3 Default Master Key  
  #server_side_encryption = "aws:kms" 
  #metadata = var.metadata

  tags = {
    Name = "${local.default_name}-s3-bucket-object-getinventory"
  }

}
#--------------------------------------------------------------------------------
resource "aws_s3_bucket_object" "s3-bucket-object-getorderstatus" {
  key          = "${local.app_version}/getinventory.zip"
  bucket       = aws_s3_bucket.s3-lambda-content-bucket.id
  #content     = "web/index.html"
  #source      = "web/index.html"
  source       = data.archive_file.archive-file-lambda-getorderstatus.output_path
  etag         = filemd5(data.archive_file.archive-file-lambda-getorderstatus.output_path)
  content_type = "application/zip"
 
  #Encrypting with KMS Key
  #kms_key_id = aws_kms_key.key.arn

  #Server Side Encryption with S3 Default Master Key  
  #server_side_encryption = "aws:kms" 
  #metadata = var.metadata

  tags = {
    Name = "${local.default_name}-s3-bucket-object-getorderstatus"
  }
}
#--------------------------------------------------------------------------------