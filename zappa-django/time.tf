locals {
  timestamp = "${timestamp()}"
}
output "time" {
  value =  "${local.timestamp}"
}