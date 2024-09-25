<template>
  <div class="container mt-5">
    <h2 class="text-primary mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
        <path d="M3.5 8a.5.5 0 0 1-.5-.5V6a.5.5 0 0 1 1 0v1.5a.5.5 0 0 1-.5.5zm4.5 0a.5.5 0 0 1-.5-.5V6a.5.5 0 0 1 1 0v1.5a.5.5 0 0 1-.5.5zm4.5 0a.5.5 0 0 1-.5-.5V6a.5.5 0 0 1 1 0v1.5a.5.5 0 0 1-.5.5zm-9-4a.5.5 0 0 1-.5-.5V1a.5.5 0 0 1 1 0v1.5a.5.5 0 0 1-.5.5zm4.5 0a.5.5 0 0 1-.5-.5V1a.5.5 0 0 1 1 0v1.5a.5.5 0 0 1-.5.5zm4.5 0a.5.5 0 0 1-.5-.5V1a.5.5 0 0 1 1 0v1.5a.5.5 0 0 1-.5.5zM1 5.5A.5.5 0 0 1 1.5 5h13a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H1.5a.5.5 0 0 1-.5-.5v-.5zM1 10.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H1.5a.5.5 0 0 1-.5-.5v-.5z"/>
      </svg>
      Liste des Recettes
    </h2>
    <ul class="list-group">
      <li v-for="recipe in recipes" :key="recipe.id" class="list-group-item d-flex justify-content-between align-items-center">
        <span>{{ recipe.title }}</span>
        <div>
          <router-link :to="{ name: 'recipe-details', params: { id: recipe.id } }" class="btn btn-custom btn-info btn-sm mx-1">Détails</router-link>
          <router-link :to="{ name: 'edit-recipe', params: { id: recipe.id } }" class="btn btn-custom btn-warning btn-sm mx-1">Modifier</router-link>
          <button @click="handleDeleteRecipe(recipe.id)" class="btn btn-custom btn-danger btn-sm mx-1">Supprimer</button>
        </div>
      </li>
    </ul>
    <div v-if="successMessage" class="mt-4 alert alert-success">{{ successMessage }}</div>
  </div>
</template>

<script>
import { useRecipeStore } from '../stores/recipeStore';
import { ref, computed } from 'vue';

export default {
  name: 'RecipeList',
  setup() {
    const recipeStore = useRecipeStore();
    const successMessage = ref('');

    function handleDeleteRecipe(id) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
    recipeStore.deleteRecipe(id);  // Appel direct de la fonction synchrone
    successMessage.value = 'Recette supprimée avec succès';
    setTimeout(() => {
      successMessage.value = ''; // Efface le message après 3 secondes
    }, 3000);
  }
}

    return { 
      recipes: computed(() => recipeStore.recipes),
      handleDeleteRecipe, 
      successMessage 
    };
  }
};
</script>

<style scoped>
.container {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  font-family: 'Comic Sans MS', cursive, sans-serif;
  color: #ff4081;
}

.list-group-item {
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #ffffff;
  transition: transform 0.3s, box-shadow 0.3s;
}

.list-group-item:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.btn-custom {
  border-radius: 20px;
  padding: 8px 16px;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s, color 0.3s;
}

.btn-info {
  background-color: #00bcd4;
  border-color: #00bcd4;
}

.btn-info:hover {
  background-color: #00acc1;
  border-color: #00acc1;
}

.btn-warning {
  background-color: #ffeb3b;
  border-color: #ffeb3b;
}

.btn-warning:hover {
  background-color: #fdd835;
  border-color: #fdd835;
}

.btn-danger {
  background-color: #f44336;
  border-color: #f44336;
}

.btn-danger:hover {
  background-color: #e53935;
  border-color: #e53935;
}

.alert-success {
  background-color: #c8e6c9;
  color: #2e7d32;
  border-color: #2e7d32;
  border-radius: 5px;
  padding: 10px;
  font-weight: bold;
}
</style>
