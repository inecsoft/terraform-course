#!/usr/bin/env python

from __future__ import print_function

from troposphere import Tags, GetAtt, Ref, Sub, Export
from troposphere import Template, Output
import troposphere.ec2 as ec2

template = Template()

envs = ['dev', 'test', 'prod']

for env in envs:
    instancename = env + "Ec2"
    ec2_instance = template.add_resource(ec2.Instance(
        instancename,
        ImageId="ami-a7a242da",
        InstanceType="t2.nano",
        Tags=Tags(
            Name=instancename,
        )

    ))


# Finally, write the template to a file
with open('template.yaml', 'w') as f:
    f.write(template.to_yaml())
    f.close()