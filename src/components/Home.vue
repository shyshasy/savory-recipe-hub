<template>
  <div class="container text-center mt-5 p-4 bg-light border rounded shadow-lg">
    <h1 class="display-4 text-warning mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-cup" viewBox="0 0 16 16">
        <path d="M11 0h-6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5 1h6a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
      </svg>
      {{ $t('welcome_title') }}
    </h1>
    <p class="lead text-dark mb-4">{{ $t('welcome_description') }}</p>

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
        <span class="visually-hidden">{{ $t('carousel_previous') }}</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#recipeCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">{{ $t('carousel_next') }}</span>
      </button>
    </div>

    <router-link to="/add-recipe" class="btn btn-warning btn-lg mx-2">{{ $t('add_recipe') }}</router-link>
    <router-link to="/recipe-list" class="btn btn-success btn-lg mx-2">{{ $t('view_recipe_list') }}</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>
.container {
  background-color: #f0f8ff; /* Couleur de fond douce */
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Ombre plus douce */
}

.recipe-img {
  height: 300px; 
  object-fit: cover; /* Changement de `contain` à `cover` pour remplir l'espace */
  width: 100%;
  border-radius: 12px; 
  background-color: #f8f9fa; 
  transition: transform 0.3s ease; /* Effet de transition */
}

.recipe-img:hover {
  transform: scale(1.05); /* Effet d'agrandissement au survol */
}

.carousel-inner {
  max-height: 300px; 
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  filter: invert(100%);
}

.btn {
  transition: background-color 0.3s ease; /* Transition pour le changement de couleur */
}

.btn:hover {
  opacity: 0.8; /* Réduction de l'opacité au survol */
}
</style>
