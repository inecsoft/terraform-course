resource "aws_athena_workgroup" "athena_workgroup" {
  name = "athena_workgroup_kinesis"
  force_destroy = true

  configuration {
    enforce_workgroup_configuration    = true
    publish_cloudwatch_metrics_enabled = true
    result_configuration {

      output_location = "s3://${aws_s3_bucket.s3_bucket_kinesis.bucket}/"
      encryption_configuration {
        encryption_option = "SSE_KMS"
        kms_key_arn       = aws_kms_key.kms_key.arn
      }
    }
  }
}

resource "aws_athena_database" "athena_database" {
  name   = "loungebeer"
  force_destroy = true
  bucket = aws_s3_bucket.s3_bucket_kinesis.id
}


resource "aws_athena_named_query" "athena_named_query_db_create" {
	name      = "loungebeer"
	workgroup = aws_athena_workgroup.athena_workgroup.id
	database  = aws_athena_database.athena_database.name
#   query     = "CREATE DATABASE IF NOT EXISTS loungebeer COMMENT 'CLOUDTRAIL DATABASE' LOCATION 'S3://ca-anthena-cloudtrail-db-tfgm/cloudtrail' WITHDBPROPERTIES ('CREATOR'='IVANPEDRO', 'COMPANY'='TFGM', 'CREATED'='2023')"
	query     = "CREATE EXTERNAL TABLE IF NOT EXISTS loungebeer (`first_name` string,`last_name` string, `phone` string, `email` string, `gender` string, `ip_address` string) ROW FORMAT SERDE 'org.openx.data.jsonserde.JsonSerDe' WITH SERDEPROPERTIES ('serialization.format' = ',', 'field.delim' = ' ', 'escapeChar'= '/\\' ) LOCATION 's3://${aws_s3_bucket.s3_bucket_kinesis.bucket}/' TBLPROPERTIES ('has_encrypted_data'='true')"
}