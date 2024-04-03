@echo off

rem Navigate to the backend directory
cd backend

rem Run npm start in the backend directory
start npm start

rem Navigate to the frontend directory
cd ..
rem Navigate to the frontend directory
cd frontend

rem Run npm start in the frontend directory
start npm start

rem Wait for servers to start (adjust this value as needed)
timeout /t 3 /nobreak > nul

rem Open Chrome with the localhost URL
start chrome http://localhost:5173
