#------------------------------------------------------
resource "aws_security_group" "sg_win" {
 name="sg_win"
 vpc_id = "${aws_vpc.main.id}"

 egress {
   from_port = 0
   to_port = 0
   protocol = "-1"
   cidr_blocks = ["0.0.0.0/0"]
 }
 ingress {
   from_port = 3389
   to_port = 3389
   protocol = "TCP"
   cidr_blocks = ["0.0.0.0/0"]
 }
 #check_mk could allow a local attacker to obtain sensitive information
 ingress {
   from_port = 5985
   to_port = 5985 
   protocol = "tcp"
   cidr_blocks = ["0.0.0.0/0"]
 }
 ingress {
   from_port = 5986
   to_port = 5986 
   protocol = "tcp"
   cidr_blocks = ["0.0.0.0/0"]
 }

 tags = {
   Name = "allow-RDP"
 }
}
#------------------------------------------------------
