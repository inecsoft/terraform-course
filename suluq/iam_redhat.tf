##########################################
# IAM assumable role with custom policies
##########################################

#-------------------------------------------------------------
resource "aws_iam_role" "iam_assumable_role_custom" {
    name               = "${local.default_name}-redhat-role"
    path               = "/"
    assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
tags = {
  Name = "${local.default_name}-redhat-role" 
  Description = "IAM Role authorizes the instance to be use by SSM. Provides CloudWatch and SSM integration"
  }
}
#-------------------------------------------------------------
resource "aws_iam_policy_attachment" "iam_assumable_role_custom-attachment" {
    count = 4
    name       = "${local.default_name}-redhat-role-attachment-${count.index}"
    depends_on = [aws_iam_role.iam_assumable_role_custom]
    policy_arn = element([
    "arn:aws:iam::aws:policy/service-role/AmazonEC2RoleforSSM",
    "arn:aws:iam::aws:policy/CloudWatchAgentAdminPolicy",
    "arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy",
    "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"], count.index)
  
    groups     = []
    users      = []
    roles      = ["${aws_iam_role.iam_assumable_role_custom.name}"]
}

resource "aws_iam_instance_profile" "iam_assumable_role_custom-ServeriRoleProfile" {
  name = "${local.default_name}-redhat-role-ServerRoleProfile"
  role = "${aws_iam_role.iam_assumable_role_custom.name}"
  depends_on = [aws_iam_role.iam_assumable_role_custom]
}
#----------------------------------------------------------------