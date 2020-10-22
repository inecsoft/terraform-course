***  

<div align="center">
  <h1>Terraform for Azure</h1>
</div>

***

* #### __Install Azure CLI with yum__  
__1. Import the Microsoft repository key.__
    
``` bash
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
```  
__2. Create local azure-cli repository information.__  
``` bash
sudo sh -c 'echo -e "[azure-cli]
name=Azure CLI
baseurl=https://packages.microsoft.com/yumrepos/azure-cli
enabled=1
gpgcheck=1
gpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/azure-cli.repo'
```  
__3. Install with the yum install command.__
  
``` bash
sudo yum install azure-cli -y  
```

* #### __Login to get the credentials.__
``` bash
az login
az account show
```  
_*Note:*_ After login set your project it works fine.  

* ### __Set up Terraform access to Azure__
  1. __Get a list of subscription ID and tenant ID values:__ 
```
az account list
az account list --query "[].{name:name, subscriptionId:id, tenantId:tenantId}"
SUBSCRIPTION_ID=`az account list | grep id | awk -F '"' '{print $4}'`
```
  2. __To use a selected subscription, set the subscription for this session with__  
```
az account set --subscription="${SUBSCRIPTION_ID}"
```
  3. __Create a service principal for use with Terraform__
```
az ad sp create-for-rbac --role="Contributor" --scopes="/subscriptions/${SUBSCRIPTION_ID}"
```

***
# __Kubernetes tutorial__

***

```
version=$(az aks get-versions -l "West Europe" --query 'orchestrators[-1].orchestratorVersion' -o tsv)
```
```
az group create --name AKSRG --location "West Europe"
```
```
az aks create --resource-group AKSRG --name aksmohamedradwan --enable-addons monitoring --kubernetes-version $version --generate-ssh-keys --location "West Europe"
```
```
az acr create --resource-group AKSRG --name acrmohamedradwan --sku Standard --location "West Europe"
```
```
CLIENT_ID=$(az aks show --resource-group AKSRG --name aksmohamedradwan --query "servicePrincipalProfile.clientId" --output tsv)
```
```
ACR_ID=$(az acr show --name acrmohamedradwan --resource-group AKSRG --query "id" --output tsv)
```
```
az role assignment create --assignee $CLIENT_ID --role acrpull --scope $ACR_ID
```
```
az sql server create -l "West Europe" -g AKSRG -n sqlmohamedradwan -u sqladmin -p P2ssw0rd1234
```
```
az sql db create -g AKSRG -s sqlmohamedradwan -n mhcdb --service-objective S0
```
```
az aks get-credentials --resource-group AKSRG --name aksmohamedradwan
```
```
kubectl get pods
```
```
kubectl get service mhc-front --watch
```
```
az aks install-cli
```
```
set PATH=%PATH%;C:\Users\mohamed.radwan\.azure-kubectl (for the current session) or copy it to Env vars
```
```
kubectl create clusterrolebinding kubernetes-dashboard -n kube-system --clusterrole=cluster-admin --serviceaccount=kube-system:kubernetes-dashboard
```
```
kubectl delete clusterrolebinding kubernetes-dashboard -n kube-system
```
```
az aks browse --resource-group AKSRG --name aksmohamedradwan
```
```
az aks scale --resource-group AKSRG --name aksmohamedradwan --node-count 3 
```
```
az aks upgrade --resource-group AKSRG --name aksmohamedradwan --kubernetes-version 1.14.0
```

***
