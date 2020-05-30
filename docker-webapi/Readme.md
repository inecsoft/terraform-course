***
# ___Create a .NET Core Web API project___

***

1. Create a folder for the project.

2. Open developer command prompt in the project folder and initialize the project:

```
dotnet new webapi --no-https
```

### ___Add Docker files to the project___

1. Open the project folder in VS Code.

2. Wait for the C# extension to prompt you to add required assets for build and debug, and choose Yes. You can also open the Command Palette (Ctrl+Shift+P) and use the .NET: Generate Assets for Build and Debug command.

3. Open Command Palette (Ctrl+Shift+P) and use Docker: Add Docker Files to Workspace... command:

4. Use ASP.NET Core when prompted for application platform.

5. Choose Windows or Linux when prompted to choose the operating system.

Windows is only applicable if your Docker installation is configured to use Windows containers.

6. Change the port for application endpoint to 5000.

7. Dockerfile and .dockerignore files are added to the workspace.

The extension will also create a set of VS Code tasks for building and running the container (in both debug- and release configuration, four tasks in total), and a debugging configuration for launching the container in debug mode.


docker run --rm --dns-search google.com busybox nslookup google.com
docker run --rm --dns 8.8.8.8 busybox nslookup google.com
docker run --rm  busybox nslookup google.com
sudo vim /etc/docker/daemon.json


***