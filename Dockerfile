# Utilisation d'une image Node.js LTS
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app/server

# Copier les fichiers nécessaires
COPY package*.json .

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY . .

# Exposer le port 1001 (ou le port de votre choix)
EXPOSE 1001

# Commande pour lancer le serveur
CMD ["npm", "run", "dev"]
