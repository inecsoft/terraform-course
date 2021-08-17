
# locations = [
#   {
#     ip      = "52.209.3.118/32"
#     comment = "prod NGW"
#   },
#   {
#     ip      = "52.209.58.7/32"
#     comment = "prod NGW"
#   },
#   {
#     ip      = "52.31.71.162/32"
#     comment = "prod NGW"
#   },
#   {
#     ip      = "52.209.30.142/32"
#     comment = "staging NGW"
#   },
#   {
#     ip      = "52.50.216.114/32"
#     comment = "staging NGW"
#   },
#   {
#     ip      = "52.209.49.154/32"
#     comment = "staging NGW"
#   },
#   {
#     ip      = "52.208.221.16/32"
#     comment = "build NGW"
#   },
#   {
#     ip      = "52.209.26.115/32"
#     comment = "build NGW"
#   },
#   {
#     ip      = "52.208.255.116/32"
#     comment = "build NGW"
#   },
#   {
#     ip      = "62.255.235.96/27"
#     comment = "2PP"
#   },
#   {
#     ip      = "62.255.235.32/27"
#     comment = "Queens road (QRD)"
#   },
#   {
#     ip      = "62.255.235.64/27"
#     comment = "Trafford (TRD)"
#   },
#   {
#     ip      = "212.74.28.190/32"
#     comment = "Basement 2PP test env"
#   },
#   {
#     ip      = "165.225.80.0/22"
#     comment = "ZScaler London III"
#   },
#   {
#     ip      = "165.225.196.0/23"
#     comment = "ZScaler Manchester I"
#   },
#   {
#     ip      = "147.161.166.0/23"
#     comment = "ZScaler London III"
#   },
#   {
#     ip      = "165.225.198.0/23"
#     comment = "ZScaler Manchester I"
#   }
# ]

devops = [
  {
    from_port   = "443"
    to_port     = "443"
    protocol    = "tcp"
    cidr_blocks = ["90.10.94.31/32"]
    description = "William Home"
  },
  {
    from_port   = "443"
    to_port     = "443"
    protocol    = "tcp"
    cidr_blocks = ["192.160.1.33/32"]
    description = "user name ivan pedro"
  },
  {
    from_port   = "443"
    to_port     = "443"
    protocol    = "tcp"
    cidr_blocks = ["85.210.53.103/32"]
    description = "Ivan Home ivan pedro"
  }
]
devs = [
  {
    from_port   = "443"
    to_port     = "443"
    protocol    = "tcp"
    cidr_blocks = ["86.58.252.213/32"]
    description = "Christiam Home"
  },
  {
    from_port   = "443"
    to_port     = "443"
    protocol    = "tcp"
    cidr_blocks = ["109.149.46.153/32"]
    description = "Timar olevies Home"
  },
  {
    from_port   = "443"
    to_port     = "443"
    protocol    = "tcp"
    cidr_blocks = ["5.253.204.138/32"]
    description = "Clamar Screew Home"
  }
]

