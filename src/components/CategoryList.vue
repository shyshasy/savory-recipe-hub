<template>
  <div class="category-list-container">
    <!-- Formulaire pour ajouter/modifier une catégorie -->
    <div class="add-category-container mb-4">
      <h2>{{ isEditing ? 'Modifier la catégorie' : 'Ajouter une nouvelle catégorie' }}</h2>
      <form @submit.prevent="isEditing ? handleUpdateCategory() : handleAddCategory()">
        <div class="form-group">
          <label for="categoryName">Nom de la Catégorie :</label>
          <input 
            v-model="newCategory.title" 
            type="text" 
            id="categoryName" 
            class="form-control" 
            placeholder="Entrez le nom de la catégorie" 
            required 
          />
        </div>
        <!-- Messages d'erreur et de succès avec transitions améliorées -->
        <transition name="fade">
          <div v-if="errorMessage" class="alert alert-danger">
            <i class="fas fa-exclamation-triangle"></i> {{ errorMessage }}
          </div>
        </transition>
        <transition name="fade">
          <div v-if="successMessage" class="alert alert-success">
            <i class="fas fa-check-circle"></i> {{ successMessage }}
          </div>
        </transition>
        <!-- Boutons -->
        <div class="form-actions d-flex justify-content-between">
          <button type="submit" class="btn" :class="isEditing ? 'btn-success' : 'btn-primary'">
            <i :class="isEditing ? 'fas fa-edit' : 'fas fa-plus-circle'"></i>
            {{ isEditing ? 'Modifier' : 'Ajouter' }} la catégorie
          </button>
          <button v-if="isEditing" type="button" class="btn btn-secondary" @click="cancelEdit">
            <i class="fas fa-times"></i> Annuler
          </button>
        </div>
      </form>
    </div>

    <!-- Liste des catégories -->
    <h2 class="text-primary mb-4 d-flex align-items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-list me-2" viewBox="0 0 16 16">
        <path d="M3.5 8a.5.5 0 0 1-.5-.5V6a.5.5 0 0 1 1 0v1.5a.5.5 0 0 1-.5.5zm4.5 0a.5.5 0 0 1-.5-.5V6a.5.5 0 0 1 1 0v1.5a.5.5 0 0 1-.5.5zm4.5 0a.5.5 0 0 1-.5-.5V6a.5.5 0 0 1 1 0v1.5a.5.5 0 0 1-.5.5zm-9-4a.5.5 0 0 1-.5-.5V1a.5.5 0 0 1 1 0v1.5a.5.5 0 0 1-.5.5zm4.5 0a.5.5 0 0 1-.5-.5V1a.5.5 0 0 1 1 0v1.5a.5.5 0 0 1-.5.5zm4.5 0a.5.5 0 0 1-.5-.5V1a.5.5 0 0 1 1 0v1.5a.5.5 0 0 1-.5.5zM1 5.5A.5.5 0 0 1 1.5 5h13a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H1.5a.5.5 0 0 1-.5-.5v-.5zM1 10.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H1.5a.5.5 0 0 1-.5-.5v-.5z"/>
      </svg>
      {{ $t('category_list') }}
    </h2>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>{{ $t('category_name') }}</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.categorie_id">
          <td>{{ category.categorie_id }}</td>
          <td>{{ category.title }}</td>
          <td>
            <button @click="editCategory(category)" class="btn btn-outline-success me-2" title="Modifier">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="deleteCategory(category.categorie_id)" class="btn btn-outline-danger" title="Supprimer">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCategoryStore } from '../stores/categoryStore';

const categoryStore = useCategoryStore();
const categories = ref([]);
const newCategory = ref({ title: '' });
const successMessage = ref('');
const errorMessage = ref('');
const isEditing = ref(false);
const editingCategoryId = ref(null);

const fetchCategories = async () => {
  await categoryStore.fetchCategories();
  categories.value = categoryStore.categories;
};

const handleAddCategory = async () => {
  try {
    await categoryStore.addCategory(newCategory.value);
    successMessage.value = 'Catégorie ajoutée avec succès!';
    errorMessage.value = '';
    resetForm();
    await fetchCategories();
  } catch (error) {
    errorMessage.value = 'Erreur lors de l\'ajout de la catégorie.';
    successMessage.value = '';
  }
};

const editCategory = (category) => {
  newCategory.value = { ...category };
  isEditing.value = true;
  editingCategoryId.value = category.categorie_id;
};

const handleUpdateCategory = async () => {
  try {
    await categoryStore.updateCategory(editingCategoryId.value, newCategory.value);
    successMessage.value = 'Catégorie modifiée avec succès!';
    errorMessage.value = '';
    resetForm();
    await fetchCategories();
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
      await fetchCategories();
    } catch (error) {
      errorMessage.value = 'Erreur lors de la suppression de la catégorie.';
      successMessage.value = '';
    }
  }
};

const cancelEdit = () => {
  resetForm();
};

const resetForm = () => {
  newCategory.value = { title: '' };
  isEditing.value = false;
  editingCategoryId.value = null;
};

onMounted(fetchCategories);
</script>

<style scoped>
.form-actions {
  margin-top: 1rem;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.table {
  margin-top: 20px;
}
.category-list-container {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.form-actions .btn {
  display: flex;
  align-items: center;
  gap: 5px;
}

.table {
  width: 60%;
  margin: auto;
}

input {
  width: 40%;
}
</style>
