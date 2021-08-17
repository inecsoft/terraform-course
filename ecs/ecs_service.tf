resource "aws_ecs_service" "my_ecs_service" {
  name            = "my-ecs-service"
  iam_role        = aws_iam_role.ecs_service_role.name
  cluster         = aws_ecs_cluster.my_ecs_cluster.id
  task_definition = aws_ecs_task_definition.mywebsite.arn
  desired_count   = 3
  #iam_role        = aws_iam_role.ecs_service_role.arn

  load_balancer {
    target_group_arn = aws_alb_target_group.ecs_target_group.arn
    container_port   = 80
    container_name   = "website"
  }

  depends_on = [aws_alb_target_group.ecs_target_group]
}

