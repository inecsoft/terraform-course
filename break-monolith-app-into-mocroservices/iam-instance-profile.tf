#-------------------------------------------------------------
resource "aws_iam_role" "cwa-role" {
    name               = "${local.default_name}-instance-role"
    path               = "/"
    assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": ["ec2.amazonaws.com"]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY

  tags = {
    Name = "${local.default_name}-instance-role" 
    Description = "IAM Role to Use for CloudwatchAgentServerRole Integration"
  }
}
#-------------------------------------------------------------
resource "aws_iam_policy_attachment" "cwa-policy-attachment" {
  name       = "${local.default_name}-CloudWatchAgentServer-policy-attach"
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy"
  groups     = []
  users      = []
  roles      = [ aws_iam_role.cwa-role.name ]
  depends_on = [ aws_iam_role.cwa-role ]
}
#-------------------------------------------------------------
resource "aws_iam_policy_attachment" "ssm-policy-attachment" {
  name       = "${local.default_name}-ssm-policy-attach"
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
  groups     = []
  users      = []
  roles      = [ aws_iam_role.cwa-role.name ]
  depends_on = [ aws_iam_role.cwa-role ]
}
#-------------------------------------------------------------
resource "aws_iam_policy_attachment" "ecs-policy-attachment" {
  name       = "${local.default_name}-ssm-policy-attach"
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
  groups     = []
  users      = []
  roles      = [ aws_iam_role.cwa-role.name ]
  depends_on = [ aws_iam_role.cwa-role ]
}
#------------------------------------------------------------------
resource "aws_iam_instance_profile" "instance-RoleProfile" {
  name = "${local.default_name}-instance-RoleProfile"
  role = aws_iam_role.cwa-role.name
  depends_on = [aws_iam_role.cwa-role]
}
#------------------------------------------------------------------
