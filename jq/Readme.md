***
# __How to use jq__

```
jq --arg i $i --arg ns1 $ns1 --arg ns2 $ns2 --arg ns3 $ns3 --arg ns4 $ns4 -r '. | {"DomainName": $i, "Nameservers": [{"Name": $ns1, "GlueIps": []}, {"Name": $ns2, "GlueIps": []}, {"Name": $ns3, "GlueIps": []}, {"Name": $ns4, "GlueIps": []}]}' ns.json
```

***
