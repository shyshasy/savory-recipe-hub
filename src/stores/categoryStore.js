import { defineStore } from 'pinia';

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [], // Array to store categories
  }),
  actions: {
    // Method to add a category
    addCategory(name) {
      // Generate a unique ID for each added category
      const newCategory = {
        id: this.categories.length ? Math.max(...this.categories.map(cat => cat.id)) + 1 : 1, // Use max ID for uniqueness
        name,
      };
      this.categories.push(newCategory);
    },
    
    // Method to list all categories
    listCategories() {
      return this.categories;
    },

    // Method to delete a category by ID
    deleteCategory(id) {
      this.categories = this.categories.filter(category => category.id !== id);
    },

    // Method to update a category by ID
    updateCategory(id, newName) {
      const categoryIndex = this.categories.findIndex(category => category.id === id);
      if (categoryIndex !== -1) {
        this.categories[categoryIndex].name = newName;
      }
    },
  },
});
