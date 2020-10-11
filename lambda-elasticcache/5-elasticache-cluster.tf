#----------------------------------------------------------------
#terraform import aws_elasticache_cluster.elasticache my_cluster
# count.index
#----------------------------------------------------------------
resource "aws_elasticache_cluster" "elasticache" {
  count = 1
  cluster_id           = "${local.default_name}-elasticache"
  engine               = "memcached"
  node_type            = "cache.t2.micro"
  num_cache_nodes      = count.index
  parameter_group_name = "default.memcached1.5"
  port                 = 11211
  maintenance_window   = "sun:05:00-sun:09:00"
  
  subnet_group_name    = module.vpc.elasticache_subnet_group_name 
  
  security_group_ids   = [ aws_security_group.allow_mencache.id ]
  
  #Must specify the same number of preferred availability zones as requested number of nodes.
  preferred_availability_zones =  slice(data.aws_availability_zones.azs.names, 0, count.index)

  tags = {
    "Name" = "${local.default_name}-elasticache"
  }
}
#---------------------------------------------------------------
output "DNS-name-cache-cluster" {
  description = "(Memcached only) The DNS name of the cache cluster without the port appended."
  value       = aws_elasticache_cluster.elasticache.cluster_address
}
#---------------------------------------------------------------
output "configuration-endpoint-elasticache-cluster" {
  description = "(Memcached only) The configuration endpoint to allow host discovery."
  value       = aws_elasticache_cluster.elasticache.configuration_endpoint 
}
#---------------------------------------------------------------
