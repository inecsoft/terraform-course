#----------------------------------------------------------------------------------------------------
resource "aws_flow_log" "project_vpc_flowlog" {
  iam_role_arn    = aws_iam_role.project_vpc_flowlogRole.arn
  log_destination = aws_cloudwatch_log_group.project_vpc_flowlogLoggroup.arn
  traffic_type    = "ALL"
  vpc_id          = module.vpc.vpc_id
}
#-----------------------------------------------------------------------------------------------------
resource "aws_cloudwatch_log_group" "project_vpc_flowlogLoggroup" {
  name = "project_vpc_flowlogLoggroup"

  tags = {
    Name = "project-vpc-flowlogLoggroup"
  }
}

#----------------------------------------------------------------------------------------------------