#-----------------------------------------------------------------------------
resource "aws_api_gateway_rest_api" "example" {
  name        = "ServerlessExample"
  description = "Terraform Serverless Application Example"
}
#-----------------------------------------------------------------------------
#In order to test the created API you will need to access its test URL
#-----------------------------------------------------------------------------
output "base_url" {
  value = "${aws_api_gateway_deployment.example.invoke_url}"
}
#-----------------------------------------------------------------------------

