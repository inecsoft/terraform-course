#--------------------------------------------------------------------------------------
# A policy for the iot thing that allowes  beam inbound
#--------------------------------------------------------------------------------------
resource "aws_iot_policy" "iot-policy" {
  name = "${local.default_name}-iot-policy"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "iot:Connect",
        "iot:Subscribe"
      ],
      "Resource": "arn:aws:iot:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "iot:Publish"
      ],
      "Resource": "arn:aws:iot:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:topic/beam"
    }
  ]
}
EOF
}
#--------------------------------------------------------------------------------------
# Attach policy generated above to the aws iot thing(s)
#--------------------------------------------------------------------------------------
resource "aws_iot_policy_attachment" "iot-policy-attach" {
  for_each = toset(var.iot-name)

  policy = aws_iot_policy.iot-policy.name
  target = aws_iot_certificate.iot-cert[each.key].arn
}
#--------------------------------------------------------------------------------------
# The role for the sns topic
#--------------------------------------------------------------------------------------
resource "aws_iam_role" "iam-role-sns" {
  name = "${local.default_name}-iam-role-sns"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "iot.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}
#--------------------------------------------------------------------------------------
# Policy that allows our iot thing to access our sns topic
#--------------------------------------------------------------------------------------
resource "aws_iam_role_policy" "iam-policy-role-sns" {
  name = "${local.default_name}-iam-policy-role-sns"
  role = aws_iam_role.iam-role-sns.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
        "Effect": "Allow",
        "Action": [
            "sns:Publish"
        ],
        "Resource": "${aws_sns_topic.iot-sns-topic.arn}"
    }
  ]
}
EOF
}
#--------------------------------------------------------------------------------------

#--------------------------------------------------------------------------------------