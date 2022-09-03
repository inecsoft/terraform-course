module "s3" {
  source   = "./s3"
  for_each = var.s3_records

  bucket                = lookup(each.value, "bucket", "")
  acl                   = lookup(each.value, "acl", "")
  host_name             = lookup(each.value, "host_name", "")
  protocol              = lookup(each.value, "protocol", "")
  tag                   = lookup(each.value, "tag", "")

}