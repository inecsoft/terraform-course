# Lab 8 - Creating Multiple Virtual Machines at the same time

## Learning Objectives
1. Understanding Loops - [Docs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/loops)
1. Using a Loop in a module call

## Coding required
1. In deploy.bicep:
    1. Add a module call to the "multiplevms.bicep" called "vms"
    1. Use your knowledge to populate the call with the right parameters
    1. Deploy 2 virtual machines
1. In multiplevms.bicep
    1. Update the module call "Hosts" which calls the bicep file singlevm.bicep to deploy the two hosts
1. Additional (if you have time):
    1. Create a "dictionary" object to hold a list of 3 VMs with their VMName, VMResourceName and size
        - You can use the following VM sizes "Standard_B1s", "Standard_B2s", "Standard_B4ms" for testing
    1. Update the module call "Hosts" to iterativly use the details if you dictionary object to create the 3 virtual machines.

## Deploying the lab
1. Open a VS Code terminal (if not already open)
1. Change directory to the lab folder
    ```powershell
    cd .\Workshop-Workloads\VM\Labs\Lab8-MultipleVMs\
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
1. You will create multiple virtual machines each with:
    1. A network interface
    1. A virtual machine on your virtual network using the network interface
1. All the resources will be linked to Diagnostics
1. The module will return a set of outputs.

