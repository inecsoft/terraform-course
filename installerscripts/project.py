import boto3
import sys
from itertools import chain, starmap
import pandas as pd

import csv


route53 = boto3.client('route53')

paginate_hosted_zones = route53.get_paginator('list_hosted_zones')

paginate_resource_record_sets = route53.get_paginator('list_resource_record_sets')

domains = [domain.lower().rstrip('.') for domain in sys.argv[1:]]

listofdomains = []

fields = [ 'Name', 'TTL', 'Type', 'Value' ]
dic = {}

with open('domain_records.csv', 'w', newline='') as file:
    writer = csv.DictWriter(file, fieldnames = fields)
    writer.writeheader() 
    for zone_page in paginate_hosted_zones.paginate():
        del zone_page['ResponseMetadata']
        
        # print(zone_page)
        for zone in zone_page['HostedZones']:
            print(zone)
            if domains and not zone['Name'].lower().rstrip('.') in domains:
                continue

            for record_page in paginate_resource_record_sets.paginate(HostedZoneId = zone['Id']):
                del record_page['ResponseMetadata']
                #print(record_page)
                for record in record_page['ResourceRecordSets']:
                    #print(record)
                    if record.get('ResourceRecords'):
                        for target in record['ResourceRecords']:
                            #print(target)
                            #dic.append({ 'Name': record['Name'], 'TTL': record['TTL'],  'TYPE': record['Type'], 'Value': target['Value'] })
                            dic = [ { 'Name': record['Name'], 'TTL': record['TTL'],  'Type': record['Type'], 'Value': target['Value'] } ]
                            print(dic)
                            writer.writerows(dic)
                    elif record.get('AliasTarget'):
                            # dic.append({ 'Name': record['Name'], 'TYPE': record['Type'], 'Value':  record['AliasTarget']['DNSName']  })
                            dic = [ { 'Name': record['Name'],  'Type': record['Type'], 'Value':  record['AliasTarget']['DNSName']  } ]
                            print(dic)
                            writer.writerows(dic)
                    else:
                        raise Exception('Unknown record type: {}'.format(record))
    

