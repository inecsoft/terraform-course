#-----------------------------------------------------------------------------------
resource "aws_security_group" "allow-ssh" {
  vpc_id      = module.vpc.vpc_id
  name        = "${local.default_name}-allow-NFS-storagegateway"
  description = "security group that allows Storage Gateway and all egress traffic"

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress  = [
    {
      cidr_blocks      = [
          "0.0.0.0/0",
        ]
      description      = "SGW activation"
      from_port        = 80
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "tcp"
      security_groups  = []
      self             = false
      to_port          = 80
    },
    {
      cidr_blocks      = [
          "10.0.0.0/16",
        ]
      description      = "NFS"
      from_port        = 111
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "tcp"
      security_groups  = []
      self             = false
      to_port          = 111
    },
    {
      cidr_blocks      = [
          "10.0.0.0/16",
        ]
      description      = "NFS"
      from_port        = 111
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "udp"
      security_groups  = []
      self             = false
      to_port          = 111
    },
    {
      cidr_blocks      = [
          "10.0.0.0/16",
        ]
      description      = "NFS"
      from_port        = 20048
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "tcp"
      security_groups  = []
      self             = false
      to_port          = 20048
    },
    {
      cidr_blocks      = [
          "10.0.0.0/16",
        ]
      description      = "NFS"
      from_port        = 20048
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "udp"
      security_groups  = []
      self             = false
      to_port          = 20048
    },
    {
      cidr_blocks      = [
          "10.0.0.0/16",
        ]
      description      = "NFS"
      from_port        = 2049
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "tcp"
      security_groups  = []
      self             = false
      to_port          = 2049
    },
    {
      cidr_blocks      = [
          "10.0.0.0/16",
        ]
      description      = "NFS"
      from_port        = 2049
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "udp"
      security_groups  = []
      self             = false
      to_port          = 2049
    },
    {
      cidr_blocks      = [
          "10.0.0.0/16",
        ]
      description      = "SMB"
      from_port        = 139
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "tcp"
      security_groups  = []
      self             = false
      to_port          = 139
    },
    {
      cidr_blocks      = [
          "10.0.0.0/16",
        ]
      description      = "SMB"
      from_port        = 139
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "udp"
      security_groups  = []
      self             = false
      to_port          = 139
    },
    {
      cidr_blocks      = [
          "10.0.0.0/16",
        ]
      description      = "SMB"
      from_port        = 445
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "tcp"
      security_groups  = []
      self             = false
      to_port          = 445
    },
    {
      cidr_blocks      = [
          "0.0.0.0/0",
        ]
      description      = "ssh"
      from_port        = 22
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "tcp"
      security_groups  = []
      self             = false
      to_port          = 22
    },
  ]

  tags = {
    Name = "${local.default_name}-allow-storegateway"
  }
}
#-----------------------------------------------------------------------------------


