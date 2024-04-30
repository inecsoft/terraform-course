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

@description('Required: The name of the Route Table resource to be deployed in Azure')
param routeTableName string

@description('Required: The address prefix (CIDR) for the virtual network. e.g. 10.20.30.0/24')
param vnetIPCIDR string

@description('Required: The address prefix (CIDR) for the virtual networks AVD subnet. e.g. 10.20.30.0/24')
param snetIPCIDR string

//Firewall (already set up in hub)
@description('Optional: The IP Address of the Azure Firewall to route traffic through')
param firewallIP string

//Hub Network (already existing)
@description('Required: The name of the Resource Group containing the hub network')
param hubRG string

@description('Required: The name of the Virtual Network in the hub network')
param hubVnetName string

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

//Enable Diagnostics on the NSG
//In this case we have a scope in the resource which defines which resource that this diagnostic setting is for
//We are also using some logic, so if this is not passed in from the parent, then this will be skipped without causing errors
//Ref: https://learn.microsoft.com/en-gb/azure/templates/microsoft.insights/diagnosticsettings?tabs=bicep&pivots=deployment-language-bicep
resource networkSecurityGroup_diagnosticSettings 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = if (!empty(diagnosticWorkspaceId)) {
  name: '${nsgName}-diag'
  scope: networkSecurityGroup
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

//Set up the AVD rule for the NSG
//Note: AVD does not require RDP access from anywhere as the connection is handled by the PaaS service underneath
//There are other forms of connection available as well, but this is the most common.
//Ref: https://learn.microsoft.com/en-gb/azure/templates/microsoft.network/networksecuritygroups/securityrules?tabs=bicep&pivots=deployment-language-bicep
resource securityRule 'Microsoft.Network/networkSecurityGroups/securityRules@2023-09-01' = {
  name: 'permit-rdp-from-vnet'
  parent: networkSecurityGroup
  properties: {
    access: 'Allow'
    description: 'Allow RDP access VMs from the Virtual Network'
    direction: 'Inbound'
    priority: 1000
    protocol: 'Tcp'
    sourceAddressPrefix: 'VirtualNetwork'
    sourcePortRange: '*'
    destinationAddressPrefix: '*'
    destinationPortRange: '3389'
  }
}

//Add a route table to route traffic to the hub vnet
//rule 0.0.0.0/0 route all traffic not related to this vnet to the Azure Firewall in the hub to onward route accordingly.
//this is required to access the Entra domain Services vnet, bastion services and each others vnets.

//Create the route table
//REF: https://learn.microsoft.com/en-gb/azure/templates/microsoft.network/routetables?pivots=deployment-language-bicep
resource routeTable 'Microsoft.Network/routeTables@2023-04-01' = {
  name: routeTableName
  location: location
  tags: tags
  properties: {
    disableBgpRoutePropagation: false
    //CODE: Create the route with details as shown in the README.  Remember that route tables can have more than one route
  }
}

//Note add the route separately, with an IF on the FW IP address

//Create the virtual network (vnet) and subnet (snet) objects
//Note that the SNET will have a set of storage endpoints and keyvault endpoints enabled
//Ref: VNET: https://learn.microsoft.com/en-gb/azure/templates/microsoft.network/virtualnetworks?tabs=bicep&pivots=deployment-language-bicep
//Ref: SNET: https://learn.microsoft.com/en-gb/azure/templates/microsoft.network/virtualnetworks/subnets?pivots=deployment-language-bicep
resource virtualNetwork 'Microsoft.Network/virtualNetworks@2023-09-01' = {
  name: vnetName
  location: location
  tags: tags
  properties: {
    addressSpace: {
      addressPrefixes: [
        vnetIPCIDR
      ]
    }
    subnets: [
      {
        name: snetName
        properties: {
          addressPrefix: snetIPCIDR
          networkSecurityGroup: {
            id: networkSecurityGroup.id
          }
          //CODE: Associate the route table with the virtual network
        }
      }]
  }
}

//As for the NSG, we can also apply diagnostics to the VNET (and subnets automatically)
//You will note that the diagnostic settings follow a very similar pattern.  This is a prime candidate for a module
resource virtualNetwork_diagnosticSettings 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = if (!empty(diagnosticWorkspaceId)) {
  name: '${vnetName}-diag'
  scope: virtualNetwork
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

//Peering - This Vnet to the Hub Vnet
//This next set of resources defines the peering between two networks.  Note that Peering is a two-sided process, i.e. you need to apply the peering as
//two separate transations, one at each end of the link.  this is provided as a module.  the reason for this is that we need to provide two
//different scopes - one for each end and you can only scope modules in Bicep.

//So first lets pull in the existing hub vnet
//Get the existing HUB vnet by name - needed for peering

//CODE: Pull in the "existing" hub virtual network using 'Microsoft.Network/virtualNetworks@2023-09-01'
//CODE: name is the parameter hubVnetName and it resides in Resource Group hubRG

//So this first resource uses the existing vnet that we created earlier to link to the identity vnet using the vnets resource id
//No scope is required on this one as it wull run in the scope as everything else we are creating.  We are just going to use
//the modules defaults for the majority of this

//CODE: Open the peering.bicep and try to understand what it does
//CODE: Fill in the outbound peering module call using the peering.bicep to connect:
//CODE: From: virtualNetwork.name
//CODE: To: hubVnet.id
module outboundPeering 'peering.bicep' = {
  //CODE: fill this in
}

//So this module does the reverse part of the connection FROM the remote VNET to this local VNET.  In this case it does need to be scoped
//as we will be working on the REMOTE resource this time.
//Ref: Scoping: https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/bicep-functions-scope

//CODE: do the same the other way round FROM the hubVnetName to the virtualNetwork.id
//CODE: Remember, peering originates FROM the resource you are working on TO the resource you are peering with
//CODE: So you need to think about scope for this call as it is FROM the hub virtual network
module inboundPeering 'peering.bicep' = {
  //CODE: fill this in
}

//OUTPUTS
//Ref: https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/outputs?tabs=azure-powershell
output vnetName string = virtualNetwork.name
output vnetID string = virtualNetwork.id
output snetName string = virtualNetwork.properties.subnets[0].name
output snetID string = virtualNetwork.properties.subnets[0].id
output nsgName string = networkSecurityGroup.name
output nsgID string = networkSecurityGroup.id
