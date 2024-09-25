<template>
  <div class="container mt-5">
    <h2 class="text-primary mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
        <path d="M12.146 0.854a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-1.5 1.5L12.146.854zM0 11.5V16h4.5L12.146 7.854 10.646 6.354 0 11.5z"/>
      </svg>
      {{ $t('editRecipe') }}
    </h2>
    <form @submit.prevent="handleEditRecipe">
      <div class="form-group">
        <label for="title">{{ $t('title') }}</label>
        <input v-model="recipe.title" type="text" class="form-control form-control-lg" id="title" :placeholder="$t('title')" required />
      </div>
      <div class="form-group">
        <label for="ingredients">{{ $t('ingredients') }}</label>
        <textarea v-model="recipe.ingredients" class="form-control form-control-lg" id="ingredients" rows="4" :placeholder="$t('ingredients')" required></textarea>
      </div>
      <div class="form-group">
        <label for="type">{{ $t('type') }}</label>
        <select v-model="recipe.type" class="form-control form-control-lg" id="type" required>
          <option value="" disabled>{{ $t('selectType') }}</option>
          <option>{{ $t('appetizer') }}</option>
          <option>{{ $t('mainCourse') }}</option>
          <option>{{ $t('dessert') }}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary btn-lg mt-3">{{ $t('editButton') }}</button>
    </form>
    <p v-if="successMessage" class="mt-3 alert alert-success">{{ $t('successMessage') }}</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRecipeStore } from '../stores/recipeStore';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'EditRecipe',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const recipeStore = useRecipeStore();
    const recipe = ref({
      title: '',
      ingredients: '',
      type: ''
    });
    const successMessage = ref('');

    onMounted(() => {
      const recipeId = route.params.id;
      const existingRecipe = recipeStore.getRecipeById(Number(recipeId));
      if (existingRecipe) {
        recipe.value = { ...existingRecipe };
      }
    });

    function handleEditRecipe() {
      if (recipe.value.title && recipe.value.ingredients && recipe.value.type) {
        recipeStore.recipes = recipeStore.recipes.map(r => r.id === recipe.value.id ? { ...recipe.value } : r);
        successMessage.value = 'successMessage'; // Utilisez la clé pour le message
        setTimeout(() => {
          router.push({ name: 'recipe-list' });
        }, 2000); // Redirection après 2 secondes pour afficher le message de succès
      }
    }

    return { recipe, handleEditRecipe, successMessage };
  }
};
</script>

<style scoped>
/* Style spécifique pour ce composant */
</style>
