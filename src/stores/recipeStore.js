import { defineStore } from "pinia";
import axios from "axios";

export const useRecipeStore = defineStore("recipeStore", {
  state: () => ({
    recipes: [], 
  }),

  actions: {

    async loadRecipesFromApi() {
      try {
        const response = await axios.get("http://localhost:4000/api/recipes");
        this.recipes = response.data; 
      } catch (error) {
        console.error("Erreur lors du chargement des recettes :", error);
        this.recipes = []; 
      }
    },

    async addRecipe(recipe) {
      try {
        const response = await axios.post("http://localhost:4000/api/recipes", recipe);
        this.recipes.push(response.data);
        return response.data;
      } catch (error) {
        console.error("Erreur lors de l'ajout de la recette :", error.response.data); 
        throw error;
      }
    },

    async deleteRecipe(id) {
      try {
        await axios.delete(`http://localhost:4000/api/recipes/${id}`);
        this.recipes = this.recipes.filter(recipe => recipe.id !== id);
      } catch (error) {
        console.error("Erreur lors de la suppression de la recette :", error);
        throw error;
      }
    },

    async updateRecipe(updatedRecipe) {
      try {
        const response = await axios.put(`http://localhost:4000/api/recipes/${updatedRecipe.id}`, updatedRecipe);
        const index = this.recipes.findIndex(recipe => recipe.id === updatedRecipe.id);
        if (index !== -1) {
          this.recipes[index] = response.data; 
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la recette :", error);
        throw error;
      }
    },

    getRecipeById(id) {
      return this.recipes.find(recipe => recipe.id === id);
    }
  }
});
