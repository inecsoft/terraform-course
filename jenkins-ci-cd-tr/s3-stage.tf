#--------------------------------------------------------------
resource "aws_s3_bucket" "bucket-state" {
   bucket = "${local.default_name}-bucket-state"
   acl = "private"
    
   tags = {
     Env = terraform.workspace
   }
}
#--------------------------------------------------------------