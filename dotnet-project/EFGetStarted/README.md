***

### __Create project__
```
dotnet new console -o EFGetStarted
cd EFGetStarted
```

### __Create Entity Framework Core__
```
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Analyzers
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL --version 3.1.4
```

### __Create the database__
```
dotnet tool install --global dotnet-ef
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### __Run the app__
```
dotnet run
```

***
```
docker exec -it  database psql -U postgres
```

***