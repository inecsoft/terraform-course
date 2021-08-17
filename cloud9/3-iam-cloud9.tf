data "aws_vpc" "selected" {
  filter {
    name   = "tag:Name"
    values = ["${local.default_name}-vpc"] # insert values here
  }
}
#--------------------------------------------------------------------------------
data "aws_subnet_ids" "subnet-ids" {
  vpc_id = data.aws_vpc.selected.id

  filter {
    name   = "tag:Name"
    values = ["${local.default_name}-subnet"] # insert values here
  }
}
#--------------------------------------------------------------------------------
resource "aws_cloud9_environment_ec2" "cloud9-environment-ec2" {
  instance_type = "t2.micro"
  name          = "${local.default_name}-cloud9-team-colaboration"
  description   = "Testing the cloud9 shared environment"
  #echo 'slice(["a", "b", "c", "d"], 0, 1)' | terraform console
  subnet_id = slice(data.aws_subnet_ids.subnet-ids.ids, 0, 1)

  tags = {
    Name = "${local.default_name}-cloud9-team-colaboration"
  }
}
#--------------------------------------------------------------------------------
# aws iam create-group --group-name Cloud9GroupUsers
# aws iam create-group --group-name Cloud9GroupAdmins
#--------------------------------------------------------------------------------
resource "aws_iam_group" "iam-group-Cloud9GroupUsers" {
  name = "${local.default_name}-iam-group-Cloud9GroupUsers"
  path = "/users/"
}
#--------------------------------------------------------------------------------
resource "aws_iam_group" "iam-group-Cloud9GroupAdmins" {
  name = "${local.default_name}-iam-group-Cloud9GroupAdmins"
  path = "/users/"
}
#--------------------------------------------------------------------------------
#aws iam add-user-to-group --group-name Cloud9GroupUsers --user-name MyCloud9User
#--------------------------------------------------------------------------------
#aws iam attach-group-policy --group-name MyCloud9Group --policy-arn arn:aws:iam::aws:policy/AWSCloud9User
#--------------------------------------------------------------------------------
resource "aws_iam_policy_attachment" "iam-policy-attach-Cloud9GroupUsers" {
  name       = "${local.default_name}-iam-policy-attach-Cloud9GroupUsers"
  users      = []
  roles      = []
  groups     = [aws_iam_group.iam-group-Cloud9GroupUsers.name]
  policy_arn = "arn:aws:iam::aws:policy/AWSCloud9User"
}
#--------------------------------------------------------------------------------
#aws iam attach-group-policy --group-name MyCloud9Group --policy-arn arn:aws:iam::aws:policy/AWSCloud9Administrator
#--------------------------------------------------------------------------------
resource "aws_iam_policy_attachment" "iam-policy-attach-Cloud9GroupAdmins" {
  name       = "${local.default_name}-iam-policy-attach-Cloud9GroupAdmins"
  users      = []
  roles      = []
  groups     = [aws_iam_group.iam-group-Cloud9GroupAdmins.name]
  policy_arn = "arn:aws:iam::aws:policy/AWSCloud9Administrator"
}
#--------------------------------------------------------------------------------