
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

@description('The name of the keyvault that contains the local admin password')
param keyvaultName string

@description('The resource group that contains the keyvault')
param keyvaultRG string

@description('The number of hosts to deploy')
param numberOfHostsToDeploy int = 1

@description('The local admin username')
param localAdminUserName string

@description('The subnet ID to deploy the VMs to')
param subnetID string

@description('The default VM size to deploy')
param defaultVMSize string = 'Standard_D2s_v3'

@description('The base name of the VM resource (as azure resource)')
param vmBaseResourceName string

@description('The base name of the VM (as inside the VM)')
param vmBaseName string

@description('A default VM image object type to use for the VMs.  This is a standard Windows Server 2022 image.  You can change this to suit your needs.  Note that the version is set to "latest" so that the latest image is always used.')
var vmImageObject = {
  publisher: 'MicrosoftWindowsServer'
  offer: 'WindowsServer'
  sku: '2022-datacenter-azure-edition-hotpatch-smalldisk'
  version: 'latest'
}

//Pull in your keyvault created earlier as it contains the local admin password
//Note we are deploying in a different RG at the moment, so we need to reference the RG where the vault was actually created
resource KeyVault 'Microsoft.KeyVault/vaults@2023-07-01' existing = {
  name: keyvaultName
  scope: resourceGroup(keyvaultRG)
}

//Deploy the virtual machines.  this applies a FOR loop to build out <n> hosts as defined by numberOfHostsToDeploy
//Note that each host is built using the singlevm module.  This significently reduces complexity otherwise you would need to wrap a
//For loop around each of the resources being deployed.  This way you can do it just once:
//Ref: https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/loops 
module Hosts 'singlevm.bicep' = [for i in range(0, numberOfHostsToDeploy): {
  name: 'BuildHost${i}'
  params: {
    location: location
    localEnv: localEnv
    tags: tags
    vmBaseResourceName: vmBaseResourceName
    vmBaseName: vmBaseName
    vmNumber: i
    adminUserName: localAdminUserName
    adminPassword: KeyVault.getSecret(localAdminUserName)
    subnetID: subnetID
    vmSize: defaultVMSize
    vmImageObject: vmImageObject
  }
}]

//Directionary object for the virtual machines
var listOfHosts = {
  myhost1: {
    vmSize: 'Standard_B1s'
    resourceName: 'vm-myhost1-'
  }
  myhost2: {
    vmSize: 'Standard_B2s'
    resourceName: 'vm-myhost2-'
  }
  myhost3: {
    vmSize: 'Standard_B4ms'
    resourceName: 'vm-myhost3-'
  }
}
module HostsList 'singlevm.bicep' = [for item in items(listOfHosts): {
  name: 'BuildHost${item.key}'
  params: {
    location: location
    localEnv: localEnv
    tags: tags
    vmBaseResourceName: item.value.ResourceName
    vmBaseName: item.key
    vmNumber: 1
    adminUserName: localAdminUserName
    adminPassword: KeyVault.getSecret(localAdminUserName)
    subnetID: subnetID
    vmSize: item.value.vmSize
    vmImageObject: vmImageObject
  }
}]
