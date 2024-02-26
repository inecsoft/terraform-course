variable "lambda_layer_name" {
  type        = string
  description = "name for the lambda layer"
  default     = "nodejs-lamda-layer"
}


variable "description" {
  type        = string
  description = "name for the lambda"
  default     = "nodejs-lamda-layer"
}

variable "s3_bucket_id" {
  type        = string
  description = "name for the lambda layer"
  default     = "nodejs-lamda-layer"
}

variable "key_s3_bucket" {
  type        = string
  description = "name for the lambda layer"
  default     = "nodejs-lamda-layer"
}


variable "code_location" {
  type        = string
  description = "name for the lambda"
  default     = "lambdas"
}

variable "runtime" {
  type        = string
  description = "name for the lambda"
  default     = "nodejs20.x"
}
