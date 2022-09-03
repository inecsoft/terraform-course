variable "aliases" {
  type = list(string)
  default = [  
    "mygetmethere.tv",
    "www.mygetmethere.tv"
  ]
}

variable "tag" {
  type = string
  default = "mygetmethere.tv"
}

variable "origin_path" {
  type = string
  default = ""
}
variable "domain" {
  type = string
  default = "mygetmethere.tv"
}

variable "viewer_certificate" {
  description = "The SSL configuration for this distribution"
  type        = any
  default = {
    acm_certificate_arn = "arn:aws:acm:us-east-1:050124427385:certificate/13a89d00-d5bf-4f0a-91c8-31c3b3861135"
    minimum_protocol_version       = "TLSv1.2_2021"
  }
}
