<template>
  <div class="form-container">
    <h2>{{ $t('ajout_recette') }}</h2>

    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
    <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>

    <form @submit.prevent="handleAddRecipe" class="recipe-form">
      <div class="form-group">
        <label for="title">Titre :</label>
        <input v-model="recipe.title" type="text" id="title" class="form-control" :placeholder="$t('enter_title')" required />
      </div>

      <div class="form-group">
        <label for="ingredients">{{ $t('ingredint') }}</label>
        <textarea v-model="recipe.ingredients" id="ingredients" class="form-control" :placeholder="$t('list_ingredient')" required></textarea>
      </div>

      <div class="form-group">
        <label for="type">Type :</label>
        <select v-model="recipe.type" id="type" class="form-control" required>
          <option value="" disabled>{{ $t('chose_type') }}</option>
          <option value="Dessert">Dessert</option>
          <option value="Main Course">Plat principal</option>
          <option value="Appetizer">Entrée</option>
          <option value="Beverage">Boisson</option>
        </select>
      </div>

      <div class="form-group">
        <label for="category">Catégorie :</label>
        <select v-model="recipe.id_categorie" id="category" class="form-control" required>
          <option value="" disabled>{{ $t('chose_category') }}</option>
          <option v-for="category in categories" :key="category.categorie_id" :value="category.categorie_id">
            {{ category.title }} 
          </option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Ajouter la recette</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRecipeStore } from '../stores/recipeStore';
import { useCategoryStore } from '../stores/categoryStore'; 
import { useRouter } from 'vue-router';

const recipeStore = useRecipeStore();
const categoryStore = useCategoryStore(); 
const router = useRouter();

const recipe = ref({
  title: '',
  ingredients: '',
  type: '',
  id_categorie: ''
});

const successMessage = ref('');
const errorMessage = ref('');
const categories = ref([]); 

const fetchCategories = async () => {
  await categoryStore.fetchCategories();
  categories.value = categoryStore.categories;
};

const handleAddRecipe = () => {
  if (recipe.value.title && recipe.value.ingredients && recipe.value.type && recipe.value.id_categorie) {
    const recipeToSubmit = { ...recipe.value };
    console.log("Données à envoyer à l'API :", recipeToSubmit);
    recipeStore.addRecipe(recipeToSubmit)
      .then(() => {
        successMessage.value = 'Recette ajoutée avec succès !';
        errorMessage.value = '';
        setTimeout(() => {
          router.push({ name: 'recipe-list' });
        }, 1500);
        recipe.value = { title: '', ingredients: '', type: '', id_categorie: '' };
      })
      .catch((error) => {
        if (error.response) {
          console.error("Erreur lors de l'ajout de la recette :", error.response.data);
          errorMessage.value = 'Erreur lors de l\'ajout de la recette. ' + (error.response.data.message || 'Veuillez réessayer.');
        } else if (error.request) {
          console.error("Aucune réponse de l'API :", error.request);
          errorMessage.value = 'Impossible de se connecter au serveur. Veuillez vérifier votre connexion ou réessayer plus tard.';
        } else {
          console.error("Erreur lors de la configuration de la requête :", error.message);
          errorMessage.value = 'Erreur interne. Veuillez réessayer.';
        }
      });
  } else {
    errorMessage.value = 'Veuillez remplir tous les champs obligatoires.';
  }
};

onMounted(fetchCategories);
</script>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 30px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  font-family: 'Arial', sans-serif;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  color: #555;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  transition: border-color 0.3s ease-in-out;
}

.form-control:focus {
  border-color: #007bff;
  outline: none;
}

.btn {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.btn:hover {
  background-color: #0056b3;
}

.alert {
  margin-top: 15px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
}
</style>
