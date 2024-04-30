# Lab 2 - Creating Resource Groups

## Learning Objectives
1. String functions - [Docs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/bicep-functions-string)
1. Resource Anatomy - [Docs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/resource-declaration?tabs=azure-powershell)
1. Resource Groups - [Docs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/manage-resource-groups-portal)


## Coding required
1. Modify the "rgInfra" parameter default to make it all upper case
1. Create a second parameter called "rgVM" which will be used as the naem of the RG to store the Virtual Machines
    - Use the same format as the rgInfra parameter
    - Use the "workloadVM" parameter instead of worloadInfra
1. Create the VM resource group by creating the resource for it.

## Deploying the lab
1. Open a VS Code terminal (if not already open)
1. Change directory to the lab folder
    ```powershell
    cd .\Workshop-Workloads\VM\Labs\Lab2-CreatingResourceGroups\
    ```
1. Run the following command to deploy the lab
    ```powershell
    ./deploy.ps1 -verbose
    ```

## Expected Output
1. You will see the output of the Bicep file. The deployment will be successful with no errors.
1. Two new Resource Groups will be created in Azure
