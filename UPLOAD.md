# 📂 Fichiers à uploader pour tomclair.tech

## 🎯 Objectif
Mettre l'application météo en ligne sur le domaine `tomclair.tech`

## 📁 Structure des fichiers à uploader

### Fichiers principaux
```
tomclair.tech/
├── weather-app.html          (Application météo complète)
├── server.py                (Serveur HTTP)
└── UPLOAD.md                 (Ce fichier)
```

## 🚀 Méthodes d'upload

### Option 1: Via FTP (recommandé)
1. Connectez-vous à votre serveur FTP avec FileZilla
2. Naviguez vers le dossier `tomclair.tech/`
3. Uploadez ces 3 fichiers:
   - `weather-app.html`
   - `server.py` 
   - `UPLOAD.md`

### Option 2: Via panneau d'administration
1. Connectez-vous à votre hébergeur
2. Utilisez le gestionnaire de fichiers
3. Uploadez les 3 fichiers dans le dossier racine

### Option 3: Via cPanel
1. Ouvrir cPanel
2. Gestionnaire de fichiers → Upload
3. Sélectionner les 3 fichiers et uploader

## 🔧 Configuration nécessaire

### Après upload:
1. **Démarrer le serveur Python**:
   ```bash
   python server.py
   ```

2. **Vérifier l'accès**:
   - Local: http://localhost:8000/weather-app.html
   - Distant: http://tomclair.tech/weather-app.html

## 📱 Test de l'application

Une fois uploadée, l'application doit afficher:
- 🌤 Interface météo moderne
- 🕐 Heures progressives ("mtn", "12H", "13H", etc.)
- 📊 Prévisions sur 7 jours
- 🎨 Arrière-plan Apple iOS
- 🌡 Fuseau horaire automatique

## 🌐 URL finale

**URL publique**: `http://tomclair.tech/weather-app.html`

L'application sera accessible publiquement une fois les fichiers uploadés et le serveur démarré !

## ⚡ Rapide

1. Uploadez les 3 fichiers
2. Démarrez `python server.py` sur votre serveur
3. Accédez à http://tomclair.tech/weather-app.html

C'est tout ! Votre application météo sera en ligne 🚀
