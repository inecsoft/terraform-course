resource "aws_resourcegroups_group" "rg-web-prod" {
  name = "web-prod-rg"

  description = "group the prod-web servers"

  resource_query {
    query = <<JSON
{
  "ResourceTypeFilters": [
    "AWS::EC2::Instance"
  ],
  "TagFilters": [
    {
      "Key": "Name",
      "Values": [
        "prod-web-1a",
        "prod-web-1b",
        "prod-web-1c"]
    }
  ]
}
JSON
  }

  tags = {
    Name = "web-prod-rg"
  }
}