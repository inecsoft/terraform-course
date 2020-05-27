***
# __Tutorial .Net core app__

***  
###  __Create Core App__
dotnet new console -o app -n app  
cd app  

### __Edit the app__
vim Program.cs

### __Run the App__
dotnet run

### __Publish .Net Core app__
dotnet publish -c Release

### __Build and image__
vim Dockerfile

```
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1

#copy the specified folder on your computer to a folder in the container
COPY app/bin/Release/netcoreapp3.0/publish/ app/

#changes the current directory inside of the container to app
WORKDIR /app

#configure the container to run as an executable
ENTRYPOINT ["dotnet", "app.dll"]
```
docker build -t netcoreimage -f Dockerfile .

### __Run image__

docker run -it --name netcoreapp netcoreimage 

***

