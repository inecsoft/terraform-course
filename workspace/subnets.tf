#-----------------------------------------------------
#creates 3 public subnets one per availability zone
#----------------------------------------------------
resource "aws_subnet" "my_vpc_subnet_public" {
  count = "${length(var.subnet_cidr_public)}"
  vpc_id =  "${aws_vpc.my_vpc.id}"
  cidr_block = "${element(var.subnet_cidr_public, count.index)}"
  map_public_ip_on_launch = "true"
  availability_zone  = "${element(data.aws_availability_zones.azs.names, count.index)}"


  tags ={
    Name = "${local.default_name}-subnet_public-${count.index+1}"
  }
}
#----------------------------------------------------
#creates 3 private subnets one per availability zone
#---------------------------------------------------
resource "aws_subnet" "my_vpc_subnet_private" {
  count = "${length(var.subnet_cidr_private)}"
  vpc_id =  "${aws_vpc.my_vpc.id}"
  cidr_block = "${element(var.subnet_cidr_private, count.index)}"
  map_public_ip_on_launch = "false"
  availability_zone  = "${element(data.aws_availability_zones.azs.names, count.index)}"

  tags ={
    Name = "${local.default_name}-subnet_private-${count.index+1}"
  }
}
#---------------------------------------------------------

