param env string = 'dev'
var storagePrefix= 'stor${resourceGroup().id}${uniqueString(resourceGroup().id)}'
​​​​​​​
resource storageaccount 'Microsoft.Storage/storageAccounts@2021-02-01' = {
 name: '${storagePrefix}${env}'
 location: 'westus'
 kind: 'StorageV2'
 sku: {
 name: 'Premium_LRS'
 }
}
