#--------------------------------------------------------------------------------------
data "aws_iam_policy_document" "ecs_service_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs.amazonaws.com"]
    }
  }
}
#--------------------------------------------------------------------------------------
resource "aws_iam_role" "ecs_service_role" {
  name               = "ecs-service-role"
  path               = "/"
  assume_role_policy = data.aws_iam_policy_document.ecs_service_policy.json
}

#--------------------------------------------------------------------------------------

data "aws_iam_policy_document" "iam_policy_ecs_service_role" {
  statement {
    sid       = "ECSTaskManagement"
    effect    = "Allow"
    resources = ["*"]

    actions = [
      "ec2:AttachNetworkInterface",
      "ec2:CreateNetworkInterface",
      "ec2:CreateNetworkInterfacePermission",
      "ec2:DeleteNetworkInterface",
      "ec2:DeleteNetworkInterfacePermission",
      "ec2:Describe*",
      "ec2:DetachNetworkInterface",
      "ec2:AuthorizeSecurityGroupIngress",
      "elasticloadbalancing:DeregisterInstancesFromLoadBalancer",
      "elasticloadbalancing:DeregisterTargets",
      "elasticloadbalancing:Describe*",
      "elasticloadbalancing:RegisterInstancesWithLoadBalancer",
      "elasticloadbalancing:RegisterTargets",
      "route53:ChangeResourceRecordSets",
      "route53:CreateHealthCheck",
      "route53:DeleteHealthCheck",
      "route53:Get*",
      "route53:List*",
      "route53:UpdateHealthCheck",
      "servicediscovery:DeregisterInstance",
      "servicediscovery:Get*",
      "servicediscovery:List*",
      "servicediscovery:RegisterInstance",
      "servicediscovery:UpdateInstanceCustomHealthStatus",
    ]
  }

  statement {
    sid       = "AutoScaling"
    effect    = "Allow"
    resources = ["*"]
    actions   = ["autoscaling:Describe*"]
  }

  statement {
    sid       = "AutoScalingManagement"
    effect    = "Allow"
    resources = ["*"]

    actions = [
      "autoscaling:DeletePolicy",
      "autoscaling:PutScalingPolicy",
      "autoscaling:SetInstanceProtection",
      "autoscaling:UpdateAutoScalingGroup",
      "autoscaling:PutLifecycleHook",
      "autoscaling:DeleteLifecycleHook",
      "autoscaling:CompleteLifecycleAction",
      "autoscaling:RecordLifecycleActionHeartbeat",
    ]

    condition {
      test     = "Null"
      variable = "autoscaling:ResourceTag/AmazonECSManaged"
      values   = ["false"]
    }
  }

  statement {
    sid       = "AutoScalingPlanManagement"
    effect    = "Allow"
    resources = ["*"]

    actions = [
      "autoscaling-plans:CreateScalingPlan",
      "autoscaling-plans:DeleteScalingPlan",
      "autoscaling-plans:DescribeScalingPlans",
      "autoscaling-plans:DescribeScalingPlanResources",
    ]
  }

  statement {
    sid       = "EventBridge"
    effect    = "Allow"
    resources = ["arn:aws:events:*:*:rule/ecs-managed-*"]

    actions = [
      "events:DescribeRule",
      "events:ListTargetsByRule",
    ]
  }

  statement {
    sid       = "EventBridgeRuleManagement"
    effect    = "Allow"
    resources = ["*"]

    actions = [
      "events:PutRule",
      "events:PutTargets",
    ]

    condition {
      test     = "StringEquals"
      variable = "events:ManagedBy"
      values   = ["ecs.amazonaws.com"]
    }
  }

  statement {
    sid       = "CWAlarmManagement"
    effect    = "Allow"
    resources = ["arn:aws:cloudwatch:*:*:alarm:*"]

    actions = [
      "cloudwatch:DeleteAlarms",
      "cloudwatch:DescribeAlarms",
      "cloudwatch:PutMetricAlarm",
    ]
  }

  statement {
    sid       = "ECSTagging"
    effect    = "Allow"
    resources = ["arn:aws:ec2:*:*:network-interface/*"]
    actions   = ["ec2:CreateTags"]
  }

  statement {
    sid       = "CWLogGroupManagement"
    effect    = "Allow"
    resources = ["arn:aws:logs:*:*:log-group:/aws/ecs/*"]

    actions = [
      "logs:CreateLogGroup",
      "logs:DescribeLogGroups",
      "logs:PutRetentionPolicy",
    ]
  }

  statement {
    sid       = "CWLogStreamManagement"
    effect    = "Allow"
    resources = ["arn:aws:logs:*:*:log-group:/aws/ecs/*:log-stream:*"]

    actions = [
      "logs:CreateLogStream",
      "logs:DescribeLogStreams",
      "logs:PutLogEvents",
    ]
  }

  statement {
    sid       = "ExecuteCommandSessionManagement"
    effect    = "Allow"
    resources = ["*"]
    actions   = ["ssm:DescribeSessions"]
  }

  statement {
    sid    = "ExecuteCommand"
    effect = "Allow"

    resources = [
      "arn:aws:ecs:*:*:task/*",
      "arn:aws:ssm:*:*:document/AmazonECS-ExecuteInteractiveCommand",
    ]

    actions = ["ssm:StartSession"]
  }

  statement {
    sid       = "CloudMapResourceCreation"
    effect    = "Allow"
    resources = ["*"]

    actions = [
      "servicediscovery:CreateHttpNamespace",
      "servicediscovery:CreateService",
    ]

    condition {
      test     = "ForAllValues:StringEquals"
      variable = "aws:TagKeys"
      values   = ["AmazonECSManaged"]
    }
  }

  statement {
    sid       = "CloudMapResourceTagging"
    effect    = "Allow"
    resources = ["*"]
    actions   = ["servicediscovery:TagResource"]

    condition {
      test     = "StringLike"
      variable = "aws:RequestTag/AmazonECSManaged"
      values   = ["*"]
    }
  }

  statement {
    sid       = "CloudMapResourceDeletion"
    effect    = "Allow"
    resources = ["*"]
    actions   = ["servicediscovery:DeleteService"]

    condition {
      test     = "Null"
      variable = "aws:ResourceTag/AmazonECSManaged"
      values   = ["false"]
    }
  }

  statement {
    sid       = "CloudMapResourceDiscovery"
    effect    = "Allow"
    resources = ["*"]

    actions = [
      "servicediscovery:DiscoverInstances",
      "servicediscovery:DiscoverInstancesRevision",
    ]
  }
}

