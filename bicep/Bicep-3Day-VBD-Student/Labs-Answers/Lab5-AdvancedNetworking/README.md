# Lab 5 - Advanced Networking concepts

## Learning Objectives
1. Adding a Route Table - [Docs](https://learn.microsoft.com/en-gb/azure/templates/microsoft.network/routetables?pivots=deployment-language-bicep)
1. Using the "existing" keyword to access existing resources - [Docs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/existing-resource)
1. Peering between virtual networks - [Docs](https://learn.microsoft.com/en-gb/azure/templates/microsoft.network/virtualnetworks/virtualnetworkpeerings?pivots=deployment-language-bicep)
1. Scoping an in-resource group module - [Docs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/modules#set-module-scope)

## Coding required
1. In deploy.bicep
    1. Add an "existing" resource called "existingFirewall" which will use the firewallName parameter and scope to the firewallRG
    1. Get the "firewallIP" as a variable from the existingFirewall resource
        - note: The ip address of the firewall private IP address is buried in ipConfigurations.  A firewall can have more than one private IP address.  You will need to use the FIRST (i.e. 0) IP address in the ipConfigurations array.
1. In networking.bicep
    1. Add a new route table resource with a route to
        - addressPrefix: '0.0.0.0/0'
        - nextHopIpAddress: firewallIP
        - nextHopType: 'VirtualAppliance'
    1. Associate the route table with the subnet in the virtualNetwork using the "routeTable" property
    1. Add an "existing" resource called hubVnet which will use the hubVnetName parameter and scope to the hubRG
    1. Take a look at and understand the peering.bicep module
    1. Create an outbound Peering from the Virtual Network to the Hub Vnet using the peering module and parameters:
        - connectFromVnetName
        - connectToVnetID
    1. Create an inbound Peering from the Hub Vnet to the Virtual Network using the peering module and parameters:
        - connectFromVnetName
        - connectToVnetID
        - NOTE: This will need to be scoped to the hubRG

## Deploying the lab
1. Open a VS Code terminal (if not already open)
1. Change directory to the lab folder
    ```powershell
    cd .\Workshop-Workloads\VM\Labs\Lab5-AdvancedNetworking\
    ```
1. Run the following command to deploy the lab
    ```powershell
    ./deploy.ps1 -verbose
    ```

## Expected Output
1. You will see the output of the Bicep file. The deployment will be successful with no errors.
1. Two new Resource Groups will be created in Azure (if not already present)
1. You will find an existing
    1. Log Analytics Workspace in the Azure Portal in the Infra resource group
    1. network security group with rule that permits RDP traffic
1. You will update the virtual network such that the subnet will have a route table assoicated with it
1. You will create:
    1. A route table
    1. Peering both TO and FROM the existing HUB virtual network, from your virtual network
1. All the resources will be linked to Diagnostics
1. The module will return a set of outputs.

