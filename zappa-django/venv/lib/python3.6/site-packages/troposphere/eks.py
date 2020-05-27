# Copyright (c) 2012-2018, Mark Peek <mark@peek.org>
# All rights reserved.
#
# See LICENSE file for full license.

from . import AWSObject, AWSProperty


class ResourcesVpcConfig(AWSProperty):
    props = {
        'SecurityGroupIds': ([str], False),
        'SubnetIds': ([str], True),
    }


class Cluster(AWSObject):
    resource_type = "AWS::EKS::Cluster"

    props = {
        'Name': (str, False),
        'ResourcesVpcConfig': (ResourcesVpcConfig, True),
        'RoleArn': (str, True),
        'Version': (str, False),
    }
