# % terraform import aws_resourcegroups_group.foo resource-group-name

resource "aws_resourcegroups_group" "resourcegroups_group_cost" {
	name = "resourcegroups_group_cost"

	resource_query {
		query = jsonencode(
			{
				ResourceTypeFilters = [
					"AWS::AllSupported",
				]
				TagFilters          = [
					{
						Key    = "Environment"
						Values = [
							"Prod",
						]
					},
				]
			}
		)
	}
}