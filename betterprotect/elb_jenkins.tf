######
# ELB
######
module "elb" {
  source = "../../"

  name = "elb-example"

  subnets         = data.aws_subnet_ids.all.ids
  security_groups = [data.aws_security_group.default.id]
  internal        = false

  listener = 
    
    {
      instance_port     = "8080"
      instance_protocol = "http"
      lb_port           = "8080"
      lb_protocol       = "http"

      //      Note about SSL:
      //      This line is commented out because ACM certificate has to be "Active" (validated and verified by AWS, but Route53 zone used in this example is not real).
      //      To enable SSL in ELB: uncomment this line, set "wait_for_validation = true" in ACM module and make sure that instance_protocol and lb_protocol are https or ssl.
      //      ssl_certificate_id = module.acm.this_acm_certificate_arn
    }
  

  health_check = {
    target              = "HTTP:80/"
    interval            = 30
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 5
  }

  access_logs = {
    bucket = aws_s3_bucket.logs.id
  }

  tags = {
     Name = "betterproject_elb"
  }

  # ELB attachments
  number_of_instances = var.number_of_instances
  instances           = "${aws_instance.betterproject-jenkins-instance.id}"
}