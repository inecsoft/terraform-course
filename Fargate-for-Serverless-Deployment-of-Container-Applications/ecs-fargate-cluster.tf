resource "aws_ecr_repository" "ecr_repository_fargate" {
  name                 = "ca-container-registry"
  image_tag_mutability = "MUTABLE"
  force_delete = true

  encryption_configuration {
    encryption_type = "AES256"
  }

  image_scanning_configuration {
    scan_on_push = false
  }
}
# % terraform import aws_ecr_repository.ecr_repository_fargate ca-container-registry

resource "aws_ecs_cluster" "ecs_cluster_fargate" {
  name = var.ecs_cluster
}

# terraform import aws_ecs_service.imported cluster-name/service-name
# terraform import aws_ecs_service.ecs_service_fargate ecs-fargate-cluster/fargate-lab-service
resource "aws_ecs_service" "ecs_service_fargate" {
  name                               = "fargate-lab-service"
  launch_type                        = "FARGATE"
  platform_version                   = "LATEST"
  propagate_tags                     = "NONE"
  scheduling_strategy                = "REPLICA"
  enable_ecs_managed_tags            = true
  # You cannot specify an IAM role for services that require a service linked role.
  # iam_role                           = aws_iam_role.ecs_service_role.name
  # iam_role                           = "/aws-service-role/ecs.amazonaws.com/AWSServiceRoleForECS"
  cluster                            = aws_ecs_cluster.ecs_cluster_fargate.id
  task_definition                    = "${aws_ecs_task_definition.ecs_task_definition.family}:${aws_ecs_task_definition.ecs_task_definition.revision}"

  deployment_maximum_percent         = 200
  deployment_minimum_healthy_percent = 100
  desired_count                      = 1
  health_check_grace_period_seconds  = 0

  deployment_circuit_breaker {
    enable   = true
    rollback = true
  }

  deployment_controller {
    type = "ECS"
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.ecs_target_group.arn
    container_name   = "fargate-docker-container"
    container_port   = 8081
  }

  network_configuration {
    assign_public_ip = true
    security_groups  = [
        # "sg-0166b767f6371826d",
        aws_security_group.ecs_security_group.id
    ]

    # subnets          = [
    #     "subnet-063e4a581576dff14",
    #     "subnet-0ddb1f5fbb18a3ff3",
    #     "subnet-0eb9042269b4d62d8",
    # ]
    subnets         = aws_subnet.ecs_subnets.*.id
  }

  depends_on = [aws_alb_target_group.ecs_target_group]
}

# terraform import aws_ecs_task_definition.ecs_task_definition  arn:aws:ecs:us-east-1:012345678910:task-definition/mytaskfamily:123
# terraform import aws_ecs_task_definition.ecs_task_definition  arn:aws:ecs:eu-west-1:911328334795:task-definition/fargate-lab-task:1

resource "aws_ecs_task_definition" "ecs_task_definition" {
  skip_destroy             = false
  container_definitions    = jsonencode(
    [
    {
        cpu              = 256
        environment      = []
        environmentFiles = []
        essential        = true
        # image            = "911328334795.dkr.ecr.eu-west-1.amazonaws.com/ca-container-registry:testblue"
        image            = "${aws_ecr_repository.ecr_repository_fargate.repository_url}:testblue"
        logConfiguration = {
            logDriver     = "awslogs"
            options       = {
                awslogs-create-group  = "true"
                awslogs-group         = "/ecs/"
                awslogs-region        = "eu-west-1"
                awslogs-stream-prefix = "ecs"
            }
            secretOptions = []
        }
        memory           = 512
        mountPoints      = []
        name             = "fargate-docker-container"
        portMappings     = [
          {
            appProtocol   = "http"
            containerPort = 8081
            hostPort      = 8081
            name          = "fargate-docker-container"
            protocol      = "tcp"
          },
        ]
        ulimits          = []
        volumesFrom      = []
      },
    ]
  )
  cpu                      = "256"

  execution_role_arn       = "${aws_iam_role.ecsTaskExecution_role.arn}"
  family                   = "fargate-lab-task"

  memory                   = "512"
  network_mode             = "awsvpc"
  requires_compatibilities = [
    "FARGATE",

  ]

  tags                     = {}
  tags_all                 = {}
  track_latest             = false

  runtime_platform {
    cpu_architecture        = "X86_64"
    operating_system_family = "LINUX"
  }
}