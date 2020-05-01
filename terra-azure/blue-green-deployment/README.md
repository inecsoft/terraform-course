***
# __Deployment slots with Terraform and blue green deployment__

***
### 1- __Deploy stage__
```
cd deploy 
terraform init
terraform plan
terraform apply -auto-approve
```

### 2- __Repo config__
      1- On the main menu of the Azure portal, select Resource groups.
      2- Select slotDemoResourceGroup.
      3- Select slotAppService.
      4- Select Deployment options.

 <div align="center">
    <img src="images/deployment-options.png" width="500" />
 </div>

      5- On the Deployment option tab, select Choose Source, and then select GitHub.

 <div align="center">
    <img src="images/deployment-options.png" width="500" />
</div>
     6- After Azure makes the connection and displays all the options, select Authorization.

     7- On the Authorization tab, select Authorize, and supply the credentials that Azure needs to access your GitHub account.

     8- After Azure validates your GitHub credentials, a message appears and says that the authorization process has finished. Select OK to close the Authorization tab.

     9- Select Choose your organization and select your organization.

     10- Select Choose project.

     11- On the Choose project tab, select the awesome-terraform project.

 <div align="center">
    <img src="images/choose-project.png" width="700" />
</div>

     12- Select Choose branch.

     13- On the Choose branch tab, select master.

 <div align="center">
    <img src="images/choose-branch-master.png" width="700" />
</div>
  
     14- On the Deployment option tab, select OK.

At this point, you've deployed the production slot. To deploy the staging slot, do the previous steps with the following modifications:

   * In step 3, select the slotAppServiceSlotOne resource.

   * In step 13, select the working branch instead of the master branch.

 <div align="center">
    <img src="images/choose-branch-working.png" width="700" />
</div>

### 3- __Swap the two deployment slots__

```
cd ../swap 
terraform init
terraform plan
terraform apply -auto-approve
```

***

### _REF:_ https://docs.microsoft.com/en-us/azure/developer/terraform/provision-infrastructure-using-azure-deployment-slots

***