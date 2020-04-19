az group create -n default-inecsoft-ResourceGroup -l eastus2
az ad sp create-for-rbac --query "{ client_id: appId, client_secret: password, tenant_id: tenant }"
#You also need to obtain your Azure subscription ID
az account show --query { subscription_id: id }
./packer build ubuntu.json
