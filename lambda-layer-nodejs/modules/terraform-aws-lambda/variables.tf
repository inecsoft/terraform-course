variable "lambda_function_name" {
  type        = string
  description = "name for the lambda"
  default     = "lamda-layer"
}

variable "lambda_description" {
  type        = string
  description = "destricption for the lambda"
  default     = "lamda layer project"
}

variable "environment_variables" {
  type        = map(string)
  description = "name environment varialbles for the lambda"
  default = {
    luke  = "jedi"
    yoda  = "jedi"
    darth = "sith"
  }
}

variable "runtime" {
  type        = string
  description = "name for the lambda"
  default     = "nodejs20.x"
}

variable "handler" {
  type        = string
  description = "name for the lambda"
  default     = "index.handler"
}

variable "filename" {
  type        = string
  description = "folders that contains the code"
  default     = "lambdas"
}

variable "memory_size" {
  type        = number
  description = "memory of the lambda"
  default     = "128"
}

variable "timeout" {
  type        = number
  description = "time out of the run time for the lambda"
  default     = "3"
}

variable "log_retention" {
  type        = number
  description = "time out of the run time for the lambda"
  default     = "7"
}

variable "subnet_ids" {
  type        = list
  description = "subnet ids for the lambda"
  default     = []
}

variable "security_group_ids" {
  type        = list
  description = "security group ids for the lambda"
  default     = []
}

variable "code_location" {
  type        = string
  description = "location of the code for the lambda"
  default     = "lambdas"
}

variable "layer_arn" {
  type        = string
  description = "lambda layer arn"
  default     = ""
}

variable "lambda_layer_name" {
  type        = string
  description = "name for the lambda layer"
  default     = "nodejs-lamda-layer"
}


variable "layer_description" {
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

