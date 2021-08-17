#---------------------------------------------------------------------------------
resource "aws_cloudformation_stack" "jenkins" {

  name         = "${local.default_name}-jenkins"
  template_url = "https://blog-for-codedeploy.s3.eu-central-1.amazonaws.com/CodeDeployTemplate.json"

  capabilities = ["CAPABILITY_IAM"]

  parameters = {
    #Enter the project name of the CodeBuild
    CodeBuildProject = "${local.default_name}-jenkins"

    #EC2 instance type for CodeDeploy Web Servers
    CodedeployInstanceType = "t2.micro"

    #Number of CodeDeploy Web Server EC2 instances
    InstanceCount = 2

    #EC2 instance type for Jenkins Server
    JenkinsInstanceType = "t2.micro"

    #The EC2 Key Pair to allow SSH access to CodeDeploy EC2 instances and Jenkins Server
    KeyName = aws_key_pair.cmrs.key_name

    #The first public subnet where the Jenkins EC2 instance, ELB and CodeDeploy Web Servers will be launched
    PublicSubnet1 = element(module.vpc.public_subnets, 0)

    #The second public subnet where the ELB and CodeDeploy Web Servers will be launched
    PublicSubnet2 = element(module.vpc.public_subnets, 1)

    #The VPC Id where the EC2 instances will be launched.
    VpcId = module.vpc.vpc_id

    #CIDR block of the network from where you will connect to the Jenkins server using HTTP and SSH
    YourIPRange = local.workstation-external-cidr

  }

}
#---------------------------------------------------------------------------------
