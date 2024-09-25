# Gestion-de-recette - Application de Gestion de Recettes #

**Auteur :**

 [Aichetou Taher Sy](https://github.com/shyshasy)

Bienvenue sur **Gestion-de-recette - Application de Gestion de Recettes** ! Cette application vous permet de gérer vos recettes de cuisine préférées. Développée avec Vue.js 3, Pinia pour la gestion d'état, et Bootstrap pour le style, elle offre une expérience utilisateur fluide et moderne.

## Fonctionnalités

- **Ajouter des recettes** : Enregistrez de nouvelles recettes avec des informations détaillées.
- **Modifier des recettes** : Mettez à jour vos recettes existantes.
- **Supprimer des recettes** : Supprimez les recettes de la liste.
- **Voir la liste des recettes** : Parcourez toutes les recettes disponibles.

## Prérequis

Avant de commencer, assurez-vous d'avoir les outils suivants installés :

- [Node.js](https://nodejs.org/) (version 16+ recommandée)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/) (optionnel pour la conteneurisation)
- [Vercel CLI](https://vercel.com/download) (pour le déploiement)

## Installation

1. **Cloner le dépôt**

   ```bash
   git clone https://https://github.com/shyshasy/Gestion-de-recette
   cd Gestion-de-recette
   ```

  # Installer les dépendance#

 ````bash
  npm install
````

**Lancer l'application en mode développement**

````bash
npm run dev
````

**Accédez à l'application à**

http://localhost:5173

# Déploiement #

## Déployer sur Vercel ##

**Connexion à Vercel**

Connectez-vous à Vercel via le terminal :

```bash
vercel login
```

**Déployer l'application**

Depuis la racine du projet :


````bash
vercel --prod
````

# Utiliser Docker #

Construire l'image Docker



```bash
docker build -t shyshasy/gestion-de-recette .
```


**Exécuter le conteneur Docker en local**

````bash
docker run -p 8080:80 shyshasy/gestion-de-recette
````

**Accédez à l'application à:**

 http://localhost:8080.

**Pousser l'image sur Docker Hub**

Connectez-vous à Docker Hub :

````bash
docker login
````
**Puis poussez l'image :**

````bash
docker push shyshasy/gestion-de-recette
````
