# 🚀 GitHub Auto-Update - Script de Déploiement Automatique

## 📁 Création du fichier batch pour mise à jour automatique

### 🎯 Objectif :
Créer un script qui met automatiquement à jour votre site https://tom-visionai-pro.github.io/M-t-o/

## 📋 Étapes manuelles (car .gitignore bloque les .bat) :

### 1. **Créer le fichier batch manuellement**
Créez un fichier nommé `update-github.bat` dans le dossier `C:\Users\tomg-\OneDrive\Bureau\Météo\tomclair.tech\`

### 2. **Contenu du fichier batch :**
```batch
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
```

### 3. **Script PowerShell alternatif**
Créez `update-github.ps1` :
```powershell
# Script PowerShell pour mise à jour GitHub
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  MISE A JOUR AUTOMATIQUE GITHUB" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier Git
try {
    git --version | Out-Null
    Write-Host "✅ Git est installé" -ForegroundColor Green
} catch {
    Write-Host "❌ Git n'est pas installé" -ForegroundColor Red
    Write-Host "Installez Git depuis https://git-scm.com/" -ForegroundColor Yellow
    Read-Host "Appuyez sur Entrée pour quitter"
    exit 1
}

# Aller dans le dossier
Set-Location "C:\Users\tomg-\OneDrive\Bureau\Météo\tomclair.tech"
Write-Host "📂 Dossier : $PWD" -ForegroundColor Blue

# Vérifier dépôt Git
if (-not (Test-Path ".git")) {
    Write-Host "❌ Pas de dépôt Git, initialisation..." -ForegroundColor Yellow
    git init
    git remote add origin https://github.com/tom-visionai-pro/M-t-o.git
    git branch -M main
}

# Ajouter les fichiers
Write-Host "📤 Ajout des fichiers..." -ForegroundColor Blue
git add .

# Vérifier les changements
$changes = git diff --cached --quiet
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Aucun changement à déployer" -ForegroundColor Green
    Write-Host "Le site est déjà à jour !" -ForegroundColor Green
    Read-Host "Appuyez sur Entrée pour quitter"
    exit 0
}

# Commit
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm"
Write-Host "💾 Commit des changements..." -ForegroundColor Blue
git commit -m "Auto-update weather app - $timestamp"

# Push
Write-Host "🚀 Push vers GitHub..." -ForegroundColor Blue
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ MISE A JOUR REUSSIE !" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 Votre site sera disponible dans 2-3 minutes :" -ForegroundColor Cyan
    Write-Host "https://tom-visionai-pro.github.io/M-t-o/" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "💡 Pour forcer la mise à jour du navigateur :" -ForegroundColor Yellow
    Write-Host "   Ctrl + Shift + R" -ForegroundColor Yellow
} else {
    Write-Host ""
    Write-Host "❌ ERREUR lors du push" -ForegroundColor Red
    Write-Host "Vérifiez votre connexion et vos identifiants GitHub" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  FIN DE LA MISE A JOUR" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Read-Host "Appuyez sur Entrée pour quitter"
```

## 🔧 Instructions d'utilisation :

### Option 1: Fichier Batch (.bat)
1. Créez `update-github.bat` avec le contenu ci-dessus
2. Double-cliquez sur le fichier
3. Le script fait tout automatiquement

### Option 2: PowerShell (.ps1)
1. Créez `update-github.ps1` avec le contenu ci-dessus
2. Faites un clic droit → "Exécuter avec PowerShell"
3. Acceptez l'exécution si demandé

### Option 3: GitHub Desktop
1. Ouvrez GitHub Desktop
2. Sélectionnez le dossier `tomclair.tech`
3. Les changements apparaissent automatiquement
4. Cliquez sur "Commit to main"
5. Cliquez sur "Push origin"

## ⚡ Automatisation complète :

### Raccourci sur le bureau
1. Créez le fichier batch
2. Faites un clic droit → "Envoyer vers" → "Bureau"
3. Renommez le raccourci "Mettre à jour le site météo"

### Exécution planifiée
1. Ouvrez le Planificateur de tâches Windows
2. Créez une nouvelle tâche
3. Déclencheur : "Quand l'utilisateur se connecte"
4. Action : Exécuter `update-github.bat`

## 🔑 Configuration GitHub :

### Première fois seulement :
```bash
git config --global user.name "tom-visionai-pro"
git config --global user.email "votre-email@example.com"
```

### Token d'accès (si nécessaire) :
1. Allez sur GitHub → Settings → Developer settings → Personal access tokens
2. Générez un token avec les droits "repo"
3. Utilisez-le comme mot de passe si demandé

## ✅ Vérification après déploiement :

1. Attendez 2-3 minutes
2. Allez sur https://tom-visionai-pro.github.io/M-t-o/
3. Forcez le cache : **Ctrl + Shift + R**
4. Vérifiez que les changements sont visibles

## 🚨 Dépannage :

### Si erreur "Git not found" :
- Installez Git depuis https://git-scm.com/
- Redémarrez votre ordinateur

### Si erreur d'authentification :
- Configurez vos identifiants GitHub
- Utilisez GitHub Desktop plus simple

### Si erreur de push :
- Vérifiez votre connexion internet
- Vérifiez que vous avez les droits sur le dépôt

## 📱 Résultat final :

Un clic sur le fichier met automatiquement à jour :
- ✅ Tous les changements locaux
- ✅ Commit avec timestamp
- ✅ Push vers GitHub
- ✅ Site mis à jour en 2-3 minutes
