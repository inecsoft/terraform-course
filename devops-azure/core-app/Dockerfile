FROM mcr.microsoft.com/dotnet/core/aspnet:3.1

#copy the specified folder on your computer to a folder in the container
COPY app/bin/Release/netcoreapp3.0/publish/ app/

#changes the current directory inside of the container to app
WORKDIR /app

#configure the container to run as an executable
ENTRYPOINT ["dotnet", "app.dll"]
