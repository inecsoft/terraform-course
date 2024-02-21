resource "aws_ce_cost_allocation_tag" "ce_cost_allocation_tag" {
  tag_key = "ce_cost_allocation_tag"
  status  = "Active"
}

resource "aws_resourcegroups_group" "resourcegroups_group_cost" {
	name = "test-group"

	resource_query {
		query = <<JSON
		{
			"ResourceTypeFilters": [
				"AWS::*"
			],
			"TagFilters": [
				{
				"Key": "Environment",
				"Values": ["Prod"]
				}
			]
		}
		JSON
	}
}