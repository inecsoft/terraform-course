#-------------------------------------------------------------------------
# aws_ecs_cluster.ecs-cluster-fargate:
#EC2 Linux + Networking
#Resources to be created:
#Cluster
#VPC
#Subnets
#Auto Scaling group with Linux AMI
#-------------------------------------------------------------------------
resource "aws_ecs_cluster" "ecs-cluster-ec2" {
    name = "${local.default_name}-ecs-cluster-ec2"

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
      Name = "${local.default_name}-ecs-cluster-ec2"
    }
}
#-------------------------------------------------------------------------
