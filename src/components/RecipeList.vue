<template>
  <div class="container mt-5">
    <h2 class="text-primary mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
        <path d="M3.5 8a.5.5 0 0 1-.5-.5V6a.5.5 0 0 1 1 0v1.5a.5.5 0 0 1-.5.5zm4.5 0a.5.5 0 0 1-.5-.5V6a.5.5 0 0 1 1 0v1.5a.5.5 0 0 1-.5.5zm4.5 0a.5.5 0 0 1-.5-.5V6a.5.5 0 0 1 1 0v1.5a.5.5 0 0 1-.5.5zm-9-4a.5.5 0 0 1-.5-.5V1a.5.5 0 0 1 1 0v1.5a.5.5 0 0 1-.5.5zm4.5 0a.5.5 0 0 1-.5-.5V1a.5.5 0 0 1 1 0v1.5a.5.5 0 0 1-.5.5zm4.5 0a.5.5 0 0 1-.5-.5V1a.5.5 0 0 1 1 0v1.5a.5.5 0 0 1-.5.5zM1 5.5A.5.5 0 0 1 1.5 5h13a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H1.5a.5.5 0 0 1-.5-.5v-.5zM1 10.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H1.5a.5.5 0 0 1-.5-.5v-.5z"/>
      </svg>
      {{ $t('recipe_list_title') }}
    </h2>

    <div v-if="loading" class="alert alert-info">Chargement des recettes...</div>

    <table class="table table-bordered" v-if="!loading">
      <thead>
        <tr>
          <th>Titre</th>
          <th>Ingrédients</th>
          <th>Type</th>
          <th>Catégorie</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="recipe in recipes" :key="recipe.id">
          <td>{{ recipe.title }}</td>
          <td>{{ recipe.ingredients }}</td>
          <td>{{ recipe.type }}</td>
          <td>{{ recipe.id_categorie }}</td>
          <td>
            <router-link :to="{ name: 'recipe-details', params: { id: recipe.id } }" class="btn btn-custom" title="Détails">
              <i class="bi bi-eye"></i>
            </router-link>
            <router-link :to="{ name: 'edit-recipe', params: { id: recipe.id } }" class="btn btn-custom" title="Modifier">
              <i class="fas fa-edit" style="color: green"></i>
            </router-link>
            <button @click="handleDeleteRecipe(recipe.id)" class="btn btn-custom" title="Supprimer">
              <i class="fas fa-trash" style="color: red"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="successMessage" class="mt-4 alert alert-success">{{ successMessage }}</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRecipeStore } from '../stores/recipeStore';

const recipeStore = useRecipeStore();
const successMessage = ref('');
const loading = ref(true);

// Charger les recettes lors de la montée du composant
onMounted(async () => {
  await recipeStore.loadRecipesFromApi(); // Charger les recettes
  loading.value = false; // Fin du chargement
});

const recipes = computed(() => recipeStore.recipes);

const handleDeleteRecipe = async (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
    try {
      await recipeStore.deleteRecipe(id);
      successMessage.value = 'Recette supprimée avec succès';
      setTimeout(() => {
        successMessage.value = ''; // Efface le message après 3 secondes
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Erreur lors de la suppression de la recette."); // Gérer l'erreur ici
    }
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

.table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 10px;
  text-align: left;
}

.table th {
  background-color: #007bff;
  color: white;
}

.table tr:hover {
  background-color: #f1f1f1;
}

.btn-custom {
  border-radius: 20px;
  padding: 8px 16px;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s, color 0.3s;
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
