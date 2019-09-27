output "LoadBalancerURL" {
  value = aws_alb.ecs_load_balancer.dns_name
}

