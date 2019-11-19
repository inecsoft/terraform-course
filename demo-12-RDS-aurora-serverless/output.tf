#------------------------------------------------------
#shows the instance ip address
#ssh -i mykey ubuntu@aws_instance.example.public_ip
#install sudo apt-get install mysql-client
#mysql -u root -h  mariadb.cfc8w0uxq929.eu-west-1.rds.amazonaws.com -p'myrandompassword44558'
#------------------------------------------------------
output "instance" {
  value = aws_instance.example.public_ip
}

#------------------------------------------------------
#show the rds endpoint 
#------------------------------------------------------
output "rds" {
  value = aws_rds_cluster.aurora-serverless.endpoint
}

#------------------------------------------------------
