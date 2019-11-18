# Setting up AWS EKS (Hosted Kubernetes)

See https://www.terraform.io/docs/providers/aws/guides/eks-getting-started.html for full guide


## Download kubectl
```
curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
chmod +x kubectl
sudo mv kubectl /usr/local/bin
```

## Download the aws-iam-authenticator
```
wget https://github.com/kubernetes-sigs/aws-iam-authenticator/releases/download/v0.3.0/heptio-authenticator-aws_0.3.0_linux_amd64
chmod +x heptio-authenticator-aws_0.3.0_linux_amd64
sudo mv heptio-authenticator-aws_0.3.0_linux_amd64 /usr/local/bin/heptio-authenticator-aws
```
```
curl -o aws-iam-authenticator https://amazon-eks.s3-us-west-2.amazonaws.com/1.14.6/2019-08-22/bin/linux/amd64/aws-iam-authenticator
openssl sha1 -sha256 aws-iam-authenticator
chmod +x ./aws-iam-authenticator
sudo mv aws-iam-authenticator /usr/local/bin/aws-iam-authenticator && source ~/.bash_profile
aws-iam-authenticator help
```

## Modify providers.tf

Choose your region. EKS is not available in every region, use the Region Table to check whether your region is supported: https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/

Make changes in providers.tf accordingly (region, optionally profile)

## Terraform apply
```
terraform init
terraform apply
```

## Configure kubectl
```
terraform output kubeconfig # save output in ~/.kube/config
terraform output kubeconfig > ~/.kube/config
```
##get the id used 
aws sts get-caller-identity

##update config to log in 
aws eks --region eu-west-1 update-kubeconfig --name terraform-eks-demo
## Configure config-map-auth-aws
```
terraform output config-map-aws-auth # save output in config-map-aws-auth.yaml
terraform output config-map-aws-auth > config-map-aws-auth.yaml
kubectl apply -f config_map_aws_auth.yaml
```

## See nodes coming up
```
kubectl get svc
kubectl get nodes
```
## install helm
```
HELM_VERSION=3.0.0
wget https://get.helm.sh/helm-v$HELM_VERSION-rc.3-linux-amd64.tar.gz
tar -zxvf helm-v$HELM_VERSION-*.*-linux-amd64.tar.gz
sudo mv linux-amd64/helm /usr/local/bin/helm
```

#kubectl expose deployment helloworld --type=LoadBalancer
## Destroy
Make sure all the resources created by Kubernetes are removed (LoadBalancers, Security groups), and issue:
```
terraform destroy
```
