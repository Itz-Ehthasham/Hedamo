@echo off
echo Starting Docker Desktop...
start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"

echo Waiting for Docker to start...
timeout /t 30 /nobreak

echo Checking Docker status...
docker ps

echo.
echo If Docker is running, you can now use:
echo docker-compose up --build

pause