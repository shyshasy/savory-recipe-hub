<template>
  <div class="container mt-5">
    <h2 class="text-primary mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
        <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zm0 15a7 7 0 1 1 7-7 7 7 0 0 1-7 7zm.5-7a.5.5 0 0 1-.5-.5V4.5a.5.5 0 0 1 1 0v2.5a.5.5 0 0 1-.5.5zm-2 0a.5.5 0 0 1-.5-.5V4.5a.5.5 0 0 1 1 0v2.5a.5.5 0 0 1-.5.5zm4 0a.5.5 0 0 1-.5-.5V4.5a.5.5 0 0 1 1 0v2.5a.5.5 0 0 1-.5.5z"/>
      </svg>
      {{ $t('add_recipe') }}
    </h2>
    <form @submit.prevent="handleAddRecipe">
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
          <option value="" disabled>{{ $t('choose_type') }}</option>
          <option value="starter">{{ $t('starter') }}</option>
          <option value="main">{{ $t('main') }}</option>
          <option value="dessert">{{ $t('dessert') }}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary btn-lg mt-3">{{ $t('submit') }}</button>
    </form>
    <div v-if="successMessage" class="alert alert-success mt-3">
      {{ $t('success_message') }}
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
        successMessage.value = true;
        setTimeout(() => {
          router.push({ name: 'recipe-list' });
        }, 1500); 
        recipe.value = { title: '', ingredients: '', type: '' }; 
      }
    }

    return { recipe, handleAddRecipe, successMessage };
  }
};
</script>

<style scoped>
/* Le style spécifique est vide pour ce cas */
</style>
