@echo off

:MENU
cls
echo "1. Start Laragon Server"
echo "2. Start Node.js Server"
echo "3. Start Project"
echo "4. Start Android Emulator"
echo "5. Stop All Processes and Close Windows"
echo "6. Quit"

set /p choice="Choose an option (1-6): "

if "%choice%"=="1" goto START_LARAGON
if "%choice%"=="2" goto START_NODE_SERVER
if "%choice%"=="3" goto START_PROJECT
if "%choice%"=="4" goto START_ANDROID_EMULATOR
if "%choice%"=="5" goto STOP_ALL
if "%choice%"=="6" goto EXIT

:START_LARAGON
echo 'Starting Laragon Server...'
call :LoadingAnimation
start C:\laragon\laragon.exe
timeout /t 5 /nobreak >nul
goto MENU

:START_NODE_SERVER
echo 'Starting Node.js Server...'
call :LoadingAnimation
start node C:\laragon\www\QitKifWebSaves\qitkif-node\index.js
timeout /t 5 /nobreak >nul
goto MENU

:START_PROJECT
echo 'Starting the project...'
call :LoadingAnimation
start npm start -- --reset-cache
timeout /t 5 /nobreak >nul
goto MENU

:START_ANDROID_EMULATOR
echo 'Starting Android Emulator...'
call :LoadingAnimation
start npm run android
timeout /t 5 /nobreak >nul
goto MENU

:STOP_ALL
echo 'Stopping all processes and closing windows...'
call :LoadingAnimation
taskkill /im laragon.exe /f
taskkill /im node.exe /f
taskkill /im npm.exe /f
taskkill /fi "WINDOWTITLE eq Starting Laragon Server*" /f
taskkill /fi "WINDOWTITLE eq Starting Node.js Server*" /f
taskkill /fi "WINDOWTITLE eq Starting the project*" /f
taskkill /fi "WINDOWTITLE eq Starting Android Emulator*" /f
timeout /t 5 /nobreak >nul
goto MENU

:EXIT
echo 'Exiting the script'
goto :EOF

:LoadingAnimation
setlocal enabledelayedexpansion
set "loadingChars=|/-\"
set "loadingText=Loading..."
for /L %%i in (1,1,10) do (
    set /a "index=%%i %% 4"
    set "char=!loadingChars:~%index%,1!"
    set "loadingLine=!loadingText! !char!"
    echo !loadingLine!
    timeout /nobreak /t 1 >nul
    cls
)
endlocal
exit /b
