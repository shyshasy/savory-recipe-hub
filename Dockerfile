# Étape 1 : Construire l'application Vue.js avec Vite
FROM node:18-alpine AS build-stage

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json (ou yarn.lock)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application dans le conteneur
COPY . .

# Construire l'application pour la production
RUN npm run build

# Étape 2 : Utiliser Nginx pour servir l'application
FROM nginx:alpine AS production-stage

# Copier les fichiers construits depuis l'étape de build vers le répertoire nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Exposer le port 80 pour permettre l'accès à l'application
EXPOSE 80

# Démarrer Nginx en mode premier plan
CMD ["nginx", "-g", "daemon off;"]
