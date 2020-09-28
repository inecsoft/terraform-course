#-----------------------------------------------------------------------------------------------
resource "aws_iam_role" "ec2-spot-fleet-tagging-role" {
    name               = "${local.default_name}-ec2-spot-fleet-tagging-role"
    path               = "/"
    assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "spotfleet.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
}
#-----------------------------------------------------------------------------------------------
resource "aws_iam_policy_attachment" "ec2-spot-fleet-tagging-role-policy-attachment-1" {
    name       = "${local.default_name}-ec2-spot-fleet-tagging-role-policy-attachment"
    policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2SpotFleetTaggingRole"
    groups     = []
    users      = []
    roles      = [aws_iam_role.ec2-spot-fleet-tagging-role.name]
    depends_on = [aws_iam_role.ec2-spot-fleet-tagging-role]
}
#-----------------------------------------------------------------------------------------------
resource "aws_iam_policy_attachment" "ec2-spot-fleet-ec2read-role-policy-attachment-2" {
    name       = "${local.default_name}-ec2-spot-fleet-ec2read-role-policy-attachment"
    policy_arn = "arn:aws:iam::aws:policy/amazonEC2Readonlyaccess"
    groups     = []
    users      = []
    roles      = [aws_iam_role.ec2-spot-fleet-tagging-role.name]
    depends_on = [aws_iam_role.ec2-spot-fleet-tagging-role]
}
#-----------------------------------------------------------------------------------------------
