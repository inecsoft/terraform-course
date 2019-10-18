#------------------------------------------------------------------------------
resource "aws_s3_bucket" "webhosting" {
  bucket = "inecsoft-webhosting"
  acl    = "public-read"
  
  versioning {
        enabled = true
  }
#  policy = "${file("policy.json")}"

  website {
    index_document = "index.html"
    error_document = "error.html"

#    routing_rules = <<EOF
#[{
#    "Condition": {
#        "KeyPrefixEquals": "docs/"
#    },
#    "Redirect": {
#        "ReplaceKeyPrefixWith": "documents/"
#    }
#}]
#EOF
#  }
}
#------------------------------------------------------------------------------

