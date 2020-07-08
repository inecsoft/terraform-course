FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /src
COPY ["MvcMovie/MvcMovie.csproj", "MvcMovie/"]
RUN dotnet restore "MvcMovie/MvcMovie.csproj"
COPY . .
WORKDIR "/src/MvcMovie"
RUN dotnet build "MvcMovie.csproj" -c Release -o /app/build
RUN dotnet tool install --global dotnet-ef
ENV PATH=${PATH}:/root/.dotnet/tools
#RUN dotnet ef migrations add InitialCreate
#RUN dotnet ef database update
RUN dotnet ef migrations add docker
RUN until dotnet ef database update docker; do >&2 echo "Migrations executing"; sleep 1; done
RUN echo "DB Migrations complete, starting app."


FROM build AS publish
RUN dotnet publish "MvcMovie.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MvcMovie.dll"]
