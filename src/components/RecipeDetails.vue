<template>
  <div class="container mt-5">
    <h2 class="text-primary mb-4 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
        <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zm0 15a7 7 0 1 1 7-7 7 7 0 0 1-7 7zm.5-6a.5.5 0 0 1-.5-.5V5a.5.5 0 0 1 1 0v3a.5.5 0 0 1-.5.5zm-.5-4a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 1 0v1a.5.5 0 0 1-.5.5z"/>
      </svg>
      Détails de la Recette
    </h2>
    
    <div v-if="recipe" class="card mb-4">
      <div class="card-body">
        <h3 class="card-title text-center">{{ recipe.title }}</h3>
        <p class="card-text"><strong>Ingrédients:</strong></p>
        <ul class="list-group mb-3">
          <li class="list-group-item" v-for="ingredient in recipe.ingredients.split(',')" :key="ingredient.trim()">
            {{ ingredient.trim() }}
          </li>
        </ul>
        <p class="card-text"><strong>Type:</strong> {{ recipe.type }}</p>
        <p class="card-text"><strong>Catégorie:</strong> {{ getCategoryTitle(recipe.id_categorie) }}</p>
      </div>
    </div>
    
    <router-link to="/recipe-list" class="btn btn-primary btn-lg mt-3">Retour à la Liste</router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRecipeStore } from '../stores/recipeStore';
import { useCategoryStore } from '../stores/categoryStore';

const route = useRoute();
const recipeStore = useRecipeStore();
const categoryStore = useCategoryStore();

const recipe = computed(() => recipeStore.getRecipeById(parseInt(route.params.id)));

const getCategoryTitle = (categoryId) => {
  const category = categoryStore.categories.find(cat => cat.categorie_id === categoryId);
  return category ? category.title : 'Catégorie inconnue';
};
</script>

<style scoped>
.container {
  background-color: #f9f9f9; 
  padding: 30px; 
  border-radius: 10px; 
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); 
  max-width: 800px; /* Limite la largeur pour une meilleure lisibilité */
  margin: auto; /* Centrer le container */
}

.card {
  border: none; /* Supprime la bordure */
  border-radius: 10px; 
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.15); 
}

.card-title {
  font-weight: 600; 
  font-size: 2rem; 
  color: #343a40; 
  margin-bottom: 20px; 
}

.card-text {
  font-size: 1.1rem; 
  color: #495057; 
  margin-bottom: 15px; 
}

.list-group-item {
  background-color: #ffffff; 
  border: 1px solid #e0e0e0; 
  transition: background-color 0.3s, box-shadow 0.3s; 
}

.list-group-item:hover {
  background-color: #f0f0f0; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Effet de profondeur au survol */
}

.btn {
  transition: background-color 0.3s, color 0.3s; 
}

.btn-primary {
  background-color: #007bff; 
  border: none; 
}

.btn-primary:hover {
  background-color: #0056b3; 
  color: #fff; 
}
</style>
