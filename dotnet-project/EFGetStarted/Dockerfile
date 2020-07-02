FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
WORKDIR /app
COPY ./entrypoint.sh .
EXPOSE 80


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
RUN chmod +x ./entrypoint.sh
CMD /bin/bash ./entrypoint.sh
ENTRYPOINT ["dotnet", "EFGetStarted.dll"]
