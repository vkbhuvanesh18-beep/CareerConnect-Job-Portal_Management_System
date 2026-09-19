@echo off
title CareerConnect Job Portal
cd /d "%~dp0"
echo.
echo Starting CareerConnect Job Portal...
echo Keep this window open while you use the website.
echo.
"C:\Program Files\Eclipse Adoptium\jdk-21.0.12.8-hotspot\bin\java.exe" -jar "target\jobportal-0.0.1-SNAPSHOT.jar"
echo.
echo The website has stopped. Press any key to close this window.
pause >nul
