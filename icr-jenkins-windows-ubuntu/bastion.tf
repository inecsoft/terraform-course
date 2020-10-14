resource  "aws_instance" "bastion" {
   ami                          = "${lookup(var.AMIS-UBUNTU, var.AWS_REGION)}"
   instance_type                = "t2.micro"
   key_name                     = "${aws_key_pair.project.key_name}"
   associate_public_ip_address  = true

   security_groups = ["${aws_security_group.project_vpc_sg-bastion.id}"]

   # the VPC subnet
   subnet_id = element(module.vpc.public_subnets,0)

   root_block_device {
     volume_type = "gp2"
     volume_size = "30"
     delete_on_termination = false

   }
  
  provisioner "file" {
  source      = "project"
  destination = "/home/ubuntu/.ssh/project"
    connection {
    host = "${self.public_ip}"
    user = "ubuntu"
    private_key = "${file("${var.PATH_TO_PRIVATE_KEY}")}"
   }
  }

  provisioner "remote-exec" {
    inline = ["sudo chmod 400 /home/ubuntu/.ssh/project"]
    connection {
      host = "${self.public_ip}"
      user = "ubuntu"
      private_key = "${file("${var.PATH_TO_PRIVATE_KEY}")}"
   }
  }


 

  tags = {
     Name = "Bastion-host"
  }

}

output "Bation-IPAddress" {
  value = "${aws_instance.bastion.public_ip}"
 
}