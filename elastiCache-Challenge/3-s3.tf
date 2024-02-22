#----------------------------------------------------------------------------------------
data "archive_file" "lambda" {
  type = "zip"
  #source_file = "code/app.py"
  source_dir  = "code"
  output_path = "code.zip"
}
#-----------------------------------------------------------------
resource "aws_s3_bucket" "s3-lambda-content-bucket" {
  bucket = "inecsoft-serverless"

  #force destroy for not prouction env
  force_destroy = true

  tags = {
    Name = "${local.default_name}-s3-content-bucket"
  }
}
#-----------------------------------------------------------------------
output "bucket-name" {

  value = aws_s3_bucket.s3-lambda-content-bucket.id
}
#-----------------------------------------------------------------------
#echo 'formatdate("YYYYMMDDHHmmss", timestamp())'| terraform console
#formatdate("YYYYMMDDHHmmss", timestamp())
resource "aws_s3_object" "s3-lambda-content-bucket-object" {
  key    = "code.zip"
  bucket = aws_s3_bucket.s3-lambda-content-bucket.id
  #content    = "web/index.html"
  #source = "web/index.html"
  source       = data.archive_file.lambda.output_path
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
#--------------------------------------------------------------------------------