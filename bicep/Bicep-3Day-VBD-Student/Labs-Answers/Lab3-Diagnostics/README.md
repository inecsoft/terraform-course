# Lab 3 - Creating a Log Analytics Service (diagnostics)

## Learning Objectives
1. Variables - [Docs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/variables)
1. Anatomy of a Module - [Docs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/modules)
1. Module Scope = [Docs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/modules#set-module-scope)
1. Outputs - [Docs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/outputs)
1. Accessing Properties - [Docs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/operators-access#property-accessor)
1. ResourceGroup target scope - [Docs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/deploy-to-resource-group)
1. Creating a Log Analytics Workspace - [Docs](https://learn.microsoft.com/en-gb/azure/templates/microsoft.operationalinsights/workspaces?pivots=deployment-language-bicep)

## Coding required
1. Create a variable called diagnosticsName, in lower case with the format: "law-unique name-Infra workload" e.g. 'law-tester-infra'
1. Create a log analytics module called "LAWorkspace" and point it to "Modules/diagnostics.bicep" with the correct Scope
1. In the Modules/diagnostics.bicep module:
    1. Set the correct targetScope
    1. Pull in a parameter called lawName which is a string and give it a Description
    1. Work out the properties for a simple log analytics workspace - [API doc](https://learn.microsoft.com/en-gb/azure/templates/microsoft.operationalinsights/workspaces?pivots=deployment-language-bicep)
    1. Output the lawName and the resources ID as lawID
1. In the deploy.bicep module, add an Output for the log analytics ID

Example module call:
```Bicep
module myModule 'myPath/myModule.bicep' = {
  name: 'MyModuleName'
  scope: myRGToDeployTo
  params: {
    location: location
    tags: myTags
  }
}
```

## Deploying the lab
1. Open a VS Code terminal (if not already open)
1. Change directory to the lab folder
    ```powershell
    cd .\Workshop-Workloads\VM\Labs\Lab3-Diagnostics\
    ```
1. Run the following command to deploy the lab
    ```powershell
    ./deploy.ps1 -verbose
    ```

## Expected Output
1. You will see the output of the Bicep file. The deployment will be successful with no errors.
1. Two new Resource Groups will be created in Azure (if not already present)
1. You will find a new Log Analytics Workspace in the Azure Portal in the Infra resource group
