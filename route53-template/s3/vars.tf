variable "bucket" {
    type = string
    default = "cds-s3-bucket-route53-test"
}

variable "tag" {
    type = string
    default = "cds-s3-bucket-route53-tag-test"
}

variable "acl" {
    type = string
    default = "private"
}

variable "host_name" {
    type = string
    default = "cds-s3-bucket-route53-hostname"
}

variable "protocol" {
    type = string
    default = "https"
}