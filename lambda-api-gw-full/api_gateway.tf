#-----------------------------------------------------------------------------
resource "aws_api_gateway_rest_api" "example" {
  name        = "ServerlessExample"
  description = "Terraform Serverless Application Example"
}

#-----------------------------------------------------------------------------
#In order to test the created API you will need to access its test URL
#-----------------------------------------------------------------------------
output "base_url_dev" {
  value = aws_api_gateway_deployment.dev.invoke_url
}

#-----------------------------------------------------------------------------
output "base_url_prod" {
  value = aws_api_gateway_deployment.prod.invoke_url
}

#-----------------------------------------------------------------------------
