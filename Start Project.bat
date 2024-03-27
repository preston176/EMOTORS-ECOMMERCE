@echo off

rem Navigate to the backend directory
cd /d C:\Users\User\Desktop\projects\UOE\EMOTORS-ECOMMERCE\backend

rem Run npm start in the backend directory
start npm start

rem Navigate to the frontend directory
cd /d C:\Users\User\Desktop\projects\UOE\EMOTORS-ECOMMERCE\frontend

rem Run npm start in the frontend directory
start npm start

rem Wait for servers to start (adjust this value as needed)
timeout /t 3 /nobreak > nul

rem Open Chrome with the localhost URL
start chrome http://localhost:5173
