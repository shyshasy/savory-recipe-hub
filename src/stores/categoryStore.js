// store/category.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [], // Tableau pour stocker les catégories
    apiUrl: 'http://localhost:4000/api/categories', // Remplacez par votre URL API
  }),
  actions: {
    // Méthode pour récupérer toutes les catégories de l'API
    async fetchCategories() {
      try {
        const response = await axios.get(this.apiUrl);
        this.categories = response.data; // Assurez-vous que l'API retourne un tableau de catégories
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    },

    // Méthode pour ajouter une catégorie via l'API
    async addCategory(category) { // Changement ici pour recevoir un objet
      try {
        const response = await axios.post(this.apiUrl, { name: category.name }); // Modifié pour envoyer 'name'
        this.categories.push(response.data); // Ajouter la nouvelle catégorie à l'état
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la catégorie:', error);
      }
    },

    // Méthode pour supprimer une catégorie par ID via l'API
    async deleteCategory(id) {
      try {
        await axios.delete(`${this.apiUrl}/${id}`);
        this.categories = this.categories.filter(category => category.categorie_id !== id); // Utiliser 'categorie_id' ici
      } catch (error) {
        console.error('Erreur lors de la suppression de la catégorie:', error);
      }
    },

    // Méthode pour mettre à jour une catégorie par ID via l'API
    async updateCategory(id, newCategory) { // Changement ici pour recevoir un objet
      try {
        const response = await axios.put(`${this.apiUrl}/${id}`, { name: newCategory.name }); // Modifié pour envoyer 'name'
        const categoryIndex = this.categories.findIndex(category => category.categorie_id === id); // Utiliser 'categorie_id' ici
        if (categoryIndex !== -1) {
          this.categories[categoryIndex] = response.data; // Mettre à jour la catégorie
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la catégorie:', error);
      }
    },
  },
});
