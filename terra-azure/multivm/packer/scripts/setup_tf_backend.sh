#!/bin/bash
# From https://docs.microsoft.com/en-us/azure/developer/terraform/store-state-in-azure-storage

RESOURCE_GROUP_NAME=TF-Azure-DevOps
STORAGE_ACCOUNT_NAME=tstate$RANDOM
CONTAINER_NAME=tstate
SUBSCRIPTION_ID=

# Set the subscription ID
az account set --subscription=$SUBSCRIPTION_ID

# Create resource group
az group create --name $RESOURCE_GROUP_NAME --location uksouth

# Create storage account
az storage account create --resource-group $RESOURCE_GROUP_NAME --name $STORAGE_ACCOUNT_NAME --sku Standard_LRS --encryption-services blob

# Get storage account key
ACCOUNT_KEY=$(az storage account keys list --resource-group $RESOURCE_GROUP_NAME --account-name $STORAGE_ACCOUNT_NAME --query '[0].value' -o tsv)

# Create blob container
az storage container create --name $CONTAINER_NAME --account-name $STORAGE_ACCOUNT_NAME --account-key $ACCOUNT_KEY

echo "storage_account_name: $STORAGE_ACCOUNT_NAME"
echo "container_name: $CONTAINER_NAME"
echo "access_key: $ACCOUNT_KEY"
