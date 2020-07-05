FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /src
COPY ["pingapp/pingapp.csproj", "pingapp/"]
RUN dotnet restore "pingapp/pingapp.csproj"
COPY . .
WORKDIR "/src/pingapp"
RUN dotnet build "pingapp.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "pingapp.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "pingapp.dll"]
