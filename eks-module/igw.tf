#----------------------------------------------------------------
#create internet gateway for the vpc
#----------------------------------------------------------------
resource "aws_internet_gateway" "eks_vpc_gw" {
  vpc_id = aws_vpc.eks_vpc.id
  tags = {
    Name = "EKS VPC IGW"
  }
}
#---------------------------------------------------------------
