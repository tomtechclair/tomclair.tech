# 🔧 Installation Git pour Windows

## 🚨 Problème :
Git n'est pas installé ou pas dans le PATH Windows

## ✅ Solution rapide :

### Option 1: Téléchargement direct
1. Allez sur https://git-scm.com/download/win
2. Téléchargez Git pour Windows
3. Exécutez le fichier d'installation
4. Acceptez toutes les options par défaut
5. **IMPORTANT** : Cochez "Add Git to PATH" pendant l'installation

### Option 2: Installation automatique
```cmd
# Télécharge et installe Git automatiquement
powershell -Command "& {Invoke-WebRequest -Uri 'https://github.com/git-for-windows/git/releases/download/v2.39.0.windows.2/Git-2.39.0.2-64-bit.exe' -OutFile 'git-installer.exe'; Start-Process 'git-installer.exe' -Wait}"
```

## 📋 Étapes d'installation détaillées :

### 1. **Téléchargement**
- Visitez : https://git-scm.com/
- Cliquez sur "Download for Windows"
- Enregistrez le fichier

### 2. **Installation**
- Double-cliquez sur le fichier `.exe`
- Cliquez sur "Run" si demandé
- **IMPORTANT** : Cochez "Add Git to PATH"
- Cliquez "Next" sur tous les écrains
- Cliquez "Install"
- Cliquez "Finish"

### 3. **Vérification**
Ouvrez une nouvelle fenêtre CMD et tapez :
```cmd
git --version
```

## 🔧 Script d'installation automatique

Créez un fichier `install-git.cmd` :
```cmd
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
```

## 🔄 Après installation :

### 1. **Redémarrez** votre ordinateur
OU ouvrez une nouvelle fenêtre CMD

### 2. **Testez** l'installation :
```cmd
git --version
```

### 3. **Configurez** Git :
```cmd
git config --global user.name "tom-visionai-pro"
git config --global user.email "votre-email@example.com"
```

### 4. **Relancez** le script de mise à jour :
Double-cliquez sur `update-github.cmd`

## 🚀 Alternative : GitHub Desktop

Si Git pose problème, utilisez GitHub Desktop :

1. **Téléchargez** : https://desktop.github.com/
2. **Installez** GitHub Desktop
3. **Ouvrez** le dossier `tomclair.tech`
4. **Les changements** apparaissent automatiquement
5. **Commit** → **Push** en un clic

## 📱 Vérification finale :

Après installation de Git :
1. Ouvrez une nouvelle CMD
2. Tapez `git --version`
3. Vous devriez voir : `git version x.x.x`

## ✅ Résultat attendu :

Une fois Git installé, le script `update-github.cmd` fonctionnera parfaitement et mettra à jour votre site automatiquement !
