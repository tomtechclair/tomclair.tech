#!/usr/bin/env python3
"""
Serveur HTTP simple pour héberger l'application météo sur tomclair.tech
"""

import http.server
import socketserver
import webbrowser
import os
from urllib.parse import urlparse

class WeatherServer:
    def __init__(self, host='0.0.0.0', port=8000):
        self.host = host
        self.port = port
        self.server = None
        
    def start(self):
        try:
            # Créer le serveur HTTP
            handler = http.server.SimpleHTTPRequestHandler
            self.server = socketserver.TCPServer((self.host, self.port), handler)
            
            print(f"🌤 Serveur météo démarré sur http://{self.host}:{self.port}")
            print(f"📱 Application accessible sur: http://localhost:{self.port}")
            print(f"🌐 Pour le domaine: http://tomclair.tech (après upload)")
            print("📂 Dossier courant:", os.getcwd())
            print("⏹ Arrêter avec Ctrl+C")
            
            # Démarrer le serveur
            self.server.serve_forever()
            
        except KeyboardInterrupt:
            print("\n⏹ Serveur arrêté")
            if self.server:
                self.server.server_close()
        except Exception as e:
            print(f"❌ Erreur: {e}")
            
    def open_browser(self):
        """Ouvrir automatiquement le navigateur"""
        try:
            webbrowser.open(f'http://localhost:{self.port}')
            print("🌐 Navigateur ouvert automatiquement")
        except:
            print("⚠️ Impossible d'ouvrir le navigateur automatiquement")

def main():
    # Vérifier si nous sommes dans le bon dossier
    if not os.path.exists('weather-app.html'):
        print("❌ Erreur: weather-app.html non trouvé dans ce dossier")
        print("📂 Vérifiez que vous êtes dans: C:\\Users\\tomg-\\OneDrive\\Bureau\\Météo\\tomclair.tech")
        return
    
    # Démarrer le serveur
    server = WeatherServer()
    
    # Ouvrir le navigateur après 2 secondes
    import threading
    import time
    
    def delayed_open():
        time.sleep(2)
        server.open_browser()
    
    # Démarrer le thread pour ouvrir le navigateur
    browser_thread = threading.Thread(target=delayed_open)
    browser_thread.daemon = True
    browser_thread.start()
    
    # Démarrer le serveur
    server.start()

if __name__ == "__main__":
    main()
