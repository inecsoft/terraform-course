# #----------------------------------------------------------------
# #terraform import aws_elasticache_cluster.elasticache my_cluster
# # count.index
# #----------------------------------------------------------------

resource "aws_elasticache_subnet_group" "elasticache_subnet_group" {
  name       = "elasticache-subnet-group"
  subnet_ids = [aws_subnet.ecs_subnets_public[0].id]
}

resource "aws_elasticache_parameter_group" "elasticache_parameter_group" {
  name   = "elasticache-parameter-group-7"
  family = "redis7"
}

resource "aws_ssm_parameter" "ssm_parameter" {
  name  = "cache-url"
  type  = "String"
  value = "${aws_elasticache_cluster.elasticache.cache_nodes[0].address}:${aws_elasticache_cluster.elasticache.cache_nodes[0].port}"
  depends_on = [ aws_elasticache_cluster.elasticache ]
}

resource "aws_elasticache_cluster" "elasticache" {
  #count = 1
  cluster_id = "elasticache-redis-7"
  engine     = "redis"
  node_type  = "cache.t3.micro"
  #num_cache_nodes      = count.index + 1
  num_cache_nodes      = 1
  parameter_group_name = aws_elasticache_parameter_group.elasticache_parameter_group.name
  port                 = 6379
  maintenance_window   = "sun:05:00-sun:09:00"

  subnet_group_name = aws_elasticache_subnet_group.elasticache_subnet_group.name

  security_group_ids = [aws_security_group.allow_redis.id]

  #Must specify the same number of preferred availability zones as requested number of nodes.
  #preferred_availability_zones =  slice(data.aws_availability_zones.azs.names, 0, count.index)
  # preferred_availability_zones = slice(data.aws_availability_zones.azs.names, 0, 1)

  tags = {
    "Name" = "${local.default_name}-elasticache"
  }
}
# #---------------------------------------------------------------
output "DNS-name-cache-cluster" {
  description = "(redis only) The DNS name of the cache cluster without the port appended."
  value       = aws_elasticache_cluster.elasticache.cluster_address
}
#---------------------------------------------------------------
output "configuration-endpoint-elasticache-cluster" {
  description = "(redis only) The configuration endpoint to allow host discovery."
  value       = aws_elasticache_cluster.elasticache.configuration_endpoint
}

output "elasticache-cluster-arn" {
  description = "(redis only) The configuration arn"
  value       = aws_elasticache_cluster.elasticache.arn
}

output "elasticache-cluster-cache_nodes" {
  description = "(redis only) The configuration arn"
  value       = aws_elasticache_cluster.elasticache.cache_nodes
}



# #---------------------------------------------------------------

resource "aws_security_group" "allow_redis" {
  name        = "access-allow-elasticcacheredis"
  description = "Allow redis inbound traffic"
  vpc_id      = aws_vpc.ecs_vpc.id

  ingress {
    # TLS (change to whatever ports you need)
    from_port = 6379
    to_port   = 6379
    protocol  = "tcp"
    #protocol    = "-1"
    # Please restrict your ingress to only necessary IPs and ports.
    # Opening to 0.0.0.0/0 can lead to security vulnerabilities.
    cidr_blocks     =  [ var.vpc_cidr ]
    # security_groups = [aws_security_group.lambda-sg.id]
  }

  ingress {

    from_port = 6379
    to_port   = 6379
    protocol  = "tcp"
    cidr_blocks     =   var.subnet_cidr_public

  }


  ingress {
    # TLS (change to whatever ports you need)
    from_port = 6379
    to_port   = 6379
    protocol  = "tcp"
    #protocol    = "-1"
    # Please restrict your ingress to only necessary IPs and ports.
    # Opening to 0.0.0.0/0 can lead to security vulnerabilities.
    cidr_blocks     =  [ local.workstation-external-cidr ]
    # security_groups = [aws_security_group.lambda-sg.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 1024
    to_port   = 65535
    protocol  = "tcp"

    cidr_blocks     =  [ "0.0.0.0/0" ]
  }

  tags = {
    Name = "access-allow-elasticcacheredis"
  }
}
# #--------------------------------------------------------------------------------------------
