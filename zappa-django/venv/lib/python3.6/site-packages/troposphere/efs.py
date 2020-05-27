from . import AWSObject, Tags
from .validators import boolean

Bursting = 'bursting'
Provisioned = 'provisioned'


def throughput_mode_validator(mode):
    valid_modes = [Bursting, Provisioned]
    if mode not in valid_modes:
        raise ValueError(
            'ThroughputMode must be one of: "%s"' % (', '.join(valid_modes))
        )
    return mode


def provisioned_throughput_validator(throughput):
    if throughput < 0.0:
        raise ValueError(
            'ProvisionedThroughputInMibps must be greater than or equal to 0.0'
        )
    return throughput


class FileSystem(AWSObject):
    resource_type = "AWS::EFS::FileSystem"

    props = {
        'Encrypted': (boolean, False),
        'FileSystemTags': (Tags, False),
        'KmsKeyId': (str, False),
        'PerformanceMode': (str, False),
        'ProvisionedThroughputInMibps': (float, False),
        'ThroughputMode': (throughput_mode_validator, False),
    }


class MountTarget(AWSObject):
    resource_type = "AWS::EFS::MountTarget"

    props = {
        'FileSystemId': (str, True),
        'IpAddress': (str, False),
        'SecurityGroups': ([str], True),
        'SubnetId': (str, True),
    }
