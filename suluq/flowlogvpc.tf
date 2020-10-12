#----------------------------------------------------------------------------------------------------
resource "aws_flow_log" "suluq_vpc_flowlog" {
  iam_role_arn    = "${aws_iam_role.suluq_vpc_flowlogRole.arn}"
  log_destination = "${aws_cloudwatch_log_group.suluq_vpc_flowlogLoggroup.arn}"
  traffic_type    = "ALL"
  vpc_id          = module.vpc.vpc_id
}
#-----------------------------------------------------------------------------------------------------
resource "aws_cloudwatch_log_group" "suluq_vpc_flowlogLoggroup" {
  name = "${local.default_name}-flowlogLoggroup"

}

#----------------------------------------------------------------------------------------------------
