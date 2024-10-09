<template>
  <div class="container mt-5">
    <h2 class="text-primary mb-4 d-flex align-items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        fill="currentColor"
        class="bi bi-list me-3"
        viewBox="0 0 16 16"
      >
        <path
          d="M3.5 8a.5.5 0 0 1-.5-.5V6a.5.5 0 0 1 1 0v1.5a.5.5 0 0 1-.5.5zm4.5 0a.5.5 0 0 1-.5-.5V6a.5.5 0 0 1 1 0v1.5a.5.5 0 0 1-.5.5zm4.5 0a.5.5 0 0 1-.5-.5V6a.5.5 0 0 1 1 0v1.5a.5.5 0 0 1-.5.5zm-9-4a.5.5 0 0 1-.5-.5V1a.5.5 0 0 1 1 0v1.5a.5.5 0 0 1-.5.5zm4.5 0a.5.5 0 0 1-.5-.5V1a.5.5 0 0 1 1 0v1.5a.5.5 0 0 1-.5.5zm4.5 0a.5.5 0 0 1-.5-.5V1a.5.5 0 0 1 1 0v1.5a.5.5 0 0 1-.5.5zM1 5.5A.5.5 0 0 1 1.5 5h13a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H1.5a.5.5 0 0 1-.5-.5v-.5zM1 10.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H1.5a.5.5 0 0 1-.5-.5v-.5z"
        />
      </svg>
      {{ $t("recipe_list_title") }}
    </h2>

    <router-link to="/add-recipe" class="btn btn-primary mb-3 btn-custom">
      <i class="bi bi-plus-circle"></i> {{ $t("add_recipe") }}
    </router-link>

    <input
      type="text"
      v-model="searchQuery"
      :placeholder="$t('search_recipe')"
      class="form-control mb-4 search-input"
    />

    <div v-if="loading" class="alert alert-info">{{ $t("charge_recip") }}</div>
    <div v-if="successMessage" class="mt-4 alert alert-success">
      {{ successMessage }}
    </div>

    <table
      class="table table-bordered table-hover table-custom"
      v-if="!loading && filteredRecipes.length"
    >
      <thead class="table-primary">
        <tr>
          <th>{{ $t("title") }}</th>
          <th>{{ $t("ingredients") }}</th>
          <th>{{ $t("type") }}</th>
          <th>Catégorie</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="recipe in filteredRecipes" :key="recipe.id">
          <td>{{ recipe.title }}</td>
          <td>{{ recipe.ingredients }}</td>
          <td>{{ recipe.type }}</td>
          <td>{{ getCategoryTitle(recipe.id_categorie) }}</td>
          <td class="text-center">
            <router-link
              :to="{ name: 'recipe-details', params: { id: recipe.id } }"
              class="btn btn-outline-info me-2"
              title="Voir"
            >
              <i class="fas fa-eye"></i>
            </router-link>

            <router-link
              :to="{ name: 'edit-recipe', params: { id: recipe.id } }"
              class="btn btn-outline-success me-2"
              title="Modifier"
            >
              <i class="fas fa-edit"></i>
            </router-link>

            <button
              @click="handleDeleteRecipe(recipe.id)"
              class="btn btn-outline-danger"
              title="Supprimer"
            >
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="!loading && !filteredRecipes.length" class="alert alert-warning">
      {{ $t("Aucune_correspond") }}
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from "vue";
import { useRecipeStore } from "../stores/recipeStore";
import { useCategoryStore } from "../stores/categoryStore";
import { useI18n } from "vue-i18n";

const { t } = useI18n(); 

const recipeStore = useRecipeStore();
const categoryStore = useCategoryStore();
const searchQuery = ref("");
const successMessage = ref("");
const loading = ref(true);

onMounted(async () => {
  await recipeStore.loadRecipesFromApi();
  await categoryStore.fetchCategories();
  loading.value = false;
});

const recipes = computed(() => recipeStore.recipes);
const categories = computed(() => categoryStore.categories);

const filteredRecipes = computed(() => {
  return recipes.value.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const getCategoryTitle = (categoryId) => {
  const category = categories.value.find(
    (cat) => cat.categorie_id === categoryId
  );
  return category ? category.title : t("unknownCategory"); // Utiliser $t pour traduire
};

const handleDeleteRecipe = async (id) => {
  if (confirm(t("confirmDelete"))) { // Utiliser $t pour traduire
    try {
      await recipeStore.deleteRecipe(id);
      successMessage.value = t("successDelete"); // Utiliser $t pour traduire
      setTimeout(() => {
        successMessage.value = "";
      }, 3000);
    } catch (error) {
      console.error(t("errorDelete"), error); // Utiliser $t pour traduire
      alert(t("errorDelete")); // Utiliser $t pour traduire
    }
  }
};
</script>


<style scoped>
.container {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  font-family: "Montserrat", sans-serif;
  font-size: 2rem;
}

.btn-custom {
  background-color: #007bff;
  color: white;
  font-size: 1.2rem;
  padding: 10px 20px;
  border-radius: 5px;
}

.btn-custom:hover {
  background-color: #0056b3;
}

.search-input {
  border-radius: 25px;
  padding: 10px 20px;
  border: 1px solid #ddd;
  max-width: 400px;
  font-size: 1rem;
  margin: 0 auto;
}

.search-input:focus {
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  border-color: #007bff;
}

.table-custom {
  border-radius: 8px;
  overflow: hidden;
}

.table-hover tbody tr:hover {
  background-color: #f1f1f1;
}

.table-primary {
  background-color: #007bff;
  color: white;
}

.alert {
  border-radius: 5px;
}

.btn-outline-info:hover {
  background-color: #17a2b8;
  color: white;
}

.btn-outline-success:hover {
  background-color: #28a745;
  color: white;
}

.btn-outline-danger:hover {
  background-color: #dc3545;
  color: white;
}

.text-center {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
