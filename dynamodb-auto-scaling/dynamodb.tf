#------------------------------------------------------------
resource "aws_dynamodb_table" "dynamodb-table" {
  name           = "icecreams"
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  stream_enabled = false

  hash_key = "icecreamid"

  attribute {
    name = "icecreamid"
    type = "S"
  }

  point_in_time_recovery {
    enabled = false
  }

  timeouts {}

  # ttl {
  #     attribute_name = "TimeToExist"
  #     enabled = false
  # }

  tags = {
    Name = "${local.default_name}-dynamodb-table"
  }
}
#------------------------------------------------------------

