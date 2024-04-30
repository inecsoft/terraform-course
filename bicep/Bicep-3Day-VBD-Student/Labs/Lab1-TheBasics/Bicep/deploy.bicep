/*
The deploy.bicep is simply a way of coordinating all of the moving part of this deployment so you dont have to deploy each section individually.
First it will create two resource groups, one for the infrastructure and the other for the VM's
Then this script will call the following:

diagnostics.bicep - This will deploy the diagnostics components

Useful links:
Resource abbreviations: https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/resource-abbreviations

*/

//TARGET SCOPE
targetScope = ''

//PARAMETERS
//Parameters provide a way to pass in values to the bicep script.  They are defined here and then used in the modules and variables below
//Some parameters are required, some are optional.  "optional" parameters are ones that have default values already set, so if you dont
//pass in a value, the default will be used.  If a parameter does not have a default value set, then you MUST pass it into the bicep script
//Ref: https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/parameters

//This is an example of an optional parameter.  If no value is passed in, UK South will be used as the default region to deploy to
@description ('Optional: The Azure region to deploy to')

//CODE: Location string parameter (location)//

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

//CODE: Unique name parameter (uniqueName), description and maxLength decorator//


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

//CODE: Tags object parameter containiig environment, workloadInfra and costCentre//
