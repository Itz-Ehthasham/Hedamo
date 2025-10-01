@echo off
echo Docker Troubleshooting Script
echo =============================

echo 1. Stopping any running Docker processes...
taskkill /f /im "Docker Desktop.exe" 2>nul
timeout /t 5 /nobreak

echo 2. Starting Docker Desktop...
start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"

echo 3. Waiting for Docker to initialize (60 seconds)...
timeout /t 60 /nobreak

echo 4. Testing Docker connection...
docker --version
docker ps

echo 5. If Docker is working, clean and rebuild:
echo docker system prune -f
echo docker-compose up --build --no-cache

pause