#-----------------------------------------------------------------------------------------------
resource "aws_iam_role" "ec2-spot-fleet-tagging-role" {
    name               = "${local.default_name}-ec2-spot-fleet"
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
# resource "aws_iam_service_linked_role" "ec2-spot-fleet" {
#   aws_service_name = "spotfleet.amazonaws.com"
#   description      = "Default EC2 Spot Fleet Service Linked Role"
# }
# output "ec2-spot-fleet" {
#   description = "ec2-spot-fleet service role linked"
#   value       = aws_iam_service_linked_role.ec2-spot-fleet.arn
# }

#-----------------------------------------------------------------------------------------------
resource "aws_iam_policy_attachment" "ec2-spot-fleet-tagging-role-policy-attachment-1" {
  name       = "${local.default_name}-ec2-spot-fleet-tagging-role-policy-attachment"
  policy_arn = aws_iam_policy.ec2-spot-fleet-tagging-role-policy.arn
  groups     = []
  users      = []
  roles      = [ aws_iam_role.ec2-spot-fleet-tagging-role.name ]   
}
#-----------------------------------------------------------------------------------------------
resource "aws_iam_policy" "ec2-spot-fleet-tagging-role-policy" {
  name        = "${local.default_name}-ec2-spot-fleet-tagging-role-policy"
  path        = "/"
  description = "ec2-spot-fleet-tagging-role-policy"

  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ec2:DescribeImages",
                "ec2:DescribeSubnets",
                "ec2:RequestSpotInstances",
                "ec2:DescribeInstanceStatus",
                "ec2:RunInstances"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "iam:PassRole"
            ],
            "Resource": [
                "*"
            ],
            "Condition": {
                "StringEquals": {
                    "iam:PassedToService": [
                        "ec2.amazonaws.com",
                        "ec2.amazonaws.com.cn"
                    ]
                }
            }
        },
        {
            "Effect": "Allow",
            "Action": [
                "ec2:CreateTags"
            ],
            "Resource": [
                "arn:aws:ec2:*:*:instance/*",
                "arn:aws:ec2:*:*:spot-instances-request/*",
                "arn:aws:ec2:*:*:spot-fleet-request/*",
                "arn:aws:ec2:*:*:volume/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "ec2:TerminateInstances"
            ],
            "Resource": "*",
            "Condition": {
                "StringLike": {
                    "ec2:ResourceTag/aws:ec2spot:fleet-request-id": "*"
                }
            }
        },
        {
            "Effect": "Allow",
            "Action": [
                "elasticloadbalancing:RegisterInstancesWithLoadBalancer"
            ],
            "Resource": [
                "arn:aws:elasticloadbalancing:*:*:loadbalancer/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "elasticloadbalancing:RegisterTargets"
            ],
            "Resource": [
                "arn:aws:elasticloadbalancing:*:*:*/*"
            ]
        }
    ]
}
EOF
}
#-----------------------------------------------------------------------------------------------
#imported role
#https://docs.aws.amazon.com/batch/latest/userguide/spot_fleet_IAM_role.html
#-----------------------------------------------------------------------------------------------
# resource "aws_iam_role" "AWSServiceRoleForEC2SpotFleet" {
#     name               = "AWSServiceRoleForEC2SpotFleet"
#     path               = "/aws-service-role/spotfleet.amazonaws.com/"
#     assume_role_policy = <<POLICY
# {
#   "Version": "2012-10-17",
#   "Statement": [
#     {
#       "Effect": "Allow",
#       "Principal": {
#         "Service": "spotfleet.amazonaws.com"
#       },
#       "Action": "sts:AssumeRole"
#     }
#   ]
# }
# POLICY
# }
#-----------------------------------------------------------------------------------------------
# resource "aws_iam_policy_attachment" "AWSEC2SpotFleetServiceRolePolicy-policy-attachment" {
#     name       = "AWSEC2SpotFleetServiceRolePolicy-policy-attachment"
#     policy_arn = "arn:aws:iam::aws:policy/aws-service-role/AWSEC2SpotFleetServiceRolePolicy"
#     groups     = []
#     users      = []
#     roles      = ["AWSServiceRoleForEC2SpotFleet"]
# }
#-----------------------------------------------------------------------------------------------