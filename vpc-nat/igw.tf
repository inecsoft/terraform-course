#create internet gateway for the vpc
#----------------------------------------------------------------
resource "aws_internet_gateway" "my_vpc_gw" {
  vpc_id = "${aws_vpc.my_vpc.id}"
  tags ={
    Name =  "MY VPC IGW"
  }
}
#---------------------------------------------------------------
