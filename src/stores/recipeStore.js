import { defineStore } from "pinia";
import axios from "axios";

export const useRecipeStore = defineStore("recipeStore", {
  state: () => ({
    recipes: [], // Liste des recettes
  }),

  actions: {
    // Charger les recettes depuis l'API
    async loadRecipesFromApi() {
      try {
        const response = await axios.get("http://localhost:4000/api/recipes");
        this.recipes = response.data; // Met à jour l'état avec les données reçues
      } catch (error) {
        console.error("Erreur lors du chargement des recettes :", error);
        this.recipes = []; // En cas d'erreur, on vide la liste
      }
    },

    // Ajouter une recette via l'API
    async addRecipe(recipe) {
      try {
        const response = await axios.post("http://localhost:4000/api/recipes", recipe);
        this.recipes.push(response.data);
        return response.data;
      } catch (error) {
        console.error("Erreur lors de l'ajout de la recette :", error.response.data); // Log détaillé de l'erreur
        throw error;
      }
    },

    // Supprimer une recette via l'API
    async deleteRecipe(id) {
      try {
        await axios.delete(`http://localhost:4000/api/recipes/${id}`);
        // Filtrer les recettes pour exclure celle supprimée
        this.recipes = this.recipes.filter(recipe => recipe.id !== id);
      } catch (error) {
        console.error("Erreur lors de la suppression de la recette :", error);
        throw error;
      }
    },

    // Mettre à jour une recette via l'API
    async updateRecipe(updatedRecipe) {
      try {
        const response = await axios.put(`http://localhost:4000/api/recipes/${updatedRecipe.id}`, updatedRecipe);
        const index = this.recipes.findIndex(recipe => recipe.id === updatedRecipe.id);
        if (index !== -1) {
          this.recipes[index] = response.data; // Mise à jour locale de la recette
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la recette :", error);
        throw error;
      }
    },

    // Obtenir une recette par ID (depuis les données locales)
    getRecipeById(id) {
      return this.recipes.find(recipe => recipe.id === id);
    }
  }
});
