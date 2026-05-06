@echo off
echo ====================================
echo   MISE A JOUR AUTOMATIQUE GITHUB
echo ====================================
echo.

REM Vérifier si Git est installé
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git n'est pas installé ou pas dans le PATH
    echo Veuillez installer Git depuis https://git-scm.com/
    pause
    exit /b 1
)

REM Aller dans le dossier du projet
cd /d "C:\Users\tomg-\OneDrive\Bureau\Météo\tomclair.tech"

REM Afficher le dossier actuel
echo 📂 Dossier actuel : %CD%
echo.

REM Vérifier si c'est un dépôt Git
if not exist ".git" (
    echo ❌ Ce n'est pas un dépôt Git
    echo Initialisation du dépôt...
    git init
    git remote add origin https://github.com/tom-visionai-pro/M-t-o.git
    git branch -M main
)

REM Ajouter tous les changements
echo 📤 Ajout des fichiers modifiés...
git add .

REM Vérifier s'il y a des changements
git diff --cached --quiet
if %errorlevel% equ 0 (
    echo ✅ Aucun changement à déployer
    echo Le site est déjà à jour !
    pause
    exit /b 0
)

REM Faire le commit
echo 💾 Commit des changements...
set TIMESTAMP=%date:~-4%-%date:~-7,2%-%date:~-10,2%_%time:~0,2%h%time:~3,2%mn
git commit -m "Auto-update weather app - %TIMESTAMP%"

REM Push vers GitHub
echo 🚀 Push vers GitHub...
git push origin main

REM Vérifier le push
if %errorlevel% equ 0 (
    echo.
    echo ✅ MISE A JOUR REUSSIE !
    echo.
    echo 🌐 Votre site sera disponible dans 2-3 minutes :
    echo https://tom-visionai-pro.github.io/M-t-o/
    echo.
    echo 💡 Pour forcer la mise à jour du navigateur :
    echo    Ctrl + Shift + R
) else (
    echo.
    echo ❌ ERREUR lors du push
    echo Vérifiez votre connexion internet et vos identifiants GitHub
)

echo.
echo ====================================
echo   FIN DE LA MISE A JOUR
echo ====================================
pause
