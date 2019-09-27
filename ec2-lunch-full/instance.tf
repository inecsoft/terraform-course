resource  "aws_key_pair" "mykey" {
   key_name = "mykey"
   public_key = "${file("${var.PATH_TO_PUBLIC_KEY}")}"
}

resource  "aws_instance" "bastion" {
   ami = "${lookup(var.AMIS, var.AWS_REGION)}"
   instance_type = "t2.micro"
   key_name = "${aws_key_pair.mykey.key_name}"
   associate_public_ip_address = true
   root_block_device {
     volume_type = "gp2"
     volume_size = "30"
     delete_on_termination = false

   }
   tags = {
     Name = "Bastion-host"
   }

   connection {
    host = "${self.public_ip}"
    user = "${var.INSTANCE_USERNAME}"
    private_key = "${file("${var.PATH_TO_PRIVATE_KEY}")}"
  }
}

output "IPAddress" {
  value = "${aws_instance.bastion.public_ip}"
 
}
