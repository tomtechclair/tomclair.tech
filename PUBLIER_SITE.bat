@echo off
echo ===================================
echo   PUBLICATION DU SITE JARVIS
echo   sur GitHub Pages
echo ===================================
echo.

REM Vérifier si Git est installé
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERREUR] Git n'est pas installé !
    echo Télécharge-le ici : https://git-scm.com/download/win
    pause
    exit /b 1
)

REM Demander le pseudo GitHub
set /p pseudo=Entre ton pseudo GitHub: 

REM Initialiser Git
echo.
echo [1/5] Initialisation de Git...
git init

REM Ajouter tous les fichiers
echo [2/5] Ajout des fichiers...
git add .

REM Premier commit
echo [3/5] Création du commit...
git commit -m "Initial commit - Jarvis site"

REM Ajouter le dépôt distant
echo [4/5] Connexion à GitHub...
git remote add origin https://github.com/%pseudo%/tomclair.tech.git

REM Pousser vers GitHub
echo [5/5] Envoi vers GitHub...
git push -u origin main

echo.
echo ===================================
echo   SUCCÈS ! Ton site est en ligne
echo   https://%pseudo%.github.io/tomclair.tech
echo ===================================
echo.
echo N'oublie pas d'activer GitHub Pages dans les paramètres du dépôt !
pause
