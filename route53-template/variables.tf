#############################-S3-#############################
variable "s3_records" {
  type = map(object({
    bucket                   = string
    acl                      = string
    tag                      = string
    host_name                = string
    protocol                 = string
  }))
  default = {}
}

#############################-cloudfront-#############################
variable "cloudfront_records" {
  type = map(object({
    aliases                  = list(string)
    domain                   = string
    origin_path              = string
    /* acm_certificate_arn      = string
    minimum_protocol_version = string  */
    viewer_certificate       = any
    tag                      = string

  }))
  default = {}
}
#############################-inecsoft.co.uk-#######################################
variable "route53_inecsoft_co_uk_txt_records" {
  type = map(object({
    name           = string
    value          = list(string)
    ttl            = string
    routing_policy = string
  }))
  default = {}
}

variable "route53_inecsoft_co_uk_a_records" {
  type = map(object({
    name           = string
    value          = list(string)
    ttl            = string
    routing_policy = string
  }))
  default = {}
}

variable "route53_inecsoft_co_uk_a_alias_records" {
  type = map(object({
    name  = string
    value = string
  }))
  default = {}
}

variable "route53_inecsoft_co_uk_cname_records" {
  type = map(object({
    name           = string
    value          = list(string)
    ttl            = string
    routing_policy = string
  }))
  default = {}
}

variable "route53_inecsoft_co_uk_mx_records" {
  type = map(object({
    name           = string
    value          = list(string)
    ttl            = string
    routing_policy = string
  }))
  default = {}
}

variable "route53_inecsoft_co_uk_srv_records" {
  type = map(object({
    name           = string
    value          = list(string)
    ttl            = string
    routing_policy = string
  }))
  default = {}
}
