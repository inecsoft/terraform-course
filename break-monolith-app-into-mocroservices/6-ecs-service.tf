#---------------------------------------------------------------------------------------------
# aws_ecs_service.example:
#---------------------------------------------------------------------------------------------
resource "aws_ecs_service" "ecs-service" {
    name                               = "${local.default_name}-ecs-service"  
    cluster                            = aws_ecs_cluster.ecs-cluster-ec2.arn
    deployment_maximum_percent         = 200
    deployment_minimum_healthy_percent = 100
    desired_count                      = 2
    enable_ecs_managed_tags            = false
    health_check_grace_period_seconds  = 0
    iam_role                           = aws_iam_role.ecs-task-execution-role.arn
    
    launch_type                        = "EC2"
     
    #propagate_tags                     = "NONE"
    scheduling_strategy                = "REPLICA"
    
    task_definition                    = aws_ecs_task_definition.task-definition.arn

    deployment_controller {
        type = "ECS"
    }

    load_balancer {
        container_name   = "${local.default_name}-ecr"
        container_port   = 3000
        target_group_arn = aws_lb_target_group.alb_target_group.arn
    }

    ordered_placement_strategy {
        field = "attribute:ecs.availability-zone"
        type  = "spread"
    }
    
    ordered_placement_strategy {
        field = "instanceId"
        type  = "spread"
    }

    timeouts {}

    tags = {    
       Name = "${local.default_name}-ecs-service"    
    } 
}
#---------------------------------------------------------------------------------------------