<template>
  <div class="container mt-5">
    <h2 class="text-primary mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
        <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zm0 15a7 7 0 1 1 7-7 7 7 0 0 1-7 7zm.5-6a.5.5 0 0 1-.5-.5V5a.5.5 0 0 1 1 0v3a.5.5 0 0 1-.5.5zm-.5-4a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 1 0v1a.5.5 0 0 1-.5.5z"/>
      </svg>
      Détails de la Recette
    </h2>
    <div v-if="recipe">
      <h3>{{ recipe.title }}</h3>
      <p><strong>Ingrédients:</strong> {{ recipe.ingredients }}</p>
      <p><strong>Type:</strong> {{ recipe.type }}</p>
    </div>
    <router-link to="/recipe-list" class="btn btn-secondary btn-lg mt-3">Retour à la Liste</router-link>
  </div>
</template>

<script>
import { useRecipeStore } from '../stores/recipeStore';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'RecipeDetails',
  setup() {
    const route = useRoute();
    const recipeStore = useRecipeStore();
    const recipe = computed(() => recipeStore.getRecipeById(parseInt(route.params.id)));

    return { recipe };
  }
};
</script>

<style scoped>
/* Le style spécifique est vide pour ce cas */
</style>
