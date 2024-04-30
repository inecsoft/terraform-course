/*
The deploy.bicep is simply a way of coordinating all of the moving part of this deployment so you dont have to deploy each section individually.
First it will create two resource groups, one for the infrastructure and the other for the VM's
Then this script will call the following:

diagnostics.bicep - This will deploy the diagnostics components

Useful links:
Resource abbreviations: https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/resource-abbreviations

*/

//TARGET SCOPE
targetScope = 'subscription'

//PARAMETERS
//Parameters provide a way to pass in values to the bicep script.  They are defined here and then used in the modules and variables below
//Some parameters are required, some are optional.  "optional" parameters are ones that have default values already set, so if you dont
//pass in a value, the default will be used.  If a parameter does not have a default value set, then you MUST pass it into the bicep script
//Ref: https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/parameters

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

//This is an example of a required component.  Note there is no default value so the script will expect it to be passed in
//This is also limited to a maximum of 6 characters.  Any more an it will cause an error
@description ('Required: A unique name to define your resource e.g. you name.  Must not have spaces')
@maxLength(6)
param uniqueName string

@description ('Optional: The name of the infrastructure workload to deploy - will make up part of the name of a resource')
param workloadNameInfra string = 'infra'

@description ('Optional: The name of the VM workload to deploy - will make up part of the name of a resource')
param workloadNameVM string = 'vm'

//This component is a bit more complex as it is an object.  This is passed in from powershell as a @{} type object
//Tags are really useful and show, as part of good practice, be applied to all resources and resource groups (where possible)
//They are used to help manage the service.  Resources that are tagged can then be used to create cost reports, or to find all resources assicated with a particular tag
@description('Optional: An object (think hash or associative array if you are familiar with other languages) that contains the tags to apply to all resources.')
param tagsInfra object = {
  environment: localEnv
  workloadInfra: workloadNameInfra
  costCentre: 'infrateam: 12345'
}

@description('Optional: An object (think hash or associative array if you are familiar with other languages) that contains the tags to apply to all resources.')
param tagsVM object = {
  environment: localEnv
  workloadInfra: workloadNameVM
  costCentre: 'vmteam: 98765'
}

//Firewall Details (already existing)
@description('Required: The name of the firewall resource group')
param firewallRG string

@description('Required: The name of the firewall resource')
param firewallName string

//Hub Details (already existing)
@description('Required: The name of the hub resource group')
param hubRG string

@description('Required: The name of the hub vnet')
param hubVnetName string

//Your VNET Details
@description('Required: The CIDR of the AVD vnet to create e.g. 10.20.30.0/24')
param vnetIPCIDR string 

//Note: this uses an inline function to automatically calculate a subnet CIDR based on the one provided to the VNET if a range is not provided
//REF: https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/bicep-functions-cidr
@description('Required: The address prefix (CIDR) for the virtual networks AVD subnet. e.g. 10.20.30.0/24')
param snetIPCIDR string = cidrSubnet(vnetIPCIDR,25,0)

//Infra Resource Group
@description ('Required: The name of the resource group where the infrastructure components will be deployed to')
param rgInfra string = toUpper('RG-BTC-${uniqueName}-${workloadNameInfra}-${location}-${localEnv}')

@description ('Required: The name of the resource group where the vm components will be deployed to')
param rgVM string = toUpper('RG-BTC-${uniqueName}-${workloadNameVM}-${location}-${localEnv}')

//Passwords
//This is a sepecial "decorator" that is used to mark a parameter as a secure string.  This means that the value passed in will be encrypted and not shown in the logs
@secure()
@description('Required: The password for the local admin account')
param localAdminPassword string

@description('Required: Update the vault with the local admin password only if true, otherwise use the existing password in the vault')
param updateVault bool = true

@description('Optional: The name of the local admin account')
param localAdminUserName string = 'localadmin'

//VARIABLES
// Variables are created at runtime and are usually used to build up resource names where not defined as a parameter, or to use functions and logic to define a value
// In most cases, you could just provide these as defaulted parameters, however you cannot use logic on parameters
//Variables are defined in the code and, unlike parameters, cannot be passed in and so remain fixed inside the template.
//Ref: https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/variables

//Diagnostics
var diagnosticsName = toLower('law-${uniqueName}-${workloadNameInfra}')

//Networking
var nsgName = toLower('nsg-${uniqueName}-${workloadNameInfra}-${location}-${localEnv}')
var vnetName = toLower('vnet-${uniqueName}-${workloadNameInfra}-${location}-${localEnv}')
var snetName = toLower('snet-virtualmachines')
var routeTableName = toLower('rt-${uniqueName}-${workloadNameInfra}-${location}-${localEnv}')

//Keyvault
var keyvaultName = toLower('vault-${uniqueName}-${workloadNameInfra}')

//VM Base Names
var baseNameLong = toLower('vm-${uniqueName}-${workloadNameVM}-${location}-${localEnv}')
var baseNameShort = toLower('vm-${uniqueName}')

//RESOURCES
//There are two deployments that will be used here.  The frist is a Direct deployment which will create the Resource Groups
//Then we will use a Module deployment for everything else.
//Ref: Resources: https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/resource-declaration?tabs=azure-powershell
//Ref: Modules: https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/modules 

//Anatomy of a "resource"
//In Azure Bicep, the 'resource' command is used to define a resource that you want to deploy. This command includes a symbolic 'name' for the resource,
//which is used in other parts of the Bicep file to get a value from the resource. Each resource usually has a 'location' as well - i.e. which geographic region the resource is deployed to.
//The resource declaration also includes the resource 'type' and 'API version':
// Resource Type: This indicates the kind of Azure resource you’re setting up.  For example, Microsoft.Resources/resourceGroups indicates that you’re setting up a resource group
// API Version: This tells Azure which version of its Resource Manager (ARM) API to use. Each API version offers different features (usually progressive), but the API version allows you to ensure
//              that the script will always use the same way of calling resources to ensure reliability, consistency and prevent changes in resources breaking the script.
// Tags: Tags are key-value pairs that you can use to organise and manage Azure resources. You can apply tags to resources and resource groups to help you manage your resources more effectively (best practice).

//There are additional parameters, but we will come to those as we start deploying resources.

//Deploy the Infra Resource Group
resource rgInfraResourceGroup 'Microsoft.Resources/resourceGroups@2023-07-01' = {
  name: rgInfra
  location: location
  tags: tagsInfra
  properties: { }

}

//Deploy the VM Resource Group
resource rgVMResourceGroup 'Microsoft.Resources/resourceGroups@2023-07-01' = {
  name: rgVM
  location: location
  tags: tagsVM
}

//So there is also another form of the "resource" command which is using the "existing" keyword.  Rather than create or change a resource, this uses the details to pull
//in an existing resource without making any changes (i.e. read only).  This is useful for when you want to use an existing resource in a deployment or cross-link to another deployment
//Ref: https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/existing-resource 

//Get the existing firewall using the existing keyword
resource existingFirewall 'Microsoft.Network/azureFirewalls@2023-09-01' existing = {
  name: firewallName
  scope: resourceGroup(firewallRG)
}

//This pulls the private facing IP address of the firewall out of the exisitng firewall deployment in the hub.
//this does make the assumption that there is only one internal private IP address (hence the ipConfigurations[0])
//What this is doing is reacing into the firewall resource, getting the first internal network interface, then getting the IP address of that interface
var firewallIP = existingFirewall.properties.ipConfigurations[0].properties.privateIPAddress

//Now we look at the module deployments.
//In Azure Bicep, a "module" is a reusable piece of code that encapsulates a set of Azure resource deployments. It allows you to group resources that are commonly deployed together 
//into a single unit, which can then be used in multiple places, much like a function in programming.
//A good metaphor for a module would be a "Lego block". Just as Lego blocks can be assembled in various ways to create different structures, modules can be used and reused to build 
//complex infrastructure setups in Azure. Each module, like a Lego block, is a standalone unit that serves a specific purpose, but when combined with other modules, it contributes 
//to a larger, more complex structure. This approach promotes code reuse and simplifies the management of Azure resources.

//Anatomy  of a "Module"
//Module Keyword (module): This keyword is used to call a Bicep module.
//Module Identifier: This is a unique identifier for the module instance. You can use this identifier to reference the module elsewhere in your Bicep file.
//Module Path ('./module.bicep'): This is the path to the Bicep file that defines the module. The path can be either absolute or relative to the Bicep file that’s calling the module.
//Module Properties:
//  name (string): This is the name of the module instance. Azure uses this name to track the module’s deployment state.  This is what appears in Azure's activity log and "Deployments"
//  scope (resourceGroup object): This is the scope at which the module will be deployed. The scope can be a resource group or subscripiton in this case.
//  params (object): These are the input parameters for the module. The keys in this object should match the parameter names defined in the module, and the values are the actual values you want to pass to the module.

//This module is used to deploy the Log Analytics Diagnostics and dashboard service.
//Ref: https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-analytics-overview 
module LAWorkspace 'Modules/diagnostics.bicep' = {
  name: diagnosticsName
  scope: rgInfraResourceGroup
  params: {
    lawName: diagnosticsName
    location: location
    tags: tagsInfra
  }
}


//This module will deploy all the required networking components
module networking 'Modules/networking.bicep' = {
  name: 'networking'
  scope: rgInfraResourceGroup
  params: {
    location: location
    tags: tagsInfra
    nsgName: nsgName
    vnetName: vnetName
    snetName: snetName
    vnetIPCIDR: vnetIPCIDR
    snetIPCIDR: snetIPCIDR
    routeTableName: routeTableName
    firewallIP: firewallIP
    hubRG: hubRG
    hubVnetName: hubVnetName
    diagnosticWorkspaceId: LAWorkspace.outputs.lawID
  }
}

//This module will deploy the Keyvault used to store the local admin password.  this password is acquired from the user as a secure string then stored in the vault.
module keyvault 'Modules/keyvault.bicep' = {
  name: 'keyvault'
  scope: rgInfraResourceGroup
  params: {
    location: location
    tags: tagsInfra
    diagnosticWorkspaceId: LAWorkspace.outputs.lawID
    keyVaultName: keyvaultName
    secret: localAdminPassword
    secretName: localAdminUserName
    updateVault: updateVault
    snetID: networking.outputs.snetID
  }
}

//Finally lets deploy the VMs
module vms 'Modules/multiplevms.bicep' = {
  name: 'MultipleVMs'
  scope: rgVMResourceGroup
  params: {
    location: location
    tags: tagsVM
    localEnv: localEnv
    subnetID: networking.outputs.snetID
    keyvaultName: keyvault.outputs.keyVaultName
    keyvaultRG: rgInfra
    localAdminUserName: localAdminUserName
    vmBaseResourceName: baseNameLong
    vmBaseName: baseNameShort
    defaultVMSize: 'Standard_D2s_v3'
    numberOfHostsToDeploy: 2
  }
}

//Outputs
//Outputs are used when you need to return values from the deployed resources. They allow you to extract information from the resources you’ve deployed, which can be useful for debugging, 
//connecting resources together, or displaying information to the user.
//The syntax for defining an output value in Bicep is as follows and works in much the same way as a parameter:
//  output <name> <data-type or type-expression> = <value>
//  Here, <name> is the name of the output, <data-type or type-expression> is the data type of the output, and <value> is the value that you want to return.

// Output to retrieve the Log Analytics Workspace ID from the LAWorkspace module
output LawID string = LAWorkspace.outputs.lawID

// Output to retrieve the firewall IP address
output firewallIP string = firewallIP
