#terraform apply -target aws_dynamodb_table.terraform_statelock -target aws_s3_bucket.state_bucket

resource "aws_s3_bucket" "state_bucket" {
  bucket = var.state_bucket
  #acl           = "private"
  force_destroy = true
}

#------------------------------------------------------------
resource "aws_dynamodb_table" "terraform_statelock" {
  name           = var.dynamodb_table_name
  read_capacity  = 20
  write_capacity = 20
  hash_key       = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  point_in_time_recovery {
    enabled = true
  }

  timeouts {}

  # ttl {
  #     attribute_name = "TimeToExist"
  #     enabled = false
  # }

  tags = {
    Name = var.dynamodb_table_name
  }
}

#------------------------------------------------------------

terraform {
  backend "s3" {
    key            = "networking/dev-vpc/terraform.tfstate"
    bucket         = "globo-15991"
    region         = "eu-west-1"
    profile        = "ivan-arteaga-dev"
    dynamodb_table = "globo-tfstatelock-15991"
  }
}
#terraform init -backend-config="bucket=BUCKET_NAME" -backend-config="region=REGION_NAME" -backend-config="dynamodb_table=TABLE_NAME"
# dynamodb_statelock = "globo-tfstatelock-15991"
# s3_bucket = "globo-15991"

# terraform init -backend-config="bucket=globo-15991" -backend-config="region=eu-west-1" -backend-config="dynamodb_table=globo-tfstatelock-15991" -backend-config="profile=ivan-arteaga-dev"