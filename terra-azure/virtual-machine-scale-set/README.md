***
# __How to follow the Tutorial__

***

### __Get the credential__
```
az group create -n default-inecsoft-ResourceGroup -l eastus2  
az ad sp create-for-rbac --query "{ client_id: appId, client_secret: password, tenant_id: tenant }"  
```

### __You also need to obtain your Azure subscription ID__
```
az account show --query { subscription_id: id }
```
### __Build image__
```
./packer build ubuntu.json
image build ubuntu.json
```

_Note:_
On Rhel or Centos the name packer is taken by another package.
to fix this issue I use image for packer build command.

***

1- The image will be automatically build when by "azurerm_resource_group" "image" using packer tool.

```
terraform init 
terraform apply -auto-approve  
```

2- The following resource will pick the info of the image built.

data "azurerm_resource_group" "image" 
data "azurerm_image" "image" 

3- The resource "azurerm_virtual_machine_scale_set" "vmss" will create the machine with
 the image created on the "azurerm_resource_group" "image"

***
