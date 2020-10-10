#----------------------------------------------------------------------------------------
resource "aws_s3_bucket" "s3-bucket" {
    bucket = "${local.default_name}-bucket-zappa"
    acl    = "private"

    tags = {
       Name = "${local.default_name}-bucket-zappa"
    }
}
#-----------------------------------------------------------------------
output "bucket-name" {
   value =  aws_s3_bucket.s3-bucket.id
}
#-----------------------------------------------------------------------
