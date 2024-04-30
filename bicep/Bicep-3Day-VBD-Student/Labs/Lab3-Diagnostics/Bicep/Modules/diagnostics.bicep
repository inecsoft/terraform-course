/*
The Diagnostics BICEP script deploys a Log Analystic Workspace.
The LAW is used for general diagnostic input from all the other deployed resources

This bicep script will be run in "Resource Group" mode, so the resources will need to be deployed into an existing RG.
*/

//TARGET SCOPE
//CODE: Set the correct target scope for this module
targetScope = ''

//PARAMETERS
//Parameters provide a way to pass in values to the bicep script.  They are defined here and then used in the modules and variables below
//Some parameters are required, some are optional.  "optional" parameters are ones that have default values already set, so if you dont
//pass in a value, the default will be used.  If a parameter does not have a default value set, then you MUST pass it into the bicep script

//CODE: Create a parameter called "lawName" of type string and give it a descriptions as well

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

//This component is a bit more complex as it is an object.  This is passed in from powershell as a @{} type object
//Tags are really useful and show, as part of good practice, be applied to all resources and resource groups (where possible)
//They are used to help manage the service.  Resources that are tagged can then be used to create cost reports, or to find all resources assicated with a particular tag
@description ('Optional: The tags that will be associated with each deployed resource')
param tags object = {
  environment: localEnv
  workloadInfra: 'BTC'
}

//Notice in this paramater case, we are using integers.  If passing in from powershell, we may need to use casting using the [int] type
@description('Optional: The number of days to retain data in the Log Analytics Workspace')
param lawDataRetention int = 30 //30 days is the minimum

//VARIABLES
//Variables are created at runtime and are usually used to build up resource names where not defined as a parameter, or to use functions and logic to define a value
//In most cases, you could just provide these as defaulted parameters, however you cannot use logic on parameters
//Variables are defined in the code and, unlike parameters, cannot be passed in and so remain fixed inside the template.

var lawSKU = 'PerGB2018'

//RESOURCES

//Deploy the Log Analytics Workspace (notice the name is not actually log analytics workspace but Operational Insights)

//Resource anatomy continued:
//Properties: Properties tell a resource how to behave and what to do.  Each resource type has its own properties.  You should not that most, but not all, are optional
//            You need to take a look at the documentation for the resource type to see what is required

resource logAnalyticsWorkspace 'Microsoft.OperationalInsights/workspaces@2023-09-01' = {
  location: location
  name: lawName
  tags: tags

  properties: {
    //CODE: Fill out the properties.  Check the documentation for correct values.  Remember to use the variables and parameters where appropriate
  }
}



//OUTPUTS
//This is the output of the bicep script.  It is used to provide information back to the user or to other scripts.  It works a bit like a "reverse" parameter and uses the same format.
//Outside of this module, you will be able to use the names and values defined here to pass into other scripts, resources, modules or to display to the user
//Outputs also are displayed as part of the deployment phase within Azure Portal

//Note: When it comes to modules, everything within them is "Private" and cannot be accessed outside of the module.  Outputs is the only way to pass this information out to calling scripts

output lawName string = lawName

//CODE: Create another output for the log analytics ID called lawID

