<template>
  <div class="container mt-5">
    <h2 class="text-primary mb-4">{{ $t('category_list_title') }}</h2>

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

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useCategoryStore } from '../stores/categoryStore';

const categoryStore = useCategoryStore();
const newCategory = ref('');
const editingCategory = ref(false);
const editedCategory = ref('');
const editingIndex = ref(-1);
const successMessage = ref('');

const categories = computed(() => categoryStore.categories);

onMounted(async () => {
  await categoryStore.fetchCategories();
});

function handleAddCategory() {
  // Ajoutez ici votre logique pour ajouter une catégorie
}

function handleEditCategory(index, category) {
  // Ajoutez ici votre logique pour éditer une catégorie
}

function handleSaveCategory(index) {
  // Ajoutez ici votre logique pour sauvegarder une catégorie
}

function handleCancelEdit() {
  // Ajoutez ici votre logique pour annuler l'édition
}

function handleDeleteCategory(index) {
  // Ajoutez ici votre logique pour supprimer une catégorie
}
</script>

<style scoped>
/* Styles ici (identiques à ce que vous avez déjà) */
.container {
  background-color: #f5f5f5; /* Lighter background for modern look */
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Enhanced shadow */
}

/* Ajoutez vos styles ici */
</style>
