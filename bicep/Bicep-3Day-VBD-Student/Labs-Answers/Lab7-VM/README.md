# Lab 7 - Creating a Virtual Machine

## Learning Objectives
1. Getting a secret from an existing vault - [Docs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/bicep-functions-parameters-file#getsecret)
1. VM Image Objects - [Docs](https://learn.microsoft.com/en-us/azure/virtual-machines/windows/cli-ps-findimage)
1. Resource deployment dependencies - [Docs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/resource-dependencies)
1. Creating an network interface - [Docs](https://learn.microsoft.com/en-gb/azure/templates/microsoft.network/networkinterfaces?pivots=deployment-language-bicep)
1. Creating a virtual machine - [Docs](https://learn.microsoft.com/en-gb/azure/templates/microsoft.compute/virtualmachines?pivots=deployment-language-bicep)
1. Adding Virtual Machine extensions - [Docs](https://learn.microsoft.com/en-gb/azure/templates/microsoft.compute/virtualmachines/extensions?pivots=deployment-language-bicep)
1. Discover which extensions are available - [Docs](https://learn.microsoft.com/en-us/azure/virtual-machines/extensions/features-windows)

## Coding required
1. In the main deploy.bicep
    1. Following the keyvault module call, create an "existing" resource that will pull in the Keyvault you just created
    1. Inside the singlevm.bicep module call, complete the "adminPassword" property using the "getSecret" function

## Deploying the lab
**NOTE**: Change to to the powershell command from Lab 7 Onwards.  Prevents the keyvault from being updated every time you run the code.

1. Open a VS Code terminal (if not already open)
1. Change directory to the lab folder
    ```powershell
    cd .\Workshop-Workloads\VM\Labs\Lab7-VM\
    ```
1. Run the following command to deploy the lab
    ```powershell
    ./deploy.ps1 -verbose -updateVault $false
    ```

## Expected Output
1. You will see the output of the Bicep file. The deployment will be successful with no errors.
1. Two new Resource Groups will be created in Azure (if not already present)
1. You will find an existing
    1. Log Analytics Workspace in the Azure Portal in the Infra resource group
    1. network security group with rule that permits RDP traffic
    1. virtual network such that the subnet will have a route table assoicated with it
    1. A route table
    1. Peering both TO and FROM the existing HUB virtual network, from your virtual network
    1. Keyvault with local admin secret
1. You will create:
    1. A network interface
    1. A virtual machine on your virtual network using the network interface
1. All the resources will be linked to Diagnostics
1. The module will return a set of outputs.
