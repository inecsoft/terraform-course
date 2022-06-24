resource "aws_cloudwatch_dashboard" "cloudwatch-dashboard-all-ec2-metrics" {
  dashboard_name = "full-ec2-metrics-test"
  provider        = aws.tfgm
  #for_each = toset( data.aws_instances.all-ec2-metrics-ids.ids )
   #depends_on = [data.aws_instances.all-ec2-metrics-ids ]
   #echo "[ for id in data.aws_instances.all-ec2-metrics-ids.ids : id ]"| terraform console
  
  #count = length(data.aws_instances.all-ec2-metrics-ids.ids)

  dashboard_body = jsonencode(
    {
    "widgets": [
        {
            "height": 4,
            "width": 8,
            "y": 0,
            "x": 0,
            "type": "metric",
            "properties": {
                "metrics": [
                   for id in data.aws_instances.all-ec2-metrics-ids.ids :
                   [ "AWS/EC2", "CPUUtilization", "InstanceId", id, { "period": 3600, "stat": "Average" } ]
                ],
                "legend": {
                    "position": "right"
                },
                "region": "eu-west-1",
                "liveData": true,
                "period": 3600,
                "title": "CPU Utilization: Average"
            }
        },
        {
            "height": 4,
            "width": 8,
            "y": 0,
            "x": 8,
            "type": "metric",
            "properties": {
                "metrics": [
                   for id in data.aws_instances.all-ec2-metrics-ids.ids :
                    [ "AWS/EC2", "DiskReadBytes", "InstanceId", id, { "period": 3600, "stat": "Average" } ]

                ],
                "legend": {
                    "position": "right"
                },
                "region": "eu-west-1",
                "liveData": true,
                "period": 3600,
                "title": "DiskReadBytes: Average"
            }
        },
        {
            "height": 4,
            "width": 8,
            "y": 0,
            "x": 16,
            "type": "metric",
            "properties": {
                "metrics": [
                   for id in data.aws_instances.all-ec2-metrics-ids.ids :
                    [ "AWS/EC2", "DiskReadOps", "InstanceId", id, { "period": 3600, "stat": "Average" } ]
                    
                ],
                "legend": {
                    "position": "right"
                },
                "region": "eu-west-1",
                "liveData": true,
                "period": 3600,
                "title": "DiskReadOps: Average"
            }
        },
        {
            "height": 4,
            "width": 8,
            "y": 4,
            "x": 0,
            "type": "metric",
            "properties": {
                "metrics": [
                   for id in data.aws_instances.all-ec2-metrics-ids.ids :
                    [ "AWS/EC2", "DiskWriteBytes", "InstanceId", id, { "period": 3600, "stat": "Average" } ]
                ],
                "legend": {
                    "position": "right"
                },
                "region": "eu-west-1",
                "liveData": true,
                "period": 3600,
                "title": "DiskWriteBytes: Average"
            }
        },
        {
            "height": 4,
            "width": 8,
            "y": 4,
            "x": 8,
            "type": "metric",
            "properties": {
                "metrics": [
                   for id in data.aws_instances.all-ec2-metrics-ids.ids :
                    [ "AWS/EC2", "DiskWriteOps", "InstanceId", id, { "period": 3600, "stat": "Average" } ]
                ],
                "legend": {
                    "position": "right"
                },
                "region": "eu-west-1",
                "liveData": true,
                "period": 3600,
                "title": "DiskWriteOps: Average"
            }
        },
        {
            "height": 4,
            "width": 8,
            "y": 4,
            "x": 16,
            "type": "metric",
            "properties": {
                "metrics": [
                   for id in data.aws_instances.all-ec2-metrics-ids.ids :
                    [ "AWS/EC2", "NetworkIn", "InstanceId", id, { "period": 3600, "stat": "Average" } ]
                    
                ],
                "legend": {
                    "position": "right"
                },
                "region": "eu-west-1",
                "liveData": true,
                "period": 3600,
                "title": "NetworkIn: Average"
            }
        },
        {
            "height": 4,
            "width": 8,
            "y": 8,
            "x": 0,
            "type": "metric",
            "properties": {
                "metrics": [
                   for id in data.aws_instances.all-ec2-metrics-ids.ids :
                    [ "AWS/EC2", "NetworkOut", "InstanceId", id, { "period": 3600, "stat": "Average" } ]
                    
                ],
                "legend": {
                    "position": "right"
                },
                "region": "eu-west-1",
                "liveData": true,
                "period": 3600,
                "title": "NetworkOut: Average"
            }
        },
        {
            "height": 4,
            "width": 8,
            "y": 8,
            "x": 8,
            "type": "metric",
            "properties": {
                "metrics": [
                   for id in data.aws_instances.all-ec2-metrics-ids.ids :
                    [ "AWS/EC2", "NetworkPacketsIn", "InstanceId", id, { "period": 3600, "stat": "Average" } ]
                    
                ],
                "legend": {
                    "position": "right"
                },
                "region": "eu-west-1",
                "liveData": true,
                "period": 3600,
                "title": "NetworkPacketsIn: Average"
            }
        },
        {
            "height": 4,
            "width": 8,
            "y": 8,
            "x": 16,
            "type": "metric",
            "properties": {
                "metrics": [
                   for id in data.aws_instances.all-ec2-metrics-ids.ids :
                    [ "AWS/EC2", "NetworkPacketsOut", "InstanceId", id, { "period": 3600, "stat": "Average" } ]

                ],
                "legend": {
                    "position": "right"
                },
                "region": "eu-west-1",
                "liveData": true,
                "period": 3600,
                "title": "NetworkPacketsOut: Average"
            }
        },
        {
            "height": 4,
            "width": 8,
            "y": 12,
            "x": 0,
            "type": "metric",
            "properties": {
                "metrics": [
                   for id in data.aws_instances.all-ec2-metrics-ids.ids :
                    [ "AWS/EC2", "StatusCheckFailed", "InstanceId", id, { "period": 3600, "stat": "Sum" } ]
                
                ],
                "legend": {
                    "position": "right"
                },
                "region": "eu-west-1",
                "liveData": true,
                "period": 3600,
                "title": "StatusCheckFailed: Sum"
            }
        },
        {
            "height": 4,
            "width": 8,
            "y": 12,
            "x": 8,
            "type": "metric",
            "properties": {
                "metrics": [
                   for id in data.aws_instances.all-ec2-metrics-ids.ids :
                    [ "AWS/EC2", "StatusCheckFailed_Instance", "InstanceId", id, { "period": 3600, "stat": "Sum" } ]
                   
                ],
                "legend": {
                    "position": "right"
                },
                "region": "eu-west-1",
                "liveData": true,
                "period": 3600,
                "title": "StatusCheckFailed_Instance: Sum"
            }
        },
        {
            "height": 4,
            "width": 8,
            "y": 12,
            "x": 16,
            "type": "metric",
            "properties": {
                "metrics": [
                   for id in data.aws_instances.all-ec2-metrics-ids.ids :
                    [ "AWS/EC2", "StatusCheckFailed_System", "InstanceId", id, { "period": 3600, "stat": "Sum" } ]
                   
                ],
                "legend": {
                    "position": "right"
                },
                "region": "eu-west-1",
                "liveData": true,
                "period": 3600,
                "title": "StatusCheckFailed_System: Sum"
            }
        }
    ]
}
  )
/* dashboard_body = <<EOF */

#EOF
}

data "aws_instances" "all-ec2-metrics-ids" {
  filter {
    name   = "instance-state-name"
    values = ["running"]
  }
}

/* output "all-ec2-metrics-ids" {
    value = data.aws_instances.all-ec2-metrics-ids.ids
} */