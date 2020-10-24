#!/usr/bin/env python

from __future__ import print_function

from troposphere import Tags, GetAtt, Ref, Sub, Export
from troposphere import Template, Output
import troposphere.ec2 as ec2
import tropospher.eip as eip

template = Template()

envs = ['dev', 'test', 'prod']


instancename = env[0] + "Ec2"
ec2_instance = template.add_resource(ec2.Instance(
    instancename,
    ImageId="ami-a7a242da",
    InstanceType="t2.nano",
    A
    Tags=Tags(
        Name=instancename,
    )
))

eip = template.add_resource(eip.)

# Finally, write the template to a file
with open('template.yaml', 'w') as f:
    f.write(template.to_yaml())
    f.close()