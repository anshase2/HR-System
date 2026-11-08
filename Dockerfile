
# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

# Copy project files
COPY ["HR-System/HR.API.csproj", "HR-System/"]
COPY ["HR.BLL/HR.BLL.csproj", "HR.BLL/"]
COPY ["HR.DAL/HR.DAL.csproj", "HR.DAL/"]

# Restore dependencies
RUN dotnet restore "HR-System/HR.API.csproj"

# Copy backend source code
COPY HR-System/ HR-System/
COPY HR.BLL/ HR.BLL/
COPY HR.DAL/ HR.DAL/

# Publish API
WORKDIR /src/HR-System
RUN dotnet publish "HR.API.csproj" -c Release -o /app/publish /p:UseAppHost=false


# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

WORKDIR /app

COPY --from=build --chown=app:app /app/publish .
USER app


EXPOSE 8080

ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "HR.API.dll"]
