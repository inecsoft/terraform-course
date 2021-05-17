# terraform import aws_cloudwatch_dashboard.cloudwatch-dashboard-rds RDS

resource "aws_cloudwatch_dashboard" "cloudwatch-dashboard-rds" {
  dashboard_name = "RDS"

  dashboard_body = <<EOF

{
    "widgets": [
        {
            "height": 6,
            "width": 6,
            "y": 0,
            "x": 0,
            "type": "metric",
            "properties": {
                "view": "timeSeries",
                "stacked": false,
                "metrics": [
                    [ "AWS/RDS", "FreeStorageSpace", "DBInstanceIdentifier", "prod" ],
                    [ "AWS/RDS", "FreeStorageSpace", "DBInstanceIdentifier", "staging" ]

                ],
                "region": "eu-west-1",
                "title": "RDS Free Storage"
            }
        },
        {
            "height": 6,
            "width": 6,
            "y": 0,
            "x": 6,
            "type": "metric",
            "properties": {
                "view": "timeSeries",
                "stacked": false,
                "metrics": [
                    [ "AWS/RDS", "FreeableMemory", "DBInstanceIdentifier", "prod" ],
                    [ "AWS/RDS", "FreeableMemory", "DBInstanceIdentifier", "staging" ]

                ],
                "region": "eu-west-1",
                "title": "RDS Freeable Memory"
            }
        },
        {
            "height": 6,
            "width": 6,
            "y": 0,
            "x": 12,
            "type": "metric",
            "properties": {
                "view": "timeSeries",
                "stacked": false,
                "metrics": [
                    [ "AWS/RDS", "CPUUtilization", "DBInstanceIdentifier", "prod" ],
                    [ "AWS/RDS", "CPUUtilization", "DBInstanceIdentifier", "staging" ]

                ],
                "region": "eu-west-1",
                "title": "RDS CPU Utilization"
            }
        },
        {
            "height": 6,
            "width": 6,
            "y": 6,
            "x": 0,
            "type": "metric",
            "properties": {
                "view": "timeSeries",
                "stacked": false,
                "metrics": [
                    [ "AWS/RDS", "DatabaseConnections", "DBInstanceIdentifier", "prod" ],
                    [ "AWS/RDS", "DatabaseConnections", "DBInstanceIdentifier", "staging" ]
 
                ],
                "region": "eu-west-1",
                "title": "RDS Database Connections"
            }
        },
        {
            "height": 6,
            "width": 6,
            "y": 6,
            "x": 6,
            "type": "metric",
            "properties": {
                "view": "timeSeries",
                "stacked": false,
                "metrics": [
                    [ "AWS/RDS", "WriteIOPS", "DBInstanceIdentifier", "prod" ],
                    [ "AWS/RDS", "WriteIOPS", "DBInstanceIdentifier", "staging" ]
                ],
                "region": "eu-west-1",
                "title": "RDS Write IOPS"
            }
        },
        {
            "height": 6,
            "width": 6,
            "y": 6,
            "x": 12,
            "type": "metric",
            "properties": {
                "view": "timeSeries",
                "stacked": false,
                "metrics": [
                    [ "AWS/RDS", "ReadIOPS", "DBInstanceIdentifier", "prod" ],
                    [ "AWS/RDS", "ReadIOPS", "DBInstanceIdentifier", "staging" ]

                ],
                "region": "eu-west-1",
                "title": "RDS Read IOPS"
            }
        },
        {
            "height": 6,
            "width": 6,
            "y": 0,
            "x": 18,
            "type": "metric",
            "properties": {
                "view": "timeSeries",
                "stacked": false,
                "metrics": [
                    [ "AWS/RDS", "NetworkTransmitThroughput", "DBInstanceIdentifier", "prod" ],
                    [ "AWS/RDS", "NetworkTransmitThroughput", "DBInstanceIdentifier", "staging" ]

                ],
                "region": "eu-west-1",
                "title": "Network Out"
            }
        },
        {
            "height": 6,
            "width": 6,
            "y": 6,
            "x": 18,
            "type": "metric",
            "properties": {
                "view": "timeSeries",
                "stacked": false,
                "metrics": [
                    [ "AWS/RDS", "NetworkReceiveThroughput", "DBInstanceIdentifier", "prod" ],
                    [ "AWS/RDS", "NetworkReceiveThroughput", "DBInstanceIdentifier", "staging" ]

                ],
                "region": "eu-west-1",
                "title": "Network In"
            }
        }
    ]
}
EOF
}