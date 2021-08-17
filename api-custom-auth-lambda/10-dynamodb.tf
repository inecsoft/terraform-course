#------------------------------------------------------------
resource "aws_dynamodb_table" "dynamodb-table" {
  name           = "${local.default_name}-dynamodb-table"
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  stream_enabled = false

  hash_key = "connectionId"

  attribute {
    name = "connectionId"
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

  # replica {
  #     region_name = "eu-west-1"
  # }

  # replica {
  #     region_name = "eu-west-2"
  # }

  # server_side_encryption {
  #     enabled      = true
  #     kms_key_arn  = 
  # }

  tags = {
    Name = "${local.default_name}-dynamodb-table"
  }
}
#------------------------------------------------------------
output "dynamodb-table-id" {
  description = "The name of the table"
  value       = aws_dynamodb_table.dynamodb-table.id
}
#------------------------------------------------------------