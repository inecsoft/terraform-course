#-------------------------------------------------------------------------
#aws ecs describe-clusters --clusters test
#-------------------------------------------------------------------------
resource "aws_ecs_cluster" "ecs-cluster-fargate" {
  name = "${local.default_name}-ecs-cluster-fargate"

  #     capacity_providers = [
  #         "FARGATE",
  #         "FARGATE_SPOT",
  #     ]

  #     default_capacity_provider_strategy {
  #         base              = 0
  #         capacity_provider = "FARGATE_SPOT"
  #         weight            = 75
  #     }

  #     default_capacity_provider_strategy {
  #         base              = 10
  #         capacity_provider = "FARGATE"
  #         weight            = 25
  #     }

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  tags = {
    Name = "${local.default_name}-ecs-cluster-fargate"
  }
}
#-------------------------------------------------------------------------
