variable "parameters" {
  type = list(object({
    prefix = string
    type  = string
    parameters = list(object({
      name  = string
      value = string
      
    }))
  }))
  default = []
}