// Deploys the common infrastrcture required to support the Hub
// built as RG scope

//Build out:
//vnet + azure firewall subnet
//azure firewall
//peering to Entra DS
//DNS on vnet to use Entra DS DNS

targetScope = 'resourceGroup'

//Parameters
@description('The local environment identifier.  Default: dev')
param localenv string = 'dev'

@description('Location of the Resources. Default: UK South')
param location string = 'uksouth'

@description('Workload Name')
param workloadName string = 'BTCCentralHub'

@description('Sequence Number')
param sequenceNum string = '001'

@description('Tags to be applied to all resources')
param tags object = {
  Environment: localenv
  WorkloadName: workloadName
  BusinessCriticality: 'medium'
  CostCentre: 'csu'
  Owner: 'Quberatron'
  DataClassification: 'general'
}

param fsLogixUserGroupAssignmentID string

param entraDSVnetName string
param entraDSRGName string
param entraDSSubID string

@secure()
param vaultVMJoinerPassword string

@secure()
param vaultLocalAdminPassword string

var fwpIPName = toLower('pip-${workloadName}-fw-${localenv}-${location}-${sequenceNum}')
var fwmpIPName = toLower('pip-${workloadName}-fwman-${localenv}-${location}-${sequenceNum}')
var bastionIPName = toLower('pip-${workloadName}-${localenv}-${location}-${sequenceNum}')
var vnetName = toLower('vnet-${workloadName}-${localenv}-${location}-${sequenceNum}')
var fwPolName = toLower('fwpol-${workloadName}-${localenv}-${location}-${sequenceNum}')
var fwName = toLower('firewall-${workloadName}-${localenv}-${location}-${sequenceNum}')
var bastionName = toLower('bastion-${workloadName}-${localenv}-${location}-${sequenceNum}')
var lawName = toLower('law-${workloadName}-${localenv}-${location}-${sequenceNum}')
var ipGroupName = toLower('ipg-${workloadName}-${localenv}-${location}-${sequenceNum}')
var storageName = toLower('st${workloadName}${localenv}${sequenceNum}')
var vaultName = toLower('kv-${workloadName}-${localenv}') //max 24 chars

//Create Log Analytics
module law '../ResourceModules/0.11.0/modules/operational-insights/workspace/main.bicep' = {
  name: 'law'
  params: {
    name: lawName
    location: location
    tags: tags
  }
}

//Add Azure Storage account and File Share for FSLogix
//configure the roleAssignments for users to be able to access this storage account from their AVD desktop
module storage '../ResourceModules/0.11.0/modules/storage/storage-account/main.bicep' = {
  name: 'storage'
  params: {
    name: storageName
    location: location
    tags: tags
    allowBlobPublicAccess: false
    skuName: 'Standard_LRS'
    fileServices: {
      shares: [
        {
          accessTier: 'Hot'
          name: 'fslogix'
          roleAssignments: [
            {
              principalId: fsLogixUserGroupAssignmentID
              principalType: 'Group'
              roleDefinitionIdorName: 'Storage File Data SMB Share Contributor'
            }
          ]
        }
        {
          accessTier: 'Hot'
          name: 'classroom'
          roleAssignments: [
            {
              principalId: fsLogixUserGroupAssignmentID
              principalType: 'Group'
              roleDefinitionIdorName: 'Storage File Data SMB Share Contributor'
            }
          ]
        }
      ]
      diagnosticSettings: [
        {
          name: 'diag-${storageName}-fslogix'
          workspaceResourceId: law.outputs.resourceId
        }
      ]
    }
    azureFilesIdentityBasedAuthentication: {
      directoryServiceOptions: 'AADDS'
    }
  }
}



//Create the public ip address for the firewall
module FWpublicIpAddress '../ResourceModules/0.11.0/modules/network/public-ip-address/main.bicep' = {
  name: 'FWpublicIpAddress'
  params: {
    name: fwpIPName
    location: location
    tags: tags
    publicIPAllocationMethod: 'Static'
    zones: [
      1
      2
      3
    ]
    diagnosticSettings: [
      {
        name: 'diag-${fwpIPName}'
        workspaceResourceId: law.outputs.resourceId
      }
    ]
  }
}

