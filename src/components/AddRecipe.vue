<template>
  <div class="container mt-5">
    <h2 class="text-primary mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
        <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zm0 15a7 7 0 1 1 7-7 7 7 0 0 1-7 7zm.5-7a.5.5 0 0 1-.5-.5V4.5a.5.5 0 0 1 1 0v2.5a.5.5 0 0 1-.5.5zm-2 0a.5.5 0 0 1-.5-.5V4.5a.5.5 0 0 1 1 0v2.5a.5.5 0 0 1-.5.5zm4 0a.5.5 0 0 1-.5-.5V4.5a.5.5 0 0 1 1 0v2.5a.5.5 0 0 1-.5.5z"/>
      </svg>
      Ajouter une Recette
    </h2>
    <form @submit.prevent="handleAddRecipe">
      <div class="form-group">
        <label for="title">Titre</label>
        <input v-model="recipe.title" type="text" class="form-control form-control-lg" id="title" placeholder="Titre de la recette" required />
      </div>
      <div class="form-group">
        <label for="ingredients">Ingrédients</label>
        <textarea v-model="recipe.ingredients" class="form-control form-control-lg" id="ingredients" rows="4" placeholder="Ingrédients" required></textarea>
      </div>
      <div class="form-group">
        <label for="type">Type</label>
        <select v-model="recipe.type" class="form-control form-control-lg" id="type" required>
          <option value="" disabled>Choisir un type</option>
          <option>Entrée</option>
          <option>Plat</option>
          <option>Dessert</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary btn-lg mt-3">Ajouter</button>
    </form>
    <!-- Affichage du message de succès -->
    <div v-if="successMessage" class="alert alert-success mt-3">
      {{ successMessage }}
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRecipeStore } from '../stores/recipeStore';
import { useRouter } from 'vue-router';

export default {
  name: 'AddRecipe',
  setup() {
    const recipeStore = useRecipeStore();
    const router = useRouter();
    const recipe = ref({
      title: '',
      ingredients: '',
      type: ''
    });
    const successMessage = ref('');

    function handleAddRecipe() {
      if (recipe.value.title && recipe.value.ingredients && recipe.value.type) {
        recipeStore.addRecipe({ ...recipe.value, id: Date.now() });
        successMessage.value = 'Recette ajoutée avec succès !';
        setTimeout(() => {
          router.push({ name: 'recipe-list' });
        }, 1500); // Redirection après 1,5 seconde
        recipe.value = { title: '', ingredients: '', type: '' }; // Réinitialiser les champs du formulaire
      }
    }

    return { recipe, handleAddRecipe, successMessage };
  }
};
</script>

<style scoped>
/* Le style spécifique est vide pour ce cas */
</style>
