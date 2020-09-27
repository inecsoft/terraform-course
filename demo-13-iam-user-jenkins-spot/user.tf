#--------------------------------------------------------------------------------------------------
#user to attache to jenkins instance plug-in
#spot instances can save up to 70-90% cost vs on-demand
#issues the impact of interruptions within 2 min notifications when aws needs the capacity back.
#you need your workload spot ready
#--------------------------------------------------------------------------------------------------
resource "aws_iam_user" "user" {
  name = "${local.default_name}-user-jenkins"
  path = "/"
  force_destroy = true
   
  tags = {
    Name  = "${local.default_name}-user-jenkins"
  }
}
#----------------------------------------------------------------------------------------------------
resource "aws_iam_policy_attachment" "user-policy-attach-1" {
  name       = "${local.default_name}-user-policy-attach-jenkins"
  users      = [aws_iam_user.user.name]
  roles      = []
  groups     = []
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ReadOnlyAccess"
}
#----------------------------------------------------------------------------------------------------
resource "aws_iam_policy_attachment" "user-policy-attach-2" {
  name       = "${local.default_name}-user-policy-attach-jenkins"
  users      = [aws_iam_user.user.name]
  roles      = []
  groups     = []
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2SpotFleetTaggingRole"
}
#----------------------------------------------------------------------------------------------------
output "user-name" {
  description = "description of user for jenkins plug-in"
  value       = aws_iam_user.user.name
}
output "user-unique_id" {
  description = "description of user for jenkins plug-in"
  value       = aws_iam_user.user.unique_id
}

#----------------------------------------------------------------------------------------------------