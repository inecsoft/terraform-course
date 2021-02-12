locals {
  parameters = [
    {
      "prefix" = "/myprefix"
      "parameters" = [
        {
          "name"  = "myparameter"
          "value" = "myvalue"
          "type" = "String"
        },
        {
          "name"  = "environment"
          "value" = "dev"
          "type" = "String"
        }
      ]
    },
    {
      "prefix" = "/myapp"
      "parameters" = [
        {
          "name"  = "environment"
          "value" = "prod"
          "type" = "String"
        }
      ]
    }
  ]
}

module "parameters" {
  source     = "./ssm-parameter"
  parameters = local.parameters
}