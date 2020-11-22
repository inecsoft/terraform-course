#-----------------------------------------------------------------------------------------------
module "dynamodb_table" {
  source   = "terraform-aws-modules/dynamodb-table/aws"
  #Table name
  name     = "${local.default_name}-dynamodb"
 
  #Primary key*	Partition key
  hash_key       = "id"
  #add sort key
  range_key      = "title"
  
  billing_mode   = "PROVISIONED"

  #Provisioned capacity
  read_capacity  = 5
  write_capacity = 5

  #Auto Scaling
  autoscaling_read = {
    target_value       = 70
    scale_in_cooldown  = 50
    scale_out_cooldown = 40
    max_capacity       = 4000
  }

  autoscaling_write = {
    target_value       = 70
    scale_in_cooldown  = 50
    scale_out_cooldown = 40
    max_capacity       = 4000
  }
  
  #Secondary indexes
  autoscaling_indexes = {
    TitleIndex = {
      read_max_capacity  = 30
      read_min_capacity  = 10
      write_max_capacity = 30
      write_min_capacity = 10
    }
  }

  attributes = [
    {
      name = "id"
      type = "N"
    },
    {
      name = "title"
      type = "S"
    },
    {
      name = "age"
      type = "N"
    }
  ]

  global_secondary_indexes = [
    {
      name               = "TitleIndex"
      hash_key           = "title"
      range_key          = "age"
      projection_type    = "INCLUDE"
      non_key_attributes = ["id"]
      write_capacity     = 10
      read_capacity      = 10
    }
  ]


  tags = {
    Name = "${local.default_name}-dynamodb"
  }
}

#-----------------------------------------------------------------------------------------------
output "this_dynamodb_table_arn" {
  description = "ARN of the DynamoDB table"
  value       = module.dynamodb_table.this_dynamodb_table_arn
}
#-----------------------------------------------------------------------------------------------
output "this_dynamodb_table_id" {
  description = "ID of the DynamoDB table"
  value       = module.dynamodb_table.this_dynamodb_table_id
}
#-----------------------------------------------------------------------------------------------
output "this_dynamodb_table_stream_arn" {
  description = "The ARN of the Table Stream. Only available when var.stream_enabled is true"
  value       = module.dynamodb_table.this_dynamodb_table_stream_arn
}

output "this_dynamodb_table_stream_label" {
  description = "A timestamp, in ISO 8601 format of the Table Stream. Only available when var.stream_enabled is true"
  value       = module.dynamodb_table.this_dynamodb_table_stream_label
}
#-----------------------------------------------------------------------------------------------