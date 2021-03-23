#--------------------------------------------------------------------------------
resource "aws_directory_service_directory" "directory-service-directory" {
  name     = "corp.inecsoft.co.uk"
  password = "SuperSecretPassw0rd"
  size     = "Small"

  vpc_settings {
    vpc_id     = module.vpc.vpc_id
    subnet_ids = slice(module.vpc.public_subnets, 0, 2)
  }

  tags = {
    Project = "${local.defaul_name}-simpleAD"
  }
}
#--------------------------------------------------------------------------------