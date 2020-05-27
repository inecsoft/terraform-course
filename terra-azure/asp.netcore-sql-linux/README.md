***
# __How to build and ASP.Net Core app + SQL + linux__

***

### __Guide__

   * Create local .NET Core app  
   * Use Azure Cloud Shell  
   * Create production SQL Database  
   * Deploy app to Azure  
   * Update locally and redeploy  
   * Stream diagnostic logs  
   * Manage your Azure app  
   * Clean up resources  

***

### __Create an App__

```
dotnet new web
```

### __Clone sample app__

```
git clone https://github.com/azure-samples/dotnetcore-sqldb-tutorial
cd dotnetcore-sqldb-tutorial
```

### __Run the app__

```
dotnet tool install -g dotnet-ef  
dotnet ef database update  
dotnet run  
curl http://localhost:5000
```

***

_REF:_ https://docs.microsoft.com/en-us/azure/app-service/containers/tutorial-dotnetcore-sqldb-app

***
