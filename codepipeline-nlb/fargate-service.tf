#------------------------------------------------------------------------------------------------------
resource "aws_ecs_task_definition" "codepipeline" {
  family             = "codepipeline"
  execution_role_arn = aws_iam_role.ecs-task-execution-role.arn
  task_role_arn      = aws_iam_role.ecs-task-role.arn
  cpu                = 256
  memory             = 512
  #The host and awsvpc network modes offer the highest networking performance for containers because
  # they use the Amazon EC2 network stack instead of the virtualized network stack provided by the bridge mode.
  # With the host and awsvpc network modes, exposed container ports are mapped directly to the corresponding host port
  # (for the host network mode) or the attached elastic network interface port (for the awsvpc network mode),
  # so you cannot take advantage of dynamic host port mappings.
  network_mode       = "awsvpc"
  requires_compatibilities = [
    "FARGATE"
  ]

 #container_definitions = "${file("task-definitions/service.json")}"

     #"environment": [
     #   {
     #     "name": "DATABASE_URL",
     #     "value": "mariadb://db_admin:YOUR_DB_PASSWORD@YOUR_DB_HOST:3306/express_app?ssl=Amazon+RDS"
     #   }
     # ],

  container_definitions = <<DEFINITION
[
  {
    "essential": true,
    "image": "${aws_ecr_repository.codepipeline.repository_url}",
    "name": "codepipeline",
    "logConfiguration": {
            "logDriver": "awslogs",
            "options": {
               "awslogs-group" : "codepipeline",
               "awslogs-region": "${var.AWS_REGION}",
               "awslogs-stream-prefix": "ecs"
            }
     },
     "secrets": [],
     "environment": [],
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
#------------------------------------------------------------------------------------------------------
resource "aws_ecs_service" "codepipeline" {
  name            = "codepipeline"
  cluster         = aws_ecs_cluster.codepipeline.id
  desired_count   = 1
  task_definition = aws_ecs_task_definition.codepipeline.arn
  launch_type     = "FARGATE"
  depends_on      = [aws_lb_listener.codepipeline]

  deployment_controller {
    type = "CODE_DEPLOY"
  }
  #--------------------------------------------------------------------------------------------------------
  #you can change the subnet to private but you nee to make sure that you use nat gateway.
  #------------------------------------------------------------------------------------------------------
  network_configuration {
    subnets          = slice(module.vpc.private_subnets, 0, 3)
    security_groups  = [aws_security_group.ecs-codepipeline.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.blue.id
    container_name   = "codepipeline"
    container_port   = "3000"
  }
  lifecycle {
    ignore_changes = [
      task_definition,
      load_balancer
    ]
  }
}
#------------------------------------------------------------------------------------------------------
# security group
#------------------------------------------------------------------------------------------------------
resource "aws_security_group" "ecs-codepipeline" {
  name        = "ECS codepipeline"
  vpc_id      = module.vpc.vpc_id
  description = "ECS codepipeline"

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
#------------------------------------------------------------------------------------------------------
# logs
#------------------------------------------------------------------------------------------------------
resource "aws_cloudwatch_log_group" "codepipeline" {
  name = "codepipeline"
}
#------------------------------------------------------------------------------------------------------
