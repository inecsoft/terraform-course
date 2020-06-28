***

### __Create the app__
```
dotnet new webapp -o ContosoUniversity
cd ContosoUniversity

OR

dotnet new webapp -o ContosoUniversity --no-https
cd ContosoUniversity

dotnet dev-certs https --trust
```

### __Test it__
```
dotnet run 
curl localhost:5000
curl -kv https://localhost:5001
curl -gv -6 "https://[::1]:5001/"
```

### __Scaffold Student pages__

```
dotnet add package Microsoft.EntityFrameworkCore.SQLite
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.Extensions.Logging.Debug
```

### __Install scafold tool__
```
dotnet tool install --global dotnet-aspnet-codegenerator
```
### __Run the following command to scaffold Student pages.__

```
dotnet aspnet-codegenerator razorpage -m Student -dc ContosoUniversity.Data.SchoolContext -udl -outDir Pages/Students --referenceScriptLibraries
```

  "ConnectionStrings": {
   "SchoolContext": "Server=(localdb)\\mssqllocaldb;Database=SchoolContext-cf3b5f09-1274-4e98-8af7-d1ce0add52c9;Trusted_Connection=True;MultipleActiveResultSets=true"
  },


docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' contosouniversity

### __Port forwaring__
```
ssh -i github -R localhost:5001:192.168.1.147:5001 devop@192.168.1.8

NOTE:
_Restart the app if the db is not inicialised_

```
docker restart contosouniversity

```

***