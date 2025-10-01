@echo off
echo Starting Hedamo locally...

echo.
echo 1. Starting AI Service (Port 8000)...
start "AI Service" cmd /k "cd ai-service && python app/main.py"

echo.
echo 2. Waiting 5 seconds for AI service to start...
timeout /t 5 /nobreak

echo.
echo 3. Starting Backend (Port 3001)...
start "Backend" cmd /k "cd backend && npm run dev"

echo.
echo 4. Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak

echo.
echo 5. Starting Frontend (Port 5173)...
start "Frontend" cmd /k "cd frontend_hedamo && npm run dev"

echo.
echo ========================================
echo Hedamo is starting up locally!
echo ========================================
echo AI Service:  http://localhost:8000
echo Backend:     http://localhost:3001
echo Frontend:    http://localhost:5173
echo ========================================
echo.
echo Press any key to close this window...
pause