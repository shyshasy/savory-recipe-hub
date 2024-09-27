<template>
  <div class="form-container">
    <h2>{{ $t('editRecipe') }}</h2>
    
    <form @submit.prevent="handleEditRecipe" class="recipe-form">
      <div class="form-group">
        <label for="title">{{ $t('title') }}</label>
        <input v-model="recipe.title" type="text" id="title" class="form-control" placeholder="{{ $t('title') }}" required />
      </div>

      <div class="form-group">
        <label for="ingredients">{{ $t('ingredients') }}</label>
        <textarea v-model="recipe.ingredients" id="ingredients" class="form-control" rows="4" placeholder="{{ $t('ingredients') }}" required></textarea>
      </div>

      <div class="form-group">
        <label for="type">{{ $t('type') }}</label>
        <select v-model="recipe.type" id="type" class="form-control" required>
          <option value="" disabled>{{ $t('selectType') }}</option>
          <option>{{ $t('appetizer') }}</option>
          <option>{{ $t('mainCourse') }}</option>
          <option>{{ $t('dessert') }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="category">{{ $t('category') }}</label>
        <select v-model="recipe.category" id="category" class="form-control" required>
          <option value="" disabled>{{ $t('selectCategory') }}</option>
          <option>Végétarien</option>
          <option>Vegan</option>
          <option>Sans gluten</option>
          <option>Épicé</option>
          <option>Douceur</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">{{ $t('editButton') }}</button>

      <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRecipeStore } from '../stores/recipeStore';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const recipeStore = useRecipeStore();
const recipe = ref({
  id: null, // Ajoutez un champ id pour stocker l'ID de la recette
  title: '',
  ingredients: '',
  type: '',
  category: ''
});
const successMessage = ref('');
const errorMessage = ref('');

onMounted(() => {
  const recipeId = route.params.id;
  const existingRecipe = recipeStore.getRecipeById(Number(recipeId));
  if (existingRecipe) {
    recipe.value = { ...existingRecipe };
  } else {
    errorMessage.value = 'Recette introuvable.';
  }
});

async function handleEditRecipe() {
  if (recipe.value.title && recipe.value.ingredients && recipe.value.type && recipe.value.category) {
    try {
      await recipeStore.updateRecipe(recipe.value); // Mettez à jour la recette via l'API
      successMessage.value = 'Recette mise à jour avec succès !';
      errorMessage.value = ''; // Réinitialiser le message d'erreur
      setTimeout(() => {
        router.push({ name: 'recipe-list' }); // Redirection après 2 secondes
      }, 2000);
    } catch (error) {
      errorMessage.value = 'Erreur lors de la mise à jour de la recette.';
    }
  } else {
    errorMessage.value = 'Veuillez remplir tous les champs obligatoires.';
  }
}
</script>


<style scoped>
/* Container du formulaire */
.form-container {
  max-width: 500px;
  margin: 30px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Titre du formulaire */
h2 {
  text-align: center;
  font-family: 'Arial', sans-serif;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

/* Groupes de champs */
.form-group {
  margin-bottom: 15px;
}

/* Labels */
label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  color: #555;
}

/* Champs de formulaire */
.form-control {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  transition: border-color 0.3s ease-in-out;
}

.form-control:focus {
  border-color: #007bff;
  outline: none;
}

/* Bouton de soumission */
.btn {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.btn:hover {
  background-color: #0056b3;
}

/* Messages d'alerte */
.alert {
  margin-top: 15px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
}
</style>
