FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 5000
EXPOSE 5001

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /src
COPY ["EFGetStarted/EFGetStarted.csproj", "EFGetStarted/"]
RUN dotnet restore "EFGetStarted/EFGetStarted.csproj"
COPY . .
WORKDIR "/src/EFGetStarted"
RUN dotnet build "EFGetStarted.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "EFGetStarted.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "EFGetStarted.dll"]