//Create the public ip address for the firewall management
module FWMpublicIpAddress '../ResourceModules/0.11.0/modules/network/public-ip-address/main.bicep' = {
  name: 'FWMpublicIpAddress'
  params: {
    name: fwmpIPName
    location: location
    tags: tags
    publicIPAllocationMethod: 'Static'
    zones: [
      1
      2
      3
    ]
    diagnosticSettings: [
      {
        name: 'diag-${fwmpIPName}'
        workspaceResourceId: law.outputs.resourceId
      }
    ]
  }
}

//Create the public ip address for the Bastion
module BastionPublicIpAddress '../ResourceModules/0.11.0/modules/network/public-ip-address/main.bicep' = {
  name: 'BastionPublicIpAddress'
  params: {
    name: bastionIPName
    location: location
    tags: tags
    publicIPAllocationMethod: 'Static'
    diagnosticSettings: [
      {
        name: 'diag-${fwmpIPName}'
        workspaceResourceId: law.outputs.resourceId
      }
    ]
  }
}


//Get the Entra DS Vnet (PROD Sub)
resource vnetEntraDS 'Microsoft.Network/virtualNetworks@2023-05-01' existing = {
  name: entraDSVnetName
  scope: resourceGroup(entraDSSubID,entraDSRGName)
}

//Create the central hub vnet
module vnet '../ResourceModules/0.11.0/modules/network/virtual-network/main.bicep' = {
  name: 'vnet'
  params: {
    name: vnetName
    location: location
    tags: tags
    addressPrefixes: [
      '10.140.1.0/24'
    ]
    dnsServers: [
      '10.99.1.4'
      '10.99.1.5'
    ]
    subnets: [
      {
        addressPrefix: '10.140.1.0/26'
        name: 'AzureFirewallSubnet'
        privateEndpointNetworkPolicies: 'Disabled'
        privateLinkServiceNetworkPolicies: 'Enabled'
      }
      {
        addressPrefix: '10.140.1.64/26'
        name: 'AzureFirewallManagementSubnet'
        privateEndpointNetworkPolicies: 'Disabled'
        privateLinkServiceNetworkPolicies: 'Enabled'
      }
      {
        addressPrefix: '10.140.1.128/26'
        name: 'AzureBastionSubnet'
        privateEndpointNetworkPolicies: 'Disabled'
        privateLinkServiceNetworkPolicies: 'Enabled'
      }
      {
        addressPrefix: '10.140.1.192/26'
        name: 'HubServices'
        privateEndpointNetworkPolicies: 'Disabled'
        privateLinkServiceNetworkPolicies: 'Enabled'
      }
    ]
    peerings: [
      {
        allowForwardedTraffic: true
        allowGatewayTransit: false
        allowVirtualNetworkAccess: true
        remotePeeringAllowForwardedTraffic: true
        remotePeeringAllowVirtualNetworkAccess: true
        remotePeeringEnabled: true
        remotePeeringName: 'EntraDS-${workloadName}'
        remoteVirtualNetworkId: vnetEntraDS.id
        useRemoteGateways: false
      }
    ]
    diagnosticSettings: [
      {
        name: 'diag-${vnetName}'
        workspaceResourceId: law.outputs.resourceId
      }
    ]
  }
}

//Add an IP Group - covers all the IP addresses used in the workshop
module ipGroup '../ResourceModules/0.11.0/modules/network/ip-group/main.bicep' = {
  name: 'ipGroup'
  params: {
    name: ipGroupName
    location: location
    tags: tags
    ipAddresses: [
      '10.140.1.0/24'
      '10.140.0.0/24'
      '10.140.1.0/24'
      '10.140.2.0/24'
      '10.140.3.0/24'
      '10.141.1.0/24'
      '10.141.2.0/24'
      '10.141.3.0/24'
      '10.141.4.0/24'
      '10.141.5.0/24'
      '10.141.6.0/24'
      '10.141.7.0/24'
      '10.141.8.0/24'
      '10.141.9.0/24'
      '10.141.10.0/24'
      '10.141.11.0/24'
      '10.141.12.0/24'
      '10.141.13.0/24'
      '10.141.14.0/24'
      '10.141.15.0/24'
      '10.141.16.0/24'
      '10.141.17.0/24'
      '10.141.18.0/24'
      '10.141.19.0/24'
      '10.141.20.0/24'
    ]
  }
}

