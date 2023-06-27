param location string = resourceGroup().location
param uniqstr string = uniqueString(resourceGroup().id)
param webAppName string = 'cawebapp${uniqstr}'

var ServicePlanName = 'ca-service-plan'

// Resources section
resource appServicePlan 'Microsoft.Web/serverfarms@2020-12-01' = {
  name: ServicePlanName
  location: location
  sku: {
    name: 'S1'
    capacity: 1
  }
}

resource appServiceApp 'Microsoft.Web/sites@2020-06-01' = {
  name: webAppName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    httpsOnly: true
  }
}

// resourceGroupName=$(az group list --query "[].{name:name}" --output tsv)
// deploymentName="cawebappdeployment"
// templateFile="webApp.bicep"

// az deployment group create --resource-group $resourceGroupName --name $deploymentName --template-file $templateFile


// webAppName=$(az webapp list --query "[].{name:name}" --output tsv)
// az webapp show \
// --name $webAppName \
// --resource-group $resourceGroupName \
// --query "{Name:name, Location:location, ResourceGroup:resourceGroup}" \
// --output table


