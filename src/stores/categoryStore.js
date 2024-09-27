// store/category.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [], // Array to store categories
    apiUrl: 'http://localhost:4000/api/categories', // Remplacez par votre URL API
  }),
  actions: {
    // Method to fetch all categories from API
    async fetchCategories() {
      try {
        const response = await axios.get(this.apiUrl);
        this.categories = response.data; // Assurez-vous que l'API retourne un tableau de catégories
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    },

    // Method to add a category via API
    async addCategory(name) {
      try {
        const response = await axios.post(this.apiUrl, { name });
        this.categories.push(response.data); // Ajouter la nouvelle catégorie à l'état
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la catégorie:', error);
      }
    },

    // Method to delete a category by ID via API
    async deleteCategory(id) {
      try {
        await axios.delete(`${this.apiUrl}/${id}`);
        this.categories = this.categories.filter(category => category.id !== id);
      } catch (error) {
        console.error('Erreur lors de la suppression de la catégorie:', error);
      }
    },

    // Method to update a category by ID via API
    async updateCategory(id, newName) {
      try {
        const response = await axios.put(`${this.apiUrl}/${id}`, { name: newName });
        const categoryIndex = this.categories.findIndex(category => category.id === id);
        if (categoryIndex !== -1) {
          this.categories[categoryIndex] = response.data; // Mettre à jour la catégorie
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la catégorie:', error);
      }
    },
  },
});
