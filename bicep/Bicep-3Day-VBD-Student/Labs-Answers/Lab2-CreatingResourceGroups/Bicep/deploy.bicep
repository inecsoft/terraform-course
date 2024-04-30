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

//Infra Resource Group
@description ('Required: The name of the resource group where the infrastructure components will be deployed to')
param rgInfra string = toUpper('RG-BTC-${uniqueName}-${workloadNameInfra}-${location}-${localEnv}')

@description ('Required: The name of the resource group where the vm components will be deployed to')
param rgVM string = toUpper('RG-BTC-${uniqueName}-${workloadNameVM}-${location}-${localEnv}')

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

