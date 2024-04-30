# Lab 6 - Adding a Keyvault and secret

## Learning Objectives
1. Creating a module from scratch then calling it - [Docs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/modules#definition-syntax)
1. Creating a keyvault - [Docs](https://learn.microsoft.com/en-gb/azure/templates/microsoft.keyvault/vaults?pivots=deployment-language-bicep)
1. Adding a secret to a keyvault - [Docs](https://learn.microsoft.com/en-gb/azure/templates/microsoft.keyvault/vaults/secrets?pivots=deployment-language-bicep)

## Coding required
1. In Modules/keyvault.bicep 
    1. Create the following required parameters:
        - location
        - keyVaultName
        - tags
        - diagnosticsWorkspaceId
        - secret  (note: this must have the @secure() decorator)
        - secretName
    1. Create a new resource using the following template, fitting in your parameters as required:
        ```Bicep
        resource Vault 'Microsoft.KeyVault/vaults@2023-07-01' = {
            name: 
            location: 
            tags: 
            properties: {
                enabledForDeployment: true
                enabledForTemplateDeployment: true
                enabledForDiskEncryption: false
                enableRbacAuthorization: true
                enableSoftDelete: false
                tenantId: tenant().tenantId
                accessPolicies: []
                sku: {
                name: 'standard'
                family: 'A'
                }
                networkAcls: {
                defaultAction: 'Deny'
                bypass: 'AzureServices'
                ipRules: []
                virtualNetworkRules: []
                }
            }
        }
        ```
        NOTE: Make sure "enableSoftDelete: false" is in the properties.  DO NOT set purge protection to true.  This will prevent the deletion of the keyvault in the future.

    1. Connect the keyvault to the Diagnostics workspace using the diagnosticsWorkspaceId
    1. Add a "child" (i.e. using the "parent" feature) resource to the keyvault to add the secret of content type "password"
    1. Round off the module with three outputs:
        1. keyVaultName
        1. keyVaultId
        1. keyVaultUri

1. In the main.bicep file
    1. Take a look at the variable called keyvaultName with the format 'vault-${uniqueName}-${workloadNameInfra}' in lower case.  This is the resource name for your keyvault.
    1. Add your new keyvault module (Modules/keyvault.bicep) after the networking module

1. Additional (if you have time):
    1. See if you can work out how to add your **subnet** network ID to the keyvaults networkACLs to permit only traffic from your network using a VirtualNetworkRule
        - You will need to add a "Service Endpoint" to the networking.bicep module for the subnet
        - You will need to pass the subnet ID to the keyvault module
        - You can see what has changed using the portal - keyvault - Networking
    1. See if you can use the IPRule property to permit your home or work public facing IP address to access the keyvault

## Deploying the lab
1. Open a VS Code terminal (if not already open)
1. Change directory to the lab folder
    ```powershell
    cd .\Workshop-Workloads\VM\Labs\Lab6-Keyvault\
    ```
1. Run the following command to deploy the lab
    ```powershell
    ./deploy.ps1 -verbose
    ```

## Expected Output
1. You will see the output of the Bicep file. The deployment will be successful with no errors.
1. Two new Resource Groups will be created in Azure (if not already present)
1. You will find an existing
    1. Log Analytics Workspace in the Azure Portal in the Infra resource group
    1. network security group with rule that permits RDP traffic
    1. virtual network such that the subnet will have a route table assoicated with it
    1. A route table
    1. Peering both TO and FROM the existing HUB virtual network, from your virtual network
1. You will create a KeyVault as assign the local admin password to it as a secret
1. All the resources will be linked to Diagnostics
1. The module will return a set of outputs.

If additional work done will also see:
1. A network rule that permits traffic from your network to the keyvault
1. An IP rule that permits traffic from your home/work IP address to the vault
