***

### __Add NuGet packages__
```
dotnet tool install --global dotnet-ef
dotnet tool install --global dotnet-aspnet-codegenerator
dotnet add package Microsoft.EntityFrameworkCore.SQLite
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Npgsql --version 4.1.3.1
```
### __Create database__
```
dotnet ef migrations add InitialCreate
dotnet ef database update
```
***
sqlite3 MvcMovie.db .dump > mvcmoviesqlitedump.sql

docker exec -it database psql -U postgres -f /var/lib/postgresql/data/mvcmoviesqlitedump.sql
***

export ASPNETCORE_ENVIRONMENT=Production
dotnet run --environment "Staging"
docker inspect --format '{{ .NetworkSettings.IPAddress }}' database

***
### __How to generate the ssl certificate__

dotnet dev-certs https -ep ${HOME}/.aspnet/https/aspnetapp.pfx -p { password here }
dotnet dev-certs https --trust
***