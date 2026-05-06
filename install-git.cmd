@echo off
echo ====================================
echo    INSTALLATION AUTOMATIQUE GIT
echo ====================================
echo.

REM Télécharger Git
echo 📥 Téléchargement de Git...
powershell -Command "& {Invoke-WebRequest -Uri 'https://github.com/git-for-windows/git/releases/download/v2.39.0.windows.2/Git-2.39.0.2-64-bit.exe' -OutFile 'git-installer.exe'}"

if not exist "git-installer.exe" (
    echo ❌ Erreur de téléchargement
    pause
    exit /b 1
)

REM Installer Git
echo 📦 Installation de Git...
start /wait git-installer.exe /VERYSILENT /NORESTART

REM Nettoyer
del git-installer.exe

REM Vérifier
echo 🔍 Vérification de l'installation...
git --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Git installé avec succès !
    echo.
    echo 🔄 Redémarrez votre ordinateur pour finaliser
    echo    ou ouvrez une nouvelle fenêtre CMD
) else (
    echo ❌ Erreur lors de l'installation
    echo Veuillez installer Git manuellement
)

echo.
pause
