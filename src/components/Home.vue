<template>
  <div class="container text-center mt-5 p-4 bg-light border rounded shadow-lg">
    <h1 class="display-4 text-warning mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-cup" viewBox="0 0 16 16">
        <path d="M11 0h-6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5 1h6a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
      </svg>
      Bienvenue sur RecetteApp!
    </h1>
    <p class="lead text-dark mb-4">Découvrez, ajoutez et gérez vos recettes préférées avec une touche de fraîcheur et d'énergie.</p>

    <!-- Carousel d'images -->
    <div id="recipeCarousel" class="carousel slide mb-4" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="/images/Des-recettes-de-cuisine-pour-une-alimentation-equilibree.jpeg" class="d-block w-100 recipe-img" alt="Recette 1">
        </div>
        <div class="carousel-item">
          <img src="/images/lazane.jpeg" class="d-block w-100 recipe-img" alt="Recette 2">
        </div>
        <div class="carousel-item">
          <img src="/images/recette-poulet.webp" class="d-block w-100 recipe-img" alt="Recette 3">
        </div>
        <div class="carousel-item">
          <img src="/images/aliments-cuisine-plat.avif" class="d-block w-100 recipe-img" alt="Recette 4">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#recipeCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Précédent</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#recipeCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Suivant</span>
      </button>
    </div>

    <router-link to="/add-recipe" class="btn btn-warning btn-lg mx-2">Ajouter une Recette</router-link>
    <router-link to="/recipe-list" class="btn btn-success btn-lg mx-2">Voir Liste des Recettes</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>
/* Augmentation de la taille des images tout en maintenant l'affichage complet du contenu */
.recipe-img {
  height: 300px; /* Augmentation de la hauteur à 300px */
  object-fit: contain; /* Assure que toute l'image est visible sans être coupée */
  width: 100%;
  border-radius: 12px; /* Bordures arrondies pour un style esthétique */
  background-color: #f8f9fa; /* Ajoute un fond pour les images de tailles variables */
}

.carousel-inner {
  max-height: 300px; /* Ajustement de la hauteur maximale du carousel */
}

/* Ajustement des contrôles de navigation */
.carousel-control-prev-icon,
.carousel-control-next-icon {
  filter: invert(100%);
}
</style>
