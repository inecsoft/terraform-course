#!/usr/bin/env python

import yaml, json, sys

with open(sys.argv[1],  'r') as f:
      yaml_data = yaml.safe_load(f)
      yaml_dump = yaml.dump(yaml_data, default_flow_style=False)
      with open('output.yaml',  'w') as out:
         out.write(yaml_dump)
         out.close()

      f.close()

