# Lab 4 - Basic Networking

## Learning Objectives
1. Conditional Operator function "if" - [Docs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/conditional-resource-deployment)
1. Conditional Expression "if" - [Docs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/conditional-resource-deployment#runtime-functions)
1. Parent and Child Resources - [Docs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/child-resource-name-type#outside-parent-resource)
1. Nested resources - [Docs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/child-resource-name-type#within-parent-resource)
1. Arrays inside resources - [Docs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/data-types#arrays)
1. Creating a network security group (NSG) - [Docs](https://learn.microsoft.com/en-gb/azure/templates/microsoft.network/networksecuritygroups?pivots=deployment-language-bicep)
1. Linking the Log Analytics Diagnostics to the NSG using Scope - [Docs]()
1. Creating an NSG Rule - [Docs](https://learn.microsoft.com/en-gb/azure/templates/microsoft.network/networksecuritygroups/securityrules?pivots=deployment-language-bicep)
1. Creating a Virtual Network with Subnet - [Docs](https://learn.microsoft.com/en-gb/azure/templates/microsoft.network/virtualnetworks?pivots=deployment-language-bicep)


## Coding required
1. In the main deploy.bicep 
    1. Add the networking module to the main.bicep file
1. In the Modules/networking.bicep
    1. Create a simple network security group
    1. Link the Log Analytics Diagnostics to the NSG using Scope (diagnostics is a child of NSG)
    1. Create an NSG Rule called "securityRule" linked to the NSG itself with the following properties:
        - name: 'permit-rdp-from-vnet'
        - access: 'Allow'
        - direction: 'Inbound'
        - priority: 1000
        - protocol: 'Tcp'
        - sourceAddressPrefix: 'VirtualNetwork'
        - sourcePortRange: '*'
        - destinationAddressPrefix: '*'
        - destinationPortRange: '3389'
    1. Fill in the missing details of the Virtual Network resource
    1. Link the Vnet to the Diagnostics
    1. Create outputs for the following:
        - vnetName
        - vnetID
        - snetName
        - snetID
        - nsgName
        - nsgID


## Deploying the lab
1. Open a VS Code terminal (if not already open)
1. Change directory to the lab folder
    ```powershell
    cd .\Workshop-Workloads\VM\Labs\Lab4-Networking\
    ```
1. Run the following command to deploy the lab
    ```powershell
    ./deploy.ps1 -verbose
    ```

## Expected Output
1. You will see the output of the Bicep file. The deployment will be successful with no errors.
1. Two new Resource Groups will be created in Azure (if not already present)
1. You will find a new Log Analytics Workspace in the Azure Portal in the Infra resource group
1. You will find a network security group with rule that permits RDP traffic
1. You will find a virtual network with a subnet
1. All the resources will be linked to Diagnostics
1. The module will return a set of outputs.
