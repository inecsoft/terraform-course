variable "devops_users" {
  type    = list(any)
  default = ["iarteaga"]

  # Only allow lowercase characters
  validation {
    condition = length([
      for user in var.devops_users : true
      if can(regex("[[:lower:]]", user))
    ]) == length(var.devops_users)
    error_message = "DevOps usernames must be all lowercase characters."
  }
}

variable "win-service" {
  type    = list(any)
  default = ["dcs-srv"]

  # Only allow lowercase characters
  validation {
    condition = length([
      for user in var.win-service : true
      if can(regex("[[:lower:]]", user))
    ]) == length(var.win-service)
    error_message = "DevOps usernames must be all lowercase characters."
  }
}

variable "project_tags" {
  default = {
    Project     = "TfGM Corporate CDS-Devops"
    Environment = "dev"
  }
}

variable "vm_size" {
  default = "Standard_D2s_v3"
  type    = string
}

data "http" "workstation-external-ip" {
  url = "http://ipv4.icanhazip.com"
}

locals {
  default_name = join("-", tolist([terraform.workspace, "win-service"]))
}

locals {
  app_version = formatdate("YYYYMMDDHHmmss", timestamp())
}

resource "random_password" "password" {
  length           = 16
  special          = true
  override_special = "_%@\""
  #override_special = "%\"@_"
}
#echo random_password.password.result | terraform console