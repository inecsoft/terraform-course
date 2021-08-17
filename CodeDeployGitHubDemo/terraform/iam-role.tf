#------------------------------------------------------------------
resource "aws_iam_role" "EC2InstanceRole" {
  name               = "EC2InstanceRole"
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
}
#------------------------------------------------------------------
resource "aws_iam_policy_attachment" "AmazonEC2RoleforAWSCodeDeploy-policy-attachment" {
  name       = "AmazonEC2RoleforAWSCodeDeploy-policy-attachment"
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2RoleforAWSCodeDeploy"
  groups     = []
  users      = []
  roles      = ["${aws_iam_role.EC2InstanceRole.name}"]
  depends_on = ["aws_iam_role.EC2InstanceRole"]
}
#------------------------------------------------------------------
resource "aws_iam_instance_profile" "EC2InstanceRoleProfile" {
  name       = "EC2InstanceRoleProfile"
  role       = aws_iam_role.EC2InstanceRole.name
  depends_on = ["aws_iam_role.EC2InstanceRole"]
}
#------------------------------------------------------------------
resource "aws_iam_role" "CodeDeployRole" {
  name               = "CodeDeployRole"
  description        = "Allows CodeDeploy to call AWS services such as Auto Scaling on your behalf."
  path               = "/"
  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "codedeploy.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
  tags = {
    "Description" = "codedeploy service role for tutorial"
    "Name"        = "codedeploy service role"
  }
}
#------------------------------------------------------------------
resource "aws_iam_policy_attachment" "AWSCodeDeployRole-policy-attachment" {
  name       = "AWSCodeDeployRole-policy-attachment"
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSCodeDeployRole"
  groups     = []
  users      = []
  roles      = ["${aws_iam_role.CodeDeployRole.name}"]
  depends_on = ["aws_iam_role.CodeDeployRole"]
}
#------------------------------------------------------------------
resource "aws_iam_role" "AWSCodePipelineServiceRole-eu-west-1-pipeline-codedeploy" {
  name               = "AWSCodePipelineServiceRole-eu-west-1-pipeline-codedeploy"
  path               = "/service-role/"
  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codepipeline.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
}
#------------------------------------------------------------------
resource "aws_iam_policy_attachment" "AWSCodePipelineServiceRole-eu-west-1-pipeline-codedeploy-policy-attachment" {
  name       = "AWSCodePipelineServiceRole-eu-west-1-pipeline-codedeploy-policy-attachment"
  policy_arn = aws_iam_policy.AWSCodePipelineServiceRole-pipeline-codedeploy-policy.arn
  groups     = []
  users      = []
  roles      = ["${aws_iam_role.AWSCodePipelineServiceRole-eu-west-1-pipeline-codedeploy.name}"]
  depends_on = ["aws_iam_role.AWSCodePipelineServiceRole-eu-west-1-pipeline-codedeploy"]
}
#------------------------------------------------------------------

resource "aws_iam_policy" "AWSCodePipelineServiceRole-pipeline-codedeploy-policy" {
  name        = "AWSCodePipelineServiceRole-pipeline-codedeploy-policy"
  path        = "/service-role/"
  description = "Policy used in trust relationship with CodePipeline"
  policy      = <<POLICY
{
  "Statement": [
    {
      "Action": [
        "iam:PassRole"
      ],
      "Resource": "*",
      "Effect": "Allow",
      "Condition": {
        "StringEqualsIfExists": {
          "iam:PassedToService": [
            "cloudformation.amazonaws.com",
            "elasticbeanstalk.amazonaws.com",
            "ec2.amazonaws.com",
            "ecs-tasks.amazonaws.com"
          ]
        }
      }
    },
    {
      "Action": [
        "codecommit:CancelUploadArchive",
        "codecommit:GetBranch",
        "codecommit:GetCommit",
        "codecommit:GetUploadArchiveStatus",
        "codecommit:UploadArchive"
      ],
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Action": [
        "codedeploy:CreateDeployment",
        "codedeploy:GetApplication",
        "codedeploy:GetApplicationRevision",
        "codedeploy:GetDeployment",
        "codedeploy:GetDeploymentConfig",
        "codedeploy:RegisterApplicationRevision"
      ],
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Action": [
        "elasticbeanstalk:*",
        "ec2:*",
        "elasticloadbalancing:*",
        "autoscaling:*",
        "cloudwatch:*",
        "s3:*",
        "sns:*",
        "cloudformation:*",
        "rds:*",
        "sqs:*",
        "ecs:*"
      ],
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Action": [
        "lambda:InvokeFunction",
        "lambda:ListFunctions"
      ],
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Action": [
        "opsworks:CreateDeployment",
        "opsworks:DescribeApps",
        "opsworks:DescribeCommands",
        "opsworks:DescribeDeployments",
        "opsworks:DescribeInstances",
        "opsworks:DescribeStacks",
        "opsworks:UpdateApp",
        "opsworks:UpdateStack"
      ],
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Action": [
        "cloudformation:CreateStack",
        "cloudformation:DeleteStack",
        "cloudformation:DescribeStacks",
        "cloudformation:UpdateStack",
        "cloudformation:CreateChangeSet",
        "cloudformation:DeleteChangeSet",
        "cloudformation:DescribeChangeSet",
        "cloudformation:ExecuteChangeSet",
        "cloudformation:SetStackPolicy",
        "cloudformation:ValidateTemplate"
      ],
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Action": [
        "codebuild:BatchGetBuilds",
        "codebuild:StartBuild"
      ],
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Effect": "Allow",
      "Action": [
        "devicefarm:ListProjects",
        "devicefarm:ListDevicePools",
        "devicefarm:GetRun",
        "devicefarm:GetUpload",
        "devicefarm:CreateUpload",
        "devicefarm:ScheduleRun"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "servicecatalog:ListProvisioningArtifacts",
        "servicecatalog:CreateProvisioningArtifact",
        "servicecatalog:DescribeProvisioningArtifact",
        "servicecatalog:DeleteProvisioningArtifact",
        "servicecatalog:UpdateProduct"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudformation:ValidateTemplate"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ecr:DescribeImages"
      ],
      "Resource": "*"
    }
  ],
  "Version": "2012-10-17"
}
POLICY
}
#------------------------------------------------------------------------------------------------------
