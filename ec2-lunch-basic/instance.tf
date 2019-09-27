 resource "aws_instance" "baston-host" {
      ami = "ami-06358f49b5839867c"
      instance_type = "t2.micro"
      tags =  {
           Name = "Baston host"
  }
}
