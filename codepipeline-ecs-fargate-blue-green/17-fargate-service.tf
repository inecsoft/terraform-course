#-------------------------------------------------------------------------------------------------
#https://aws.amazon.com/premiumsupport/knowledge-center/ecs-data-security-container-task/
    #  "environment": [
    #     {"name": "MYSQL_HOST", "value": "${module.db.this_db_instance_endpoint}"},
    #     {"name": "MYSQL_USER", "value": "${var.MYSQL_USER}"},
    #     {"name": "MYSQL_ROOT_PASSWORD", "value": "${var.MYSQL_PASSWORD}"},
    #     {"name": "MYSQL_DATABASE", "value": "${var.MYSQL_DATABASE}
    #  ],
#-------------------------------------------------------------------------------------------------
resource "aws_ecs_task_definition" "ecs-task-definition" {
  family             = "${local.default_name}-ecr-repository"
  execution_role_arn = aws_iam_role.iam-role-ecs-task-execution-role.arn
  task_role_arn      = aws_iam_role.iam-role-ecs-task-role.arn
  cpu                = 256
  memory             = 512
  #you must choose ip as the target type. tasks that use the awsvpc network mode are associated with an elastic network interface.
  network_mode       = "awsvpc"
  requires_compatibilities = [
    "FARGATE"
  ]

  container_definitions = <<DEFINITION
[
  {
    "essential": true,
    "image": "${aws_ecr_repository.ecr-repository.repository_url}",
    "name": "${local.default_name}-ecr-repository",
    "logConfiguration": {
            "logDriver": "awslogs",
            "options": {
               "awslogs-group" : "${local.default_name}-cloudwatch-log-group",
               "awslogs-region": "${var.AWS_REGION}",
               "awslogs-stream-prefix": "ecs"
            }
     },
     "secrets": [
        {
          "name": "DATABASE_PASSWORD",
          "valueFrom": "arn:aws:ssm:${var.AWS_REGION}:${data.aws_caller_identity.current.account_id}:parameter/DATABASE_PASSWORD"
        }
      ],
      "environment": [
        {"name": "MYSQL_HOST", "value": "${var.credentials.host}"},
        {"name": "MYSQL_USER", "value": "${var.MYSQL_USER}"},
        {"name": "MYSQL_ROOT_PASSWORD", "value": "${var.MYSQL_PASSWORD}"},
        {"name": "MYSQL_DATABASE", "value": "${var.MYSQL_DATABASE}"}
     ],
     "healthCheck": {
       "command": [ "CMD-SHELL", "curl -f http://localhost:3000/ || exit 1" ],
       "interval": 30,
       "retries": 3,
       "timeout": 5
     }, 
     "portMappings": [
        {
           "containerPort": 3000,
           "hostPort": 3000,
           "protocol": "tcp"
        }
     ]
  }
]
DEFINITION

}
#-------------------------------------------------------------------------------------------------
resource "aws_ecs_service" "ecs-service" {
  name            = "${local.default_name}-ecs-service"
  cluster         = aws_ecs_cluster.ecs-cluster-fargate.id
  desired_count   = 1
  task_definition = aws_ecs_task_definition.ecs-task-definition.arn
  launch_type     = "FARGATE"
  depends_on      = [aws_lb_listener.lb-listener]

  deployment_controller {
    type = "CODE_DEPLOY"
  }
#to be more secure use vpc.private_subnets and nat gateway
  network_configuration {
    subnets          = slice(module.vpc.public_subnets, 0, 3)
    security_groups  = [aws_security_group.sg-ecs.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.lb-target-group-blue.id
    container_name   = "${local.default_name}-ecr-repository"
    container_port   = "3000"
  }
  lifecycle {
    ignore_changes = [
      task_definition,
      load_balancer
    ]
  }
}
#-------------------------------------------------------------------------------------------------
# security group
#-------------------------------------------------------------------------------------------------
resource "aws_security_group" "sg-ecs" {
  name        = "${local.default_name}-sg-ecs"
  vpc_id      = module.vpc.vpc_id
  description = "ECS security group"

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    cidr_blocks = [
      "0.0.0.0/0"
    ]
  }
}
#-------------------------------------------------------------------------------------------------
# logs
#-------------------------------------------------------------------------------------------------
resource "aws_cloudwatch_log_group" "cloudwatch-log-group" {
  name = "/aws/codebuild/${local.default_name}-ecr-repository"

  tags = {
    Name = "${local.default_name}-ecr-repository"
  }
}
#-------------------------------------------------------------------------------------------------