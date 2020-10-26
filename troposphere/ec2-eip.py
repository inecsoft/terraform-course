#!/usr/bin/env python

from __future__ import print_function

from troposphere import Tags, GetAtt, Ref, Sub, Export
from troposphere import Template, Output
from troposphere.ec2 import VPC, EIP, InternetGateway, VPCGatewayAttachment, NatGateway, \
     SecurityGroup, SecurityGroupRule, Subnet, Route, RouteTable, SubnetRouteTableAssociation,SubnetNetworkAclAssociation, NetworkInterfaceProperty, NetworkAcl, PortRange
import troposphere.ec2 as ec2


t = Template()

t.add_version('2010-09-09')

t.set_description("""\
AWS CloudFormation Sample Template VPC_3_Instance_In_Subnet: Sample \
template showing how to create a VPC, subnets, natgateway and add an EC2 instance with an Elastic \
IP address and a security group. \
**WARNING** This template creates an Amazon EC2 instance. You will be billed \
for the AWS resources used if you create a stack from this template.""")

#envs = ['dev', 'test', 'prod']
envs = ['dev']
ref_stack_id = Ref('AWS::StackId')

VPC = t.add_resource(
    VPC(
        'VPC',
        CidrBlock='10.0.0.0/16',
        Tags=Tags(
            Name='VPC-{}'.format(envs[0]),
            Application=ref_stack_id)))

cidrblocks_public = ['10.0.1.0/24', '10.0.2.0/24', '10.0.3.0/24']
cidrblocks_private = ['10.0.101.0/24', '10.0.102.0/24', '10.0.103.0/24']

lens_public = len(cidrblocks_public)
lens_public = len(cidrblocks_private)

internetGateway = t.add_resource(
    InternetGateway(
        'InternetGateway{0}'.format(envs[0]),
        Tags=Tags(
            Name='InternetGateway-{0}'.format(envs[0]),
            Application=ref_stack_id)
        )
    )

gatewayAttachment = t.add_resource(
    VPCGatewayAttachment(
        'AttachGateway{0}'.format(envs[0]),
        VpcId=Ref(VPC),
        InternetGatewayId=Ref(internetGateway)
    ))

####Create Elastic IP####
instanceEip = t.add_resource(EIP(
    "ElasticIp" 
))

def public_subnets(cidrblocks, envs):
    lens_cidrblocks = len(cidrblocks)

    publicrouteTable = t.add_resource(
    RouteTable(
        'PublicRouteTable{0}'.format(envs[0]),
        VpcId=Ref(VPC),
        Tags=Tags(
            Name='PublicRouteTable-{0}'.format(envs[0]),
            Application=ref_stack_id)
        )
    )

    publicroute = t.add_resource(
        Route(
            'PublicRoute{0}'.format(envs[0]),
            DependsOn='AttachGateway',
            GatewayId=Ref('InternetGateway'),
            DestinationCidrBlock='0.0.0.0/0',
            RouteTableId=Ref(publicrouteTable),
        )
    )

    for env in envs:
        for i in range(lens_cidrblocks):
            subnet = t.add_resource(
                Subnet(
                    'PublicSubnet{0}{1}'.format(i+1, env),
                    CidrBlock=cidrblocks[i],
                    VpcId=Ref(VPC),
                    Tags=Tags(
                        Name='PublicSubnet-{0}-{1}'.format(i+1, env),
                        Application=ref_stack_id
                    )
                )
            )
    
            subnetRouteTableAssociation = t.add_resource(
                SubnetRouteTableAssociation(
                    'SubnetRouteTableAssociation{0}{1}'.format(i+1, envs[0]),
                    SubnetId=Ref(subnet),
                    RouteTableId=Ref(publicrouteTable)
                )
            )

public_subnets(cidrblocks_public, envs)

publicNatGateway = t.add_resource(
    NatGateway(
        'publicNatGateway{0}'.format(envs[0]),
        AllocationId=Ref(instanceEip),
        SubnetId=Ref(public_subnets.subnet),
        Tags=Tags(
            Name='publicNatGateway-{0}'.format(envs[0]),
            Application=ref_stack_id
        )
    )   
)

def private_subnets(cidrblocks, envs):
    lens_cidrblocks = len(cidrblocks)

    privaterouteTable = t.add_resource(
    RouteTable(
        'privateRouteTable{0}'.format(envs[0]),
        VpcId=Ref(VPC),
        Tags=Tags(
            Name='privateRouteTable-{0}'.format(envs[0]),
            Application=ref_stack_id)
        )
    )
    
    privateroute = t.add_resource(
        Route(
            'privateRoute{0}'.format(envs[0]),
            DependsOn='AttachGateway',
            NatGatewayId=Ref('publicNatGateway'),
            DestinationCidrBlock='0.0.0.0/0',
            RouteTableId=Ref(privaterouteTable),
        )
    )

    for env in envs:
        for i in range(lens_cidrblocks):
            subnet = t.add_resource(
                Subnet(
                    'privateSubnet{0}{1}'.format(i+1, env),
                    CidrBlock=cidrblocks[i],
                    VpcId=Ref(VPC),
                    Tags=Tags(
                        Name='privateSubnet-{0}-{1}'.format(i+1, env),
                        Application=ref_stack_id
                    )
                )
            )
    
            subnetRouteTableAssociation = t.add_resource(
                SubnetRouteTableAssociation(
                    'SubnetRouteTableAssociation{0}{1}'.format(i+1, envs[0]),
                    SubnetId=Ref(subnet),
                    RouteTableId=Ref(privaterouteTable)
                )
            )

private_subnets(cidrblocks_private, envs)


# for i in range(lens_public): 

#     subnet = t.add_resource(
#         Subnet(
#             'PublicSubnet{0}{1}'.format(i+1, envs[0]),
#             CidrBlock=cidrblocks_public[i],
#             VpcId=Ref(VPC),
#             Tags=Tags(
#                 Name='PublicSubnet-{0}-{1}'.format(i+1, envs[0],
#                 Application=ref_stack_id)
#             )
#         )
#     )
    
#     subnetRouteTableAssociation = t.add_resource(
#     SubnetRouteTableAssociation(
#         'SubnetRouteTableAssociation{0}{1}'.format(i+1, envs[0]),
#         SubnetId=Ref(subnet),
#         RouteTableId=Ref(routeTable),
#     ))

instanceSecurityGroup = t.add_resource(
    SecurityGroup(
        'InstanceSecurityGroup',
        GroupDescription='Enable SSH access via port 22',
        SecurityGroupIngress=[
            SecurityGroupRule(
                IpProtocol='tcp',
                FromPort='22',
                ToPort='22',
                CidrIp='0.0.0.0/0'),
            SecurityGroupRule(
                IpProtocol='tcp',
                FromPort='80',
                ToPort='80',
                CidrIp='0.0.0.0/0')],
        VpcId=Ref(VPC),
    ))

instancename = envs[0] + "Ec2"
ec2_instance = t.add_resource(ec2.Instance(
    instancename,
    ImageId="ami-a7a242da",
    InstanceType="t2.nano",
    
    Tags=Tags(
        Name=instancename,
    )
))



# Finally, write the t to a file
with open('output.yaml', 'w') as f:
    f.write(t.to_yaml())
    f.close()