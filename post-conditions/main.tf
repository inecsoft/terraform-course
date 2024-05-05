resource "aws_instance" "instance" {
  instance_type = "t3.micro"
  ami           = data.aws_ami.amazon_linux_kernel_5.id

  lifecycle {
    # The AMI ID must refer to an AMI that contains an operating system
    # for the `x86_64` architecture.
    precondition {
      condition     = data.aws_ami.amazon_linux_kernel_5.architecture == "x86_64"
      error_message = "The selected AMI must be for the x86_64 architecture."
    }

    # The EC2 instance must be allocated a public DNS hostname.
    postcondition {
      condition     = self.public_dns != ""
      error_message = "EC2 instance must be in a VPC that has public DNS hostnames enabled."
    }
  }
}

check "health_check" {
  data "http" "myip" {
    url = "http://ipv4.icanhazip.com"
  }

  assert {
    condition = data.http.myip.status_code == 200
    error_message = "${data.http.myip.url} returned an unhealthy status code"
  }
}
