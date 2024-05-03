#!/bin/bash
#COnnect and set Subscription Context in Azure
az login
subscriptionsidTfGMCorporate=`az account list --query "[].{name:name, state:state, ID:id}"|jq .[1].ID`
az account set --subscription ${subscriptionsidTfGMCorporate}


#Set Variables for Storage account and Key Vault that support the Terraform implementation
RESOURCE_GROUP_NAME=TF-Azure-CDS-DevOps
STORAGE_ACCOUNT_NAME=cdsdevopsbackend
CONTAINER_NAME=tstate
STATE_FILE="terraform.state"
AZURE_LOCATION=uksouth
KEY_VAULT_NAME=TF-Azure-CDS-DevOps

# Create resource group
az group create --name $RESOURCE_GROUP_NAME --location ${AZURE_LOCATION}

# Create storage account
az storage account create --resource-group $RESOURCE_GROUP_NAME --name $STORAGE_ACCOUNT_NAME --sku Standard_LRS --encryption-services blob

# Get storage account key (Only used if SPN not available)
ACCOUNT_KEY=$(az storage account keys list --resource-group $RESOURCE_GROUP_NAME --account-name $STORAGE_ACCOUNT_NAME --query '[0].value' -o tsv)
echo $ACCOUNT_KEY

# Create blob container
az storage container create --name $CONTAINER_NAME --account-name $STORAGE_ACCOUNT_NAME --account-key $ACCOUNT_KEY

# Show details for the purposes of this code
echo "storage_account_name: $STORAGE_ACCOUNT_NAME"
echo "container_name: $CONTAINER_NAME"
echo "access_key: $ACCOUNT_KEY"
echo "state_file: $STATE_FILE"

# Create KeyVault and example of storing a key
az keyvault create --name ${KEY_VAULT_NAME} --resource-group ${RESOURCE_GROUP_NAME} --location ${AZURE_LOCATION}
az keyvault secret set --vault-name ${KEY_VAULT_NAME} --name "tstateaccess" --value {$ACCOUNT_KEY}
az keyvault secret show --vault-name ${KEY_VAULT_NAME} --name "tstateaccess"

# To view all the Azure subscription names and IDs for a specific Microsoft account
az account list --query "[?user.name=='ivan.arteaga@inecsoft.co.uk'].{Name:name, ID:id, Default:isDefault}" --output Table
az ad sp create-for-rbac --name TF-Azure-CDS-DevOps --role Contributor --scopes /subscriptions/${subscriptionsidTfGMCorporate}