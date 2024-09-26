<template>
  <div class="container mt-5">
    <h2 class="text-primary mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
        <path d="M3.5 8a.5.5 0 0 1-.5-.5V6a.5.5 0 0 1 1 0v1.5a.5.5 0 0 1-.5.5zm4.5 0a.5.5 0 0 1-.5-.5V6a.5.5 0 0 1 1 0v1.5a.5.5 0 0 1-.5.5zm4.5 0a.5.5 0 0 1-.5-.5V6a.5.5 0 0 1 1 0v1.5a.5.5 0 0 1-.5.5zm-9-4a.5.5 0 0 1-.5-.5V1a.5.5 0 0 1 1 0v1.5a.5.5 0 0 1-.5.5zm4.5 0a.5.5 0 0 1-.5-.5V1a.5.5 0 0 1 1 0v1.5a.5.5 0 0 1-.5.5zm4.5 0a.5.5 0 0 1-.5-.5V1a.5.5 0 0 1 1 0v1.5a.5.5 0 0 1-.5.5zM1 5.5A.5.5 0 0 1 1.5 5h13a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H1.5a.5.5 0 0 1-.5-.5v-.5zM1 10.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H1.5a.5.5 0 0 1-.5-.5v-.5z"/>
      </svg>
      {{ $t('category_list_title') }}
    </h2>

    <div class="mb-4">
      <input v-model="newCategory" class="form-control" placeholder="Ajouter une nouvelle catégorie" />
      <button @click="handleAddCategory" class="btn btn-custom mt-2">{{ $t('add') }}</button>
    </div>

    <ul class="list-group">
      <li v-for="(category, index) in categories" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
        <span v-if="!editingCategory || editingIndex !== index">{{ category }}</span>
        <input v-else v-model="editedCategory" class="form-control form-control-sm" />

        <div class="button-group">
          <button v-if="editingCategory && editingIndex === index" @click="handleSaveCategory(index)" class="btn btn-custom btn-save">{{ $t('save') }}</button>
          <button v-if="editingCategory && editingIndex === index" @click="handleCancelEdit" class="btn btn-custom btn-cancel">{{ $t('cancel') }}</button>
          <button v-if="!editingCategory" @click="handleEditCategory(index, category)" class="btn btn-custom btn-edit">{{ $t('edit') }}</button>
          <button @click="handleDeleteCategory(index)" class="btn btn-custom btn-delete">{{ $t('delete') }}</button>
        </div>
      </li>
    </ul>

    <div v-if="successMessage" class="mt-4 alert alert-success">{{ successMessage }}</div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'CategoryList',
  setup() {
    const categories = ref(['Entrée', 'Plat Principal', 'Dessert', 'Snack', 'Boisson']);
    const successMessage = ref('');
    const newCategory = ref('');

    const editingCategory = ref(false);
    const editedCategory = ref('');
    const editingIndex = ref(-1);

    function handleAddCategory() {
      const categoryTrimmed = newCategory.value.trim();
      if (categoryTrimmed && !categories.value.includes(categoryTrimmed)) {
        categories.value.push(categoryTrimmed);
        successMessage.value = 'Catégorie ajoutée avec succès !';
        newCategory.value = ''; // Clear input field
      } else {
        successMessage.value = 'Cette catégorie existe déjà ou le champ est vide.';
      }
      setTimeout(() => successMessage.value = '', 3000);
    }

    function handleEditCategory(index, category) {
      editingCategory.value = true;
      editingIndex.value = index;
      editedCategory.value = category;
    }

    function handleSaveCategory(index) {
      if (editedCategory.value && !categories.value.includes(editedCategory.value)) {
        categories.value[index] = editedCategory.value;
        successMessage.value = 'Catégorie modifiée avec succès !';
        cancelEditing();
      } else {
        successMessage.value = 'Cette catégorie existe déjà ou le champ est vide.';
      }
      setTimeout(() => successMessage.value = '', 3000);
    }

    function handleCancelEdit() {
      cancelEditing();
    }

    function handleDeleteCategory(index) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
        categories.value.splice(index, 1);
        successMessage.value = 'Catégorie supprimée avec succès !';
        setTimeout(() => successMessage.value = '', 3000);
      }
    }

    function cancelEditing() {
      editingCategory.value = false;
      editingIndex.value = -1;
      editedCategory.value = '';
    }

    return {
      categories,
      newCategory,
      editedCategory,
      editingCategory,
      editingIndex,
      successMessage,
      handleAddCategory,
      handleEditCategory,
      handleSaveCategory,
      handleCancelEdit,
      handleDeleteCategory,
    };
  },
};
</script>

<style scoped>
.container {
  background-color: #f5f5f5; /* Lighter background for modern look */
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Enhanced shadow */
}

h2 {
  font-family: 'Arial', sans-serif; /* More modern font */
  color: #007bff; /* Brighter primary color */
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

h2 svg {
  margin-right: 10px; /* Space between icon and text */
}

.list-group {
  margin-top: 20px;
}

.list-group-item {
  border: 1px solid #ddd; /* Softer border color */
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #ffffff;
  transition: transform 0.2s, box-shadow 0.2s; /* Subtle transition effect */
}

.list-group-item:hover {
  transform: scale(1.01); /* Slight scale on hover */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow on hover */
}

.button-group {
  display: flex;
  gap: 10px;
}

.btn-custom {
  border-radius: 30px; /* More rounded buttons */
  padding: 8px 16px;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s, color 0.3s;
}

.btn-save {
  background-color: #4caf50; /* Green for save */
  border-color: #4caf50;
}

.btn-save:hover {
  background-color: #388e3c; /* Darker green on hover */
}

.btn-cancel {
  background-color: #ffc107; /* Yellow for cancel */
  border-color: #ffc107;
}

.btn-cancel:hover {
  background-color: #ffb300; /* Darker yellow on hover */
}

.btn-edit {
  background-color: #2196f3; /* Blue for edit */
  border-color: #2196f3;
}

.btn-edit:hover {
  background-color: #1976d2; /* Darker blue on hover */
}

.btn-delete {
  background-color: #f44336; /* Red for delete */
  border-color: #f44336;
}

.btn-delete:hover {
  background-color: #e53935; /* Darker red on hover */
}

.alert-success {
  background-color: #c8e6c9; /* Soft green for success */
  color: #2e7d32; /* Darker green for text */
}
</style>
