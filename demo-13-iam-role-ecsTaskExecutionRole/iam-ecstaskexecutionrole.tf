#----------------------------------------------------------------------------------------
resource "aws_iam_role" "ecsTaskExecutionRole" {
    name               = "ecsTaskExecutionRole"
    path               = "/"
    assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
    description  = "Allows ECS tasks to call AWS services on your behalf."
    tags = {
        "Name" = "ecstaskexecutionrole"
        "Description" = "Allows ECS tasks to call AWS services on your behalf."
    }
}
#----------------------------------------------------------------------------------------
resource "aws_iam_policy_attachment" "AmazonECSTaskExecutionRolePolicy-policy-attachment" {
    name       = "AmazonECSTaskExecutionRolePolicy-policy-attachment"
    policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
    groups     = []
    users      = []
    roles      = ["ecsTaskExecutionRole"]
}
#----------------------------------------------------------------------------------------

