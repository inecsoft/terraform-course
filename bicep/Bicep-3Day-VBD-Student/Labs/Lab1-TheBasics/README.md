# Lab 1 - The Basics

## Learning Objectives

1. Best Practice - [Docs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/best-practices)
1. Understanding comments - [Docs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/file#comments)
1. Target Scope - [Docs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/deploy-to-subscription)
1. Decorators Functions - [Docs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/file#parameter-decorators)
1. Data Types - [Docs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/data-types)
1. Parameters - [Docs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/parameters)
1. Deploying Bicep files - [Powershell](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/deploy-powershell) and [VSCode](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/deploy-vscode)

## Coding required
- Set the target scope to subscription
- Create the location parameter
- Create the unique name parameter
- Create a tags parameter

## Deploying the lab
1. Open a VS Code terminal (if not already open)
1. Change directory to the lab folder
    ```powershell
    cd .\Workshop-Workloads\VM\Labs\1-TheBasics\
    ```
1. Run the following command to deploy the lab
    ```powershell
    ./deploy.ps1 -verbose
    ```

## Expected Output
You will see the output of the Bicep file. The deployment will be successful with no errors.