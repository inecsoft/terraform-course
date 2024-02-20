resource "aws_s3_bucket" "s3_bucket_ecs_fargate" {
  bucket        = "bucketecsfargate"
  provider =  aws.AWSivanarteagaDev
  force_destroy = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "s3_bucket_server_side_encryption_configuration_ecs_fargate" {
  bucket = aws_s3_bucket.s3_bucket_ecs_fargate.id
  provider =  aws.AWSivanarteagaDev

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}