# 🚀 Déploiement GitHub Pages - Instructions Complètes

## 📋 Étape 1: Créer le dépôt GitHub

1. Allez sur https://github.com/tom-visionai-pro/M-t-o
2. Si le dépôt n'existe pas, créez-le :
   - Nom : `M-t-o`
   - Description : "Application météo moderne avec arrière-plan Apple iOS"
   - Public : ✅
   - Add README : ❌

## 📁 Étape 2: Uploader les fichiers

### Méthode A: Via l'interface web (recommandée)
1. Cliquez sur "Add file" → "Upload files"
2. Glissez-déposez ces fichiers :
   - `weather-final.html` → renommez-le en `index.html`
   - `DEPLOIEMENT-GITHUB.md` (ce fichier)

### Méthode B: Via GitHub Desktop
1. Ouvrez GitHub Desktop
2. Clonez le dépôt `tom-visionai-pro/M-t-o`
3. Copiez `weather-final.html` dans le dossier
4. Renommez `weather-final.html` en `index.html`
5. Commit : "Add weather app with Apple iOS background"
6. Push

## ⚙️ Étape 3: Activer GitHub Pages

1. Allez dans Settings du dépôt
2. Cliquez sur "Pages" dans le menu gauche
3. Configuration :
   - Source : "Deploy from a branch"
   - Branch : "main"
   - Folder : "/ (root)"
4. Cliquez sur "Save"

## 🌐 Étape 4: Vérifier le déploiement

1. Attendez 2-3 minutes
2. Accédez à : https://tom-visionai-pro.github.io/M-t-o/

## ✅ Résultat attendu

L'application doit afficher :
- 🌌 Arrière-plan Apple iOS avec animation d'aurore
- 🌤 Données météo réelles pour Paris
- 🕐 Heures progressives ("mtn", "17H", "18H", etc.)
- 📊 Prévisions horaires et quotidiennes
- 🎨 Design iOS-like moderne

## 🔧 Si problème persiste

### Vérifications :
1. Le fichier s'appelle bien `index.html` (pas `weather-final.html`)
2. Le fichier est à la racine du dépôt
3. GitHub Pages est activé sur la branche "main"
4. Attendez 2-3 minutes après le push

### Débogage :
- Ouvrez les outils de développement du navigateur
- Vérifiez la console pour les erreurs
- Vérifiez l'onglet Network pour les appels API

## 📱 Fichiers nécessaires

**UN SEUL FICHIER EST NÉCESSAIRE :**
- `index.html` (contenu de `weather-final.html` renommé)

Le contenu est déjà optimisé pour GitHub Pages avec :
- Pas de dépendances externes
- API Open-Meteo fonctionnelle
- Arrière-plan Apple iOS animé
- Design responsive

## 🚀 Lien final

Une fois déployé : **https://tom-visionai-pro.github.io/M-t-o/**

L'application sera immédiatement fonctionnelle !
