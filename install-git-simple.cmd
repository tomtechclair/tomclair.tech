@echo off
echo ====================================
echo    INSTALLATION GIT - SOLUTION SIMPLE
echo ====================================
echo.

echo 🔗 Ouverture du site de téléchargement...
echo.

REM Ouvre le site de Git dans le navigateur
start https://git-scm.com/download/win

echo.
echo 📋 INSTRUCTIONS :
echo.
echo 1. La page de téléchargement Git va s'ouvrir
echo 2. Cliquez sur le bouton de téléchargement
echo 3. Exécutez le fichier téléchargé
echo 4. ⭐ IMPORTANT : Cochez "Add Git to PATH"
echo 5. Cliquez sur "Next" partout
echo 6. Cliquez sur "Install"
echo 7. Redémarrez votre ordinateur
echo.
echo 📁 Le fichier sera dans votre dossier "Téléchargements"
echo.
echo 🔄 Une fois installé, relancez "update-github.cmd"
echo.

echo Appuyez sur une touche pour ouvrir le site...
pause >nul

REM Ouvre le navigateur
start https://git-scm.com/download/win

echo ✅ Site ouvert dans votre navigateur par défaut
echo.
echo Suivez les instructions ci-dessus pour installer Git
echo.
pause
