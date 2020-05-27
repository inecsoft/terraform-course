#---------------------------------------------------------------------------------------------------------
resource "aws_vpc_endpoint" "s3" {
#    cidr_blocks           = [
#        "52.218.0.0/17",
#        "54.231.128.0/19",
#    ]
#    dns_entry             = []
#    id                    = "vpce-0676b19197b4d17a9"
#    network_interface_ids = []
    policy                = jsonencode(
        {
            Statement = [
                {
                    Action    = "*"
                    Effect    = "Allow"
                    Principal = "*"
                    Resource  = "*"
                },
            ]
            Version   = "2008-10-17"
        }
    )
#    prefix_list_id        = "pl-6da54004"
    private_dns_enabled   = false
#    requester_managed     = false
    route_table_ids       =  module.vpc.private_route_table_ids 
    security_group_ids    = []
    service_name          = "com.amazonaws.eu-west-1.s3"
#    state                 = "available"
    subnet_ids            = []
	
    vpc_endpoint_type     = "Gateway"
    vpc_id                = module.vpc.vpc_id
    
    tags                  = {
        "Name" = "${local.default_name}"
    }
}
#---------------------------------------------------------------------------------------------------------