resource "aws_iam_role_policy" "iam_role_policy_ecs_service_fargate" {
  role   = aws_iam_role.ecs_service_role.name
  policy = data.aws_iam_policy_document.iam_policy_ecs_service_role.json
}

# resource "aws_iam_role_policy_attachment" "ecs_service_role_attachment" {
#   role       = aws_iam_role.ecs_service_role.name
#   policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceRole"
# }

#######################################################################################
#--------------------------------------------------------------------------------------
data "aws_iam_policy_document" "ecs_instance_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

#--------------------------------------------------------------------------------------
resource "aws_iam_role" "ecs_instance_role" {
  name               = "ecs-instance-role"
  path               = "/"
  assume_role_policy = data.aws_iam_policy_document.ecs_instance_policy.json
}

#--------------------------------------------------------------------------------------
resource "aws_iam_role_policy" "ecs_ec2_role-policy" {
  name   = "ecs-ec2-role-policy"
  role   = aws_iam_role.ecs_instance_role.id
  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
              "ecs:CreateCluster",
              "ecs:DeregisterContainerInstance",
              "ecs:DiscoverPollEndpoint",
              "ecs:Poll",
              "ecs:RegisterContainerInstance",
              "ecs:StartTelemetrySession",
              "ecs:Submit*",
              "ecs:StartTask",
              "ecr:GetAuthorizationToken",
              "ecr:BatchCheckLayerAvailability",
              "ecr:GetDownloadUrlForLayer",
              "ecr:BatchGetImage",
              "logs:CreateLogStream",
              "logs:PutLogEvents"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents",
                "logs:DescribeLogStreams"
            ],
            "Resource": [
                "arn:aws:logs:*:*:*"
            ]
        }
    ]
}
EOF

}

#--------------------------------------------------------------------------------------
resource "aws_iam_role_policy_attachment" "ecs-instance-role-attachment" {
  role       = aws_iam_role.ecs_instance_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
}

#--------------------------------------------------------------------------------------
resource "aws_iam_instance_profile" "ecs_instance_profile" {
  name = "ecs-instance-profile"
  role = aws_iam_role.ecs_instance_role.id
}

#--------------------------------------------------------------------------------------

data "aws_iam_policy_document" "ecsTaskExecutionRole_policy" {
  statement {
    sid     = ""
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "ecsTaskExecution_role" {
  name               = "ecsTaskExecutionRole-fargate"
  path               = "/"
  assume_role_policy = data.aws_iam_policy_document.ecsTaskExecutionRole_policy.json
}




resource "aws_iam_role_policy" "ecs-task-execution-role-policy" {
  name = "ecs-task-execution-role-policy"
  role = aws_iam_role.ecsTaskExecution_role.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ecr:GetAuthorizationToken",
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer",
        "ecr:BatchGetImage",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "ssm:GetParameters",
        "ssm:GetParameter",
        "secretsmanager:GetSecretValue"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "secretsmanager:GetSecretValue"
      ],
      "Resource": "${aws_secretsmanager_secret_version.secret_version.arn}"
    }
  ]
}
EOF

}