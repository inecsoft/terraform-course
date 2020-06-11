#------------------------------------------------------------------------------------------------
resource "null_resource" "provisioner" {

 provisioner "local-exec" {
   when    = create
   command = "eb init -p docker flask-app; eb create flask-app --vpc.id ${module.vpc.vpc_id}  --vpc.ec2subnets ${module.vpc.public_subnets[0]},${module.vpc.public_subnets[0]} --vpc.dbsubnets ${module.vpc.private_subnets[0]},${module.vpc.private_subnets[1]} -k ${aws_key_pair.key.key_name} -r ${var.AWS_REGION} --profile default"
   #command = "eb init -p docker flask-app; eb create flask-app -k ${aws_key_pair.key.key_name} -i t2.micro  -r ${var.AWS_REGION} --profile default"
 }
  
 provisioner "local-exec" {
   when    = destroy
   command = "eb terminate flask-app --all --force"
 }
}
#------------------------------------------------------------------------------------------------
