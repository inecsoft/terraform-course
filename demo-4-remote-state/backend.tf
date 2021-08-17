terraform {
  backend "s3" {
    #bucket  = "inecsoft.co.uk"
    bucket = "my-bucket-inecsoft"
    key    = "terraform/demo4"
    region = "eu-west-1"
  }
}

