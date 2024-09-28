<template>
  <div class="category-list-container">
    <h2>Liste des Catégories</h2>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom de la Catégorie</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.categorie_id">
          <td>{{ category.categorie_id }}</td>
          <td>{{ category.title }}</td>
          <td>
            <button @click="editCategory(category)" class="btn btn">
              <i class="fas fa-edit" style="color: green"></i>
            </button>
            <button @click="deleteCategory(category.categorie_id)" class="btn btn-custom" title="Supprimer">
              <i class="fas fa-trash" style="color: red"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="add-category-container">
      <h2>{{ isEditing ? 'Modifier la catégorie' : 'Ajouter une nouvelle catégorie' }}</h2>
      <form @submit.prevent="isEditing ? handleUpdateCategory() : handleAddCategory()">
        <div class="form-group">
          <label for="categoryName">Nom de la Catégorie :</label>
          <input v-model="newCategory.title" type="text" id="categoryName" class="form-control" placeholder="Entrez le nom de la catégorie" required />
        </div>
        <button type="submit" class="btn" :class="isEditing ? 'btn-success' : 'btn-primary'">
          {{ isEditing ? 'Modifier la catégorie' : 'Ajouter la catégorie' }}
        </button>
        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
        <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
        <button type="button" v-if="isEditing" class="btn btn-secondary" @click="cancelEdit">Annuler</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCategoryStore } from '../stores/categoryStore'; 

const categoryStore = useCategoryStore();
const categories = ref([]); // Variable pour stocker les catégories
const newCategory = ref({ title: '' });
const successMessage = ref('');
const errorMessage = ref('');
const isEditing = ref(false); // Pour gérer l'état d'édition
const editingCategoryId = ref(null); // ID de la catégorie en cours d'édition

const fetchCategories = async () => {
  await categoryStore.fetchCategories(); // Récupérer les catégories
  categories.value = categoryStore.categories; // Mettre à jour la liste des catégories
};

const handleAddCategory = async () => {
  try {
    await categoryStore.addCategory(newCategory.value);
    successMessage.value = 'Catégorie ajoutée avec succès!';
    errorMessage.value = '';
    resetForm();
    await fetchCategories(); // Mettre à jour la liste des catégories
  } catch (error) {
    errorMessage.value = 'Erreur lors de l\'ajout de la catégorie.';
    successMessage.value = '';
  }
};

const editCategory = (category) => {
  newCategory.value = { ...category }; // Charger les données dans le formulaire
  isEditing.value = true; // Passer en mode édition
  editingCategoryId.value = category.categorie_id; // Stocker l'ID pour mise à jour
};

const handleUpdateCategory = async () => {
  try {
    await categoryStore.updateCategory(editingCategoryId.value, newCategory.value);
    successMessage.value = 'Catégorie modifiée avec succès!';
    errorMessage.value = '';
    resetForm();
    await fetchCategories(); // Mettre à jour la liste des catégories
  } catch (error) {
    errorMessage.value = 'Erreur lors de la mise à jour de la catégorie.';
    successMessage.value = '';
  }
};

const deleteCategory = async (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
    try {
      await categoryStore.deleteCategory(id);
      successMessage.value = 'Catégorie supprimée avec succès!';
      errorMessage.value = '';
      await fetchCategories(); // Récupérer à nouveau les catégories après la suppression
    } catch (error) {
      errorMessage.value = 'Erreur lors de la suppression de la catégorie.';
      successMessage.value = '';
    }
  }
};

const cancelEdit = () => {
  resetForm();
};

// Méthode pour réinitialiser le formulaire
const resetForm = () => {
  newCategory.value = { title: '' }; // Réinitialiser le formulaire
  isEditing.value = false; // Quitter le mode édition
  editingCategoryId.value = null; // Réinitialiser l'ID d'édition
};

// Charger les catégories au montage du composant
onMounted(fetchCategories);
</script>

<style scoped>
/* Vos styles ici */
</style>
