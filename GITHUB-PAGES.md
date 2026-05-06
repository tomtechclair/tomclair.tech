# 🚀 Déploiement GitHub Pages pour Weather App

## Problème actuel
Le site https://tom-visionai-pro.github.io/M-t-o/ retourne "404 Not Found"

## Solution rapide

### 1. Créer le dépôt GitHub
```bash
# Dans votre terminal Git
git clone https://github.com/tom-visionai-pro/M-t-o.git
cd M-t-o
```

### 2. Copier les fichiers
Copiez le fichier `weather.html` dans le dossier `M-t-o/`

### 3. Commit et Push
```bash
git add weather.html
git commit -m "Add weather app with Apple iOS background"
git push origin main
```

### 4. Activer GitHub Pages
1. Allez sur https://github.com/tom-visionai-pro/M-t-o
2. Cliquez sur "Settings"
3. Allez dans "Pages"
4. Source : "Deploy from a branch"
5. Branch : "main"
6. Folder : "/ (root)"
7. Cliquez sur "Save"

### 5. Attendre le déploiement
GitHub Pages va déployer automatiquement votre application.

## URL finale
https://tom-visionai-pro.github.io/M-t-o/

## Fichiers nécessaires
- ✅ `weather.html` (application météo complète)
- ✅ `README.md` (documentation)

## Vérification
Après déploiement, vérifiez :
1. https://tom-visionai-pro.github.io/M-t-o/
2. L'arrière-plan Apple iOS doit être animé
3. Les heures doivent afficher "mtn", "17H", etc.
4. Les prévisions météo doivent fonctionner

## Support
Si problème persiste :
- Vérifiez que le fichier `weather.html` est bien à la racine
- Attendez 2-3 minutes après le push pour le déploiement
- Rafraîchissez la page GitHub Pages

L'application sera fonctionnelle avec l'arrière-plan Apple iOS ! 🌌
