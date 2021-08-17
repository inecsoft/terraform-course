module "inchora-eks-cluster" {
  source       = "terraform-aws-modules/eks/aws"
  cluster_name = "inchora-cluster"
  subnets      = aws_subnet.eks_vpc_subnet_public.*.id
  vpc_id       = aws_vpc.eks_vpc.id

  #Whether to let the module manage the cluster autoscaling iam policy
  manage_worker_autoscaling_policy = true
  attach_worker_autoscaling_policy = yes

  worker_groups = [
    {
      instance_type = "t2.micro"
      asg_max_size  = 5
      tags = [{
        key                 = "eks"
        value               = "worker"
        propagate_at_launch = true
      }]
    }
  ]

  tags = {
    environment = "eks"
  }
}