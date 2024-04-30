/*
This module is used to build a single windows virtual machine that has a local admin login only
*/

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

//Tags to assign to the resources
@description ('Optional: The tags that will be associated with each deployed resource')
param tags object = {
  environment: localEnv
  workloadInfra: 'BTC'
}

//General Settings
@description('Required: The base name for the VM resource - this is the resource displayed in Azure')
param vmBaseResourceName string

@description('Required: The base name for the VM - this is the name of the VM itself inside the VM')
param vmBaseName string

@description('Optional: The number of VMs to deploy.  Default is 1')
param vmNumber int = 1


//Host Settings
@description('Required: The local admin user name for the host')
param adminUserName string

@description('Required: The local admin password for the host (secure string)')
@secure()
param adminPassword string

@description('Optional: The size of the VM to deploy.  Default is Standard_D2s_v3')
param vmSize string = 'Standard_D2s_v3'

@description('Required: The ID of the subnet to deploy the VMs to')
param subnetID string

//The version of windows to deploy
//This is set to a windows server machine by default
//Ref: https://learn.microsoft.com/en-us/azure/virtual-machines/windows/cli-ps-findimage
//To find this one: Get-AzVMImageSku -Location $locName -PublisherName "MicrosoftWindowsServer" -Offer "WindowsServer" | Select Skus
@description('optional: The Image object that contains either a gallery image (as default) or an image reference')
param vmImageObject object = {
  publisher: 'MicrosoftWindowsServer'
  offer: 'WindowsServer'
  sku: '2022-datacenter-azure-edition-hotpatch-smalldisk'
  version: 'latest'
}

//Other common example
// Windows 11 AVD multisession image with Office 365 installed
// param vmImageObject object = {
//   publisher: 'microsoftwindowsdesktop'
//   offer: 'office-365'
//   sku: 'win11-23h2-avd-m365'
//   version: 'latest'
// }

@description('Optional: The type of storage to use.  By default this is a standard SSD, for shared machines Premium/Ephemeral is usually better')
param storageAccountType string = 'StandardSSD_LRS'

//VARIABLES
//the base base name for each VM created - append a number if one is present otherwise just use the base name
@description('The name of the VM as displayed inside the VM')
var vmName = '${vmBaseName}${vmNumber}'

@description('The name of the VM resource in Azure')
var vmResourceName = '${vmBaseResourceName}${vmNumber}'

//the base Network Interface name for each VM created
@description('The name of the network interface for the VM')
var vmNicName = toLower('nic-${vmResourceName}')

//RESOURCES
//Create Network interfaces for each of the VMs being deployed
//Ref: https://learn.microsoft.com/en-gb/azure/templates/microsoft.network/networkinterfaces?tabs=bicep&pivots=deployment-language-bicep 
resource vmNic 'Microsoft.Network/networkInterfaces@2023-09-01' = {
  name: vmNicName
  location: location
  tags: tags
  properties: {
    ipConfigurations: [
      {
        name: 'ipconfig1'
        properties: {
          privateIPAllocationMethod: 'Dynamic'
          privateIPAddressVersion: 'IPv4'
          subnet: {
            id: subnetID
          }
        }
      }
    ]
  }
}

//Deploy The virtual machine itself
//ref: https://learn.microsoft.com/en-gb/azure/templates/microsoft.compute/virtualmachines?tabs=bicep&pivots=deployment-language-bicep 
resource vm 'Microsoft.Compute/virtualMachines@2023-09-01' = {
  name: vmResourceName
  location: location
  tags: tags
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    //The size of the VM to deploy
    hardwareProfile: {
      vmSize: vmSize
    }

    storageProfile: {
      //the type of the OS disk to set up and how it will be populated
      osDisk: {
        createOption: 'FromImage'
        caching: 'ReadWrite'
        managedDisk: {
          storageAccountType: storageAccountType
        }
      }
      //The OS image to deploy for this VM
      //This comes from the variable further up but could also be a custom image
      imageReference: vmImageObject
    }

    osProfile: {
      //Set up the host VM windows defaults e.g. local admin, name, patching etc.
      computerName: vmName
      adminUsername: adminUserName
      adminPassword: adminPassword
      windowsConfiguration: {
        enableAutomaticUpdates: true
        provisionVMAgent: true
        timeZone: 'GMT Standard Time'
        patchSettings: {
          assessmentMode: 'ImageDefault'
          enableHotpatching: false
          patchMode: 'AutomaticByPlatform'
        }
      }
    }

    //The network interface to connect the VM to
    networkProfile: {
      networkInterfaces: [
        {
          id: vmNic.id
        }
      ]
    }

    //Enable the boot diagnostics
    diagnosticsProfile: {
      bootDiagnostics: {
        enabled: true
      }
    }
  }
}

//VM Extensions - these are used to carry out actions and install components onto the VM
//Bicep naturally tries and deploy these in parallel which, depending on what the extension is doing can cause conflicts
//As a general rule of thumb it is usually a good idea to deploy extensions in a serial fashion using "dependsOn" to ensure they are deployed in the correct order
//Ref: https://learn.microsoft.com/en-gb/azure/templates/microsoft.compute/virtualmachines/extensions?tabs=bicep&pivots=deployment-language-bicep

//Anti Malware Extension
resource VMAntiMalware 'Microsoft.Compute/virtualMachines/extensions@2022-11-01' = {
  name: 'AntiMalware'
  parent: vm
  location: location
  tags: tags
  properties: {
    publisher: 'Microsoft.Azure.Security'
    type: 'IaaSAntimalware'
    typeHandlerVersion: '1.3'
    autoUpgradeMinorVersion: true
    enableAutomaticUpgrade: false
    settings: {
      AntimalwareEnabled: 'true'
      RealtimeProtectionEnabled: 'true'
      ScheduledScanSettings: {
        isEnabled: 'true'
        scanType: 'Quick'
        day: '7'
        time: '120'
      } 
      // Exclusions: {
      //   extensions: ''
      //   paths: ''
      //   processes: ''
      // }
    }
  }
}

//Monitoring Extension which adds the monitoring agent to the VM
resource VMMonitoring 'Microsoft.Compute/virtualMachines/extensions@2022-11-01' = {
  name: 'AzureMonitorWindowsAgent'
  parent: vm
  location: location
  tags: tags
  properties: {
    publisher: 'Microsoft.Azure.Monitor'
    type: 'AzureMonitorWindowsAgent'
    typeHandlerVersion: '1.0'
    autoUpgradeMinorVersion: true
    enableAutomaticUpgrade: true
  }
dependsOn: [
  VMAntiMalware
  ]
}

//Custom Script Extension (example only)
// resource vmScript 'Microsoft.Compute/virtualMachines/extensions@2022-11-01' = [for i in range(0, numberOfHostsToDeploy): {
//   name: '${vmName}_${i}/CustomScriptExtension'
//   location: location
//   tags: tags
//   properties: {
//     publisher: 'Microsoft.Compute'
//     type: 'CustomScriptExtension'
//     typeHandlerVersion: '1.10'
//     autoUpgradeMinorVersion: true
//     enableAutomaticUpgrade: false
//     settings: {
//       //File URI's and parameters here
//     protectedSettings: {
//       //Any protected settings for the custom script here
//     }
//   }
// }]
