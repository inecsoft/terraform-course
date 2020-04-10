***  

<div align="center">
  <h1>Terraform for Azure</h1>
</div>

***

* #### __Install Azure CLI with yum__  
 
  1._Import the Microsoft repository key._
  
``` bash
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
```  
  2. _Create local azure-cli repository information._  
``` bash
sudo sh -c 'echo -e "[azure-cli]
name=Azure CLI
baseurl=https://packages.microsoft.com/yumrepos/azure-cli
enabled=1
gpgcheck=1
gpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/azure-cli.repo'
```  
  3. _Install with the yum install command._  
  
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

   1.__Get a list of subscription ID and tenant ID values:__ 
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