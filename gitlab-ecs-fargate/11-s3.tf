#-----------------------------------------------------------------------
resource "aws_s3_bucket" "state-bucket" {
    bucket = "gitlab-state-bucket"
    acl    = "private"
    force_destroy = true

    lifecycle {

        # Any Terraform plan that includes a destroy of this resource will
        # result in an error message.
        #
        prevent_destroy = false
    }

    tags = {
       Name  = "${local.default_name}-state-bucket"
    }
}
#-----------------------------------------------------------------------

#-----------------------------------------------------------------------
output "bucket-name" {
  description = "bucket to store the terraform state"
  value       = aws_s3_bucket.state-bucket.bucket
}
#-----------------------------------------------------------------------