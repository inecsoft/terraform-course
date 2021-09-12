terraform {
    backend "s3" {
        key    = "networking/dev-vpc/terraform.tfstate"
        bucket = "globo-15991"
        region = "eu-west-1"
        profile = "infra"
        dynamodb_table = "globo-tfstatelock-15991"
    }
}
#terraform init -backend-config="bucket=BUCKET_NAME" -backend-config="region=REGION_NAME" -backend-config="dynamodb_table=TABLE_NAME"
# dynamodb_statelock = "globo-tfstatelock-15991"
# s3_bucket = "globo-15991"

# terraform init -backend-config="bucket=globo-15991" -backend-config="region=eu-west-1" -backend-config="dynamodb_table=globo-tfstatelock-15991" -backend-config="profile=infra"