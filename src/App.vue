<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary border-bottom border-warning border-3">
      <div class="container-fluid"> <!-- Utiliser container-fluid pour étendre sur toute la largeur -->
        <a class="navbar-brand" href="#">RecetteApp</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Accueil</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/add-recipe">Ajouter</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/recipe-list">Liste des Recettes</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container mt-4">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
/* Style personnalisé pour l'application */
body {
  background-color: #f0f8ff; /* Couleur de fond vive et fraîche */
  font-family: 'Arial', sans-serif; /* Police moderne et propre */
}
</style>
