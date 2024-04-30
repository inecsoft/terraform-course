/*
This BICEP script sets up a VNET for the AVD to reside in.
Note also that there is no TargetScope defined.  The reason for this is not that "ResourceGroup" is actually the default setting.
*/

//PARAMETERS
//As best practice it is always a good idea to try and maintain a naming convention and style for all your modules and resources
//You will notice a lot of these parameters take the same name as their parent, but notice that many are now required, feeding from the parent.
//This way, modules can be used for other projects as well without having to durplicate and edit defaults.

//This is an example of an optional parameter.  If no value is passed in, UK South will be used as the default region to deploy to
@description ('Optional: The Azure region to deploy to')
param location string = 'uksouth'

//This is an example where the parameter passed in is limited to only that within the allowed list.  Anything else will cause an error
@description ('Optional: The local environment - this is appended to the name of a resource')
@allowed([
  'dev'
  'test'
  'uat'
  'prod'
])
param localEnv string = 'dev' //dev, test, uat, prod

//Tags to assign to the resources
@description ('Optional: The tags that will be associated with each deployed resource')
param tags object = {
  environment: localEnv
  workloadInfra: 'BTC'
}

//Security
@description('Required: The name of the Network Security Group resource to be deployed in Azure')
param nsgName string

//Network
@description('Required: The name of the Virtual Network resource to be deployed in Azure')
param vnetName string

@description('Required: The name of the Virtual Network Subnet resource to be deployed in Azure')
param snetName string

@description('Required: The address prefix (CIDR) for the virtual network. e.g. 10.20.30.0/24')
param vnetIPCIDR string

@description('Required: The address prefix (CIDR) for the virtual networks AVD subnet. e.g. 10.20.30.0/24')
param snetIPCIDR string

//Diagnostics
@description('Optional: The ID of the Log Analytics workspace to which you would like to send Diagnostic Logs.')
param diagnosticWorkspaceId string = ''


//Create the Network Security Group (there is very little to creating one, but it is a good idea to have one for each subnet)
//Ref: https://learn.microsoft.com/en-gb/azure/templates/microsoft.network/networksecuritygroups?tabs=bicep&pivots=deployment-language-bicep
resource networkSecurityGroup 'Microsoft.Network/networkSecurityGroups@2023-09-01' = {
  name: nsgName
  location: location
  tags: tags
}

//CODE: Create the Resource for the Network Security Group called networkSecurityGroup with name nsgName.  It should be only a basic shell and will not require any parameters

//Enable Diagnostics on the NSG
//In this case we have a scope in the resource which defines which resource that this diagnostic setting is for
//We are also using some logic, so if this is not passed in from the parent, then this will be skipped without causing errors
//Ref: https://learn.microsoft.com/en-gb/azure/templates/microsoft.insights/diagnosticsettings?tabs=bicep&pivots=deployment-language-bicep

//CODE: What does the "if" statement do?
resource networkSecurityGroup_diagnosticSettings 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = if (!empty(diagnosticWorkspaceId)) {
  name: '${nsgName}-diag'
  scope: //CODE: Scope here
  properties: {
    //CODE: What does this mean?
    workspaceId: !empty(diagnosticWorkspaceId) ? diagnosticWorkspaceId : null
    logs: [
      {
        categoryGroup: 'allLogs'
        enabled: true
      }
    ]
  }
}

//Set up the AVD rule for the NSG
//Note: AVD does not require RDP access from anywhere as the connection is handled by the PaaS service underneath
//There are other forms of connection available as well, but this is the most common.
//Ref: https://learn.microsoft.com/en-gb/azure/templates/microsoft.network/networksecuritygroups/securityrules?tabs=bicep&pivots=deployment-language-bicep
resource securityRule 'Microsoft.Network/networkSecurityGroups/securityRules@2023-09-01' = {
  //CODE: Fill in the name and properties here
}

//Create the virtual network (vnet) and subnet (snet) objects
//Note that the SNET will have a set of storage endpoints and keyvault endpoints enabled
//Ref: VNET: https://learn.microsoft.com/en-gb/azure/templates/microsoft.network/virtualnetworks?tabs=bicep&pivots=deployment-language-bicep
//Ref: SNET: https://learn.microsoft.com/en-gb/azure/templates/microsoft.network/virtualnetworks/subnets?pivots=deployment-language-bicep
resource virtualNetwork 'Microsoft.Network/virtualNetworks@2022-07-01' = {
  name: vnetName
  location: location
  tags: tags
  properties: {
    addressSpace: {
      addressPrefixes: //CODE: Fill in the virtual network address, remember it can have more than one
    }
    subnets: [
      {
        name: snetName
        properties: {
          addressPrefix: snetIPCIDR
          networkSecurityGroup: {
            id: //CODE: Link it to the security group
          }
        }
      }]
  }
}

//As for the NSG, we can also apply diagnostics to the VNET (and subnets automatically)
//You will note that the diagnostic settings follow a very similar pattern.  This is a prime candidate for a module
resource virtualNetwork_diagnosticSettings 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = if (!empty(diagnosticWorkspaceId)) {
  name: '${vnetName}-diag'
  scope: //CODE: Link this to the virtualNetwork
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

//OUTPUTS
//Ref: https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/outputs?tabs=azure-powershell

//CODE: Create the outputs as per the README