//Create the firewall policy - module preferred but does not support basic tier
resource firewallPolicy 'Microsoft.Network/firewallPolicies@2022-01-01'= {
  name: fwPolName
  location: location
  tags: tags
  properties: {
    threatIntelMode: 'Alert'
    sku: {
      tier: 'Basic'
    }
  }
}

//Create a rule group
//include rules to route traffic from ip group to Entra DS
resource ruleCollectionGroup 'Microsoft.Network/firewallPolicies/ruleCollectionGroups@2023-04-01' = {
  name: 'DefaultNetworkRuleCollectionGroup'
  parent: firewallPolicy
  properties: {
    priority: 100
    ruleCollections: [
      {
        name: 'BTC-Spokes'
        ruleCollectionType: 'FirewallPolicyFilterRuleCollection'
        priority: 100
        action: {
          type: 'Allow'
        }
        rules: [
          {
            ruleType: 'NetworkRule'
            name: 'Spokes-to-EntraDS'
            ipProtocols: [
              'Any'
            ]
            sourceAddresses: []
            sourceIpGroups: [
              ipGroup.outputs.resourceId
            ]
            destinationAddresses: [
              '10.99.99.0/24'
            ]
            destinationPorts: [
              '*'
            ]
          }
        ]
      }
    ]
  }
}

resource ruleCollectionGroupApps 'Microsoft.Network/firewallPolicies/ruleCollectionGroups@2023-04-01' = {
  name: 'DefaultApplicationRuleCollectionGroup'
  parent: firewallPolicy
  properties: {
    priority: 300
    ruleCollections: [
      {
        name: 'InternetTraffic'
        ruleCollectionType: 'FirewallPolicyFilterRuleCollection'
        action: {
          type: 'Allow'
        }
        rules: [
          {
            ruleType: 'ApplicationRule'
            name: 'AllWebOut'
            protocols: [
              {
                protocolType: 'Http'
                port: 80
              }
              {
                protocolType: 'Https'
                port: 443
              }
            ]
            targetFqdns: [
              '*'
            ]
            sourceIpGroups: [
              ipGroup.outputs.resourceId
            ]
          }
        ]
        priority: 100
      }
    ]
  }
  dependsOn: [
    ruleCollectionGroup
  ]
}

//Create the basic firewall and associate policy
module firewall '../ResourceModules/0.11.0/modules/network/azure-firewall/main.bicep' = {
  name: 'firewall'
  params: {
    name: fwName
    location: location
    tags: tags
    azureSkuTier: 'Basic'
    managementIPResourceID: FWMpublicIpAddress.outputs.resourceId
    publicIPResourceID: FWpublicIpAddress.outputs.resourceId
    vNetId: vnet.outputs.resourceId
    firewallPolicyId: firewallPolicy.id
    diagnosticSettings: [
      {
        name: 'diag-${fwName}'
        workspaceResourceId: law.outputs.resourceId
      }
    ]
  }
}


//Add a Bastion (basic)
module bastionHost '../ResourceModules/0.11.0/modules/network/bastion-host/main.bicep' = {
  name: 'bastionHost'
  params: {
    name: bastionName
    location: location
    tags: tags
    vNetId: vnet.outputs.resourceId
    skuName: 'Basic'
    diagnosticSettings: [
      {
        name: 'diag-${bastionName}'
        workspaceResourceId: law.outputs.resourceId
      }
    ]
    bastionSubnetPublicIpResourceId: BastionPublicIpAddress.outputs.resourceId
  }
  
}


//Add a KeyVault as a central secret store that trainees can access
resource Vault 'Microsoft.KeyVault/vaults@2023-07-01' = {
  name: vaultName
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
      virtualNetworkRules: []
    }
  }
}

resource DomainAdminPwd 'Microsoft.KeyVault/vaults/secrets@2022-11-01' = if (!empty(vaultVMJoinerPassword)) {
  name: 'VMJoinerPassword'
  parent: Vault
  properties: {
    value: vaultVMJoinerPassword
    contentType: 'password'
  }
}

//Add the Local Admin Password securet to the vault
resource LocalAdminPwd 'Microsoft.KeyVault/vaults/secrets@2022-11-01' = if (!empty(vaultLocalAdminPassword)) {
  name: 'LocalAdminPassword'
  parent: Vault
  properties: {
    value: vaultLocalAdminPassword
    contentType: 'password'
  }
}
