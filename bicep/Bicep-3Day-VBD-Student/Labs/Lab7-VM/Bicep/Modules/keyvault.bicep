/*
This BICEP script sets up a Kevault to contain the domain admin password and host local admin password.
*/

//PARAMETERS
@description ('Required: The Azure region to deploy to')
param location string

@description('Required: The name of the keyvault to be created.')
param keyVaultName string

@description('Required: An object (think hash) that contains the tags to apply to all resources.')
param tags object

@description('Required: The ID of the Log Analytics workspace to which you would like to send Diagnostic Logs.')
param diagnosticWorkspaceId string

@secure()
@description('Required: The secret to be stored in the keyvault')
param secret string

@description('Required: The password to be stored in the keyvault')
param secretName string = 'none'

@description('Optional: Whether to update the keyvault passwords. Default is true.')
param updateVault bool = true

@description('Optional: The ID of the Subnet to link to the keyvault. Default is an empty string.')
param snetID string

//VARIABLES

//RESOURCES
//Deploy a keyvault
//Note: By default a keyvault cannot be deleted (purged), so the parameters below specifically override that behaviour
//Note: We are also allowing AzureServices to access the vault but otherwise deny access.
//Ref: https://learn.microsoft.com/en-gb/azure/templates/microsoft.keyvault/vaults?tabs=bicep&pivots=deployment-language-bicep 
resource Vault 'Microsoft.KeyVault/vaults@2023-07-01' = {
  name: keyVaultName
  location: location
  tags: tags
  properties: {
    enabledForDeployment: true
    enabledForTemplateDeployment: true
    enabledForDiskEncryption: false
    //enablePurgeProtection: false (only if soft delete is set to true)
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
      virtualNetworkRules: [
        {
          id: snetID
          ignoreMissingVnetServiceEndpoint: true
        }
      ]
    }
  }
}

resource virtualNetwork_diagnosticSettings 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = if (!empty(diagnosticWorkspaceId)) {
  name: '${keyVaultName}-diag'
  scope: Vault
  properties: {
    workspaceId: !empty(diagnosticWorkspaceId) ? diagnosticWorkspaceId : null
    logs: [
      {
        categoryGroup: 'allLogs'
        enabled: true
      }
    ]
  }
}

//Add the secret to the vault
//Only do this IF the update vault is true
//Ref: https://learn.microsoft.com/en-gb/azure/templates/microsoft.keyvault/vaults/secrets?pivots=deployment-language-bicep
resource Secret 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = if (updateVault) {
  name: secretName
  parent: Vault
  properties: {
    value: secret
    contentType: 'password'
  }
}

//OUTPUTS
output keyVaultName string = Vault.name
output keyVaultId string = Vault.id
output keyVaultUri string = Vault.properties.vaultUri
