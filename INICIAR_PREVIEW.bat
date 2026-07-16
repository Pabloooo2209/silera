@echo off
title Centro Silera - Preview local
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo No se encontro Node.js en esta computadora.
  echo Instala Node.js y vuelve a abrir este archivo.
  echo.
  pause
  exit /b 1
)

echo.
echo ================================================
echo   Centro Silera - Preview local
echo   http://127.0.0.1:4173
echo ================================================
echo.

start "" "http://127.0.0.1:4173"
node preview-server.mjs
pause
