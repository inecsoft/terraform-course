#----------------------------------------------------------------
output "elb" {
  value = aws_elb.myapp-elb.dns_name
}

#----------------------------------------------------------------
output "myapp-repository-URL" {
  value = "${aws_ecr_repository.myapp.repository_url}"
}
#----------------------------------------------------------------

