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


##############################################################################
resource "null_resource" "docker_packaging" {

  provisioner "local-exec" {
    command = <<EOF
      cd fargate-lab
      aws ecr get-login-password --region ${var.AWS_REGION} --profile=ivan-arteaga-dev | docker login --username AWS --password-stdin "${data.aws_caller_identity.current.account_id}.dkr.ecr.${var.AWS_REGION}.amazonaws.com"
      docker build -t "${aws_ecr_repository.ecr_repository_fargate.name}:latest" .
      docker tag "${aws_ecr_repository.ecr_repository_fargate.name}:latest" "${aws_ecr_repository.ecr_repository_fargate.repository_url}:latest"
      docker push "${aws_ecr_repository.ecr_repository_fargate.repository_url}:latest"
    EOF
  }

  triggers = {
    "run_at" = timestamp()
  }

  depends_on = [
    aws_ecr_repository.ecr_repository_fargate,
  ]
}
##################################################################################
# % terraform import aws_ecr_repository.ecr_repository_fargate ca-container-registry

resource "aws_ecs_cluster" "ecs_cluster_fargate" {
  name = var.ecs_cluster
  setting {
    name  = "containerInsights"
    value = "disabled"
  }
}

# resource "aws_ecs_capacity_provider" "ecs_capacity_provider_fargate" {
#   name = "PRIVATE-INFRA"

#   auto_scaling_group_provider {
#     auto_scaling_group_arn         = aws_autoscaling_group.ecs_autoscaling_group.arn
#     managed_draining               = "ENABLED"
#     managed_termination_protection = "DISABLED"

#     managed_scaling {
#       instance_warmup_period    = 300
#       maximum_scaling_step_size = 10000
#       minimum_scaling_step_size = 1
#       status                    = "DISABLED"
#       target_capacity           = 100
#     }
#   }
# }

resource "aws_ecs_cluster_capacity_providers" "ecs_cluster_capacity_providers" {
  cluster_name = aws_ecs_cluster.ecs_cluster_fargate.name

  capacity_providers = [
    "FARGATE",
    "FARGATE_SPOT",
    # "${aws_ecs_capacity_provider.ecs_capacity_provider_fargate.name}"
  ]

  default_capacity_provider_strategy {
    base              = 1
    weight            = 100
    capacity_provider = "FARGATE"
  }
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
  # task_definition = "${aws_ecs_task_definition.ecs_task_definition.arn}"

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
    container_port   = 8000
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
    subnets         = aws_subnet.ecs_subnets_public.*.id
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
        environment      = [
          {
            "name": "ENVIRONMENT",
            "value": "dev"
          },
          {
            "name": "DEBUG",
            "value": "0"
          },
          {
            "name": "SECRET_KEY",
            "value": "${jsondecode(aws_secretsmanager_secret_version.secret_version.secret_string)["SECRET_KEY"]}"
          },
          {
            "name": "POSTGRES_USER",
            "value": "postgres"
          },
          # {
          #   "name": "DATABASE_PASSWORD",
          #   "value": "${jsondecode(aws_secretsmanager_secret_version.secret_version.secret_string)["DATABASE_PASSWORD"]}"
          # },
          {
            "name": "DJANGO_ALLOWED_HOSTS",
            "value": "${jsondecode(aws_secretsmanager_secret_version.secret_version.secret_string)["DJANGO_ALLOWED_HOSTS"]}"
          },
          {
            "name": "POSTGRES_DB",
            "value": "postgres"
          },
          {
            "name": "POSTGRES_HOST",
            # "value": aws_db_instance.production.address
          },
          {
            "name": "SQL_ENGINE",
            "value": "django.db.backends.postgresql"
          },
          {
            "name": "PYTHONUNBUFFERED",
            "value": "1"
          },
          {
            "name": "POSTGRES_HOST_AUTH_METHOD",
            "value": "trust"
          },
          {
            "name": "PORT",
            "value": "5432"
          },

        ],

        secrets =  [
        {
          "name": "DATABASE_PASSWORD",
          "valueFrom":  aws_secretsmanager_secret_version.secret_version.arn
        }
      ]

        environmentFiles = []
        essential        = true
        # image            = "911328334795.dkr.ecr.eu-west-1.amazonaws.com/ca-container-registry:testblue"
        image            = "${aws_ecr_repository.ecr_repository_fargate.repository_url}:latest"
        # command = ["python", "manage.py", "migrate"]
        logConfiguration = {
          logDriver     = "awslogs"
          options       = {
            # awslogs-create-group  = "true"
            # awslogs-group         = "/ecs/"
            awslogs-region        = var.AWS_REGION
            # awslogs-stream-prefix = "ecs"
            awslogs-group  = aws_cloudwatch_log_group.ecs_cloudwatch_log_group.name
            awslogs-stream-prefix = aws_cloudwatch_log_stream.ecs_cloudwatch_log_stream.name
          }
          secretOptions = []
        }
        memory           = 512
        mountPoints      = []
        name             = "fargate-docker-container"

        healthCheck = {
          command =  [ "CMD-SHELL", "curl  http://localhost:8000/ping/ || exit 1" ],
          interval =  30,
          retries =  3,
          timeout =  5
        },

        portMappings     = [
          {
            appProtocol   = "http"
            containerPort = 8000
            hostPort      = 8000
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
  # task_role_arn            = aws_iam_role.ecs-task-execution-role.arn
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

# Cloudwatch Logs
resource "aws_cloudwatch_log_group" "ecs_cloudwatch_log_group" {
  name              = "/ecs/"
  retention_in_days = 30
}

resource "aws_cloudwatch_log_stream" "ecs_cloudwatch_log_stream" {
  name           = "ecs"
  log_group_name = aws_cloudwatch_log_group.ecs_cloudwatch_log_group.name
}



#--------------------------------------------------------------------------------
resource "aws_secretsmanager_secret" "rotation-secret" {
  name = "rotation-secret-${random_string.random.result}"
  #  rotation_lambda_arn = "${aws_lambda_function.example.arn}"

  #  rotation_rules {
  #   automatically_after_days = 7
  #  }

  kms_key_id = aws_kms_key.kms-key.key_id

  tags = {
    Name = "rotation-secret-${random_string.random.result}"
  }
}
#--------------------------------------------------------------------------------
resource "aws_secretsmanager_secret_version" "secret_version" {
  secret_id = aws_secretsmanager_secret.rotation-secret.id
  #secret_string = "example-string-to-protect"
  #secret_string = "${jsonencode(var.secret)}"
  secret_string = jsonencode(tomap({
    "DEBUG" = "0",
    "ENVIRONMENT" = "dev",
    "SQL_ENGINE" = "django.db.backends.postgresql",
    "SECRET_KEY" = "${random_password.SECRET_KEY.result}",
    "POSTGRES_DB" = "postgres",
    "POSTGRES_USER" = "postgres",
    "DATABASE_PASSWORD" = "${random_password.password.result}",
    "POSTGRES_HOST" = "db",
    "POSTGRES_PORT" = "5432",
    "DJANGO_ALLOWED_HOSTS" = "127.0.0.1 localhost ::1 ${aws_alb.ecs_load_balancer.dns_name}",
    "POSTGRES_HOST_AUTH_METHOD" = "trust",
    "PYTHONUNBUFFERED" = "1",
    "PORT" = "8000",}
    )
  )

}
#--------------------------------------------------------------------------------
output "secretsmanager_secret_version_DATABASE_PASSWORD" {
  # sensitive = false
  value = nonsensitive(jsondecode(aws_secretsmanager_secret_version.secret_version.secret_string)["DATABASE_PASSWORD"])
}

output "secretsmanager_secret_version_SECRET_KEY" {
  # sensitive = false
  value = nonsensitive(jsondecode(aws_secretsmanager_secret_version.secret_version.secret_string)["SECRET_KEY"])
}

output "secretsmanager_secret_version_FULL_ENV" {
  # sensitive = false
  value = nonsensitive(jsondecode(aws_secretsmanager_secret_version.secret_version.secret_string))
}
output "ecr_repository_fargate_url" {
  description = "ecr_repository_fargate_url"
  value       = aws_ecr_repository.ecr_repository_fargate.repository_url
}
