import { defineStore } from 'pinia';

export const useRecipeStore = defineStore('recipeStore', {
  state: () => ({
    recipes: []
  }),
  actions: {
    addRecipe(recipe) {
      this.recipes.push(recipe);
    },
    getRecipeById(id) {
      return this.recipes.find(recipe => recipe.id === id);
    },
    deleteRecipe(id) {
      // Filtrez les recettes pour exclure celle qui a l'ID correspondant
      this.recipes = this.recipes.filter(recipe => recipe.id !== id);
    }
  }
});
