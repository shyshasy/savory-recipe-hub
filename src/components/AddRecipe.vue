<template>
  <div class="form-container">
    <h2>{{ $t('ajout_recette') }}</h2>

    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
    <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>

    <form @submit.prevent="handleAddRecipe" class="recipe-form">
      <div class="form-group">
        <label for="title">{{ $t('titre') }} :</label>
        <input v-model="recipe.title" type="text" id="title" class="form-control" :placeholder="$t('enter_title')" required />
      </div>

      <div class="form-group">
        <label for="ingredients">{{ $t('ingredients') }}</label>
        <textarea v-model="recipe.ingredients" id="ingredients" class="form-control" :placeholder="$t('list_ingredient')" required></textarea>
      </div>

      <div class="form-group">
        <label for="type">{{ $t('type') }} :</label>
        <select v-model="recipe.type" id="type" class="form-control" required>
          <option value="" disabled>{{ $t('chose_type') }}</option>
          <option value="Dessert">{{ $t('dessert') }}</option>
          <option value="Main Course">{{ $t('main_course') }}</option>
          <option value="Appetizer">{{ $t('appetizer') }}</option>
          <option value="Beverage">{{ $t('beverage') }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="category">{{ $t('category') }} :</label>
        <select v-model="recipe.id_categorie" id="category" class="form-control" required>
          <option value="" disabled>{{ $t('chose_category') }}</option>
          <option v-for="category in categories" :key="category.categorie_id" :value="category.categorie_id">
            {{ category.title }} 
          </option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">{{ $t('add_recipe') }}</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRecipeStore } from '../stores/recipeStore';
import { useCategoryStore } from '../stores/categoryStore'; 
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n(); // Utilisation de i18n pour la traduction

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
    console.log(t("data_to_be_sent"), recipeToSubmit); // Utilisation de t() pour la traduction
    
    recipeStore.addRecipe(recipeToSubmit)
      .then(() => {
        successMessage.value = t('recipe_added_success'); // Traduction du message de succès
        errorMessage.value = '';

        setTimeout(() => {
          router.push({ name: 'recipe-list' });
        }, 1500);

        recipe.value = { title: '', ingredients: '', type: '', id_categorie: '' };
      })
      .catch((error) => {
        if (error.response) {
          console.error(t("error_adding_recipe"), error.response.data);
          errorMessage.value = t('error_adding_recipe') + ' ' + (error.response.data.message || t('please_try_again'));
        } else if (error.request) {
          console.error(t("no_response_from_api"), error.request);
          errorMessage.value = t('server_connection_failed');
        } else {
          console.error(t("error_request_setup"), error.message);
          errorMessage.value = t('internal_error');
        }
      });
  } else {
    errorMessage.value = t('fill_required_fields'); // Message d'erreur traduit
  }
};

onMounted(fetchCategories);
</script>

<style scoped>
.form-container {
  max-width: 600px; /* Augmentation de la largeur maximale */
  margin: 30px auto;
  padding: 25px; /* Ajout de padding */
  background-color: #f0f4f8; /* Couleur de fond douce */
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Ombre plus douce */
}

h2 {
  text-align: center;
  font-family: 'Helvetica Neue', sans-serif; /* Utilisation d'une police moderne */
  font-size: 26px; /* Légère augmentation de la taille */
  color: #333;
  margin-bottom: 25px; /* Ajustement de la marge */
}

.form-group {
  margin-bottom: 20px; /* Espacement plus important */
}

label {
  font-weight: 600; /* Augmentation du poids de la police */
  display: block;
  margin-bottom: 8px; /* Ajustement de la marge */
  color: #555;
}

.form-control {
  width: 100%;
  padding: 12px; /* Augmentation du padding */
  font-size: 16px;
  border: 1px solid #ccc; /* Couleur de bordure plus douce */
  border-radius: 8px; /* Arrondi plus prononcé */
  background-color: #fff;
  transition: border-color 0.3s ease, box-shadow 0.3s ease; /* Ajout de transitions */
}

.form-control:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Ombre portée au focus */
}

.btn {
  width: 100%;
  padding: 12px; /* Augmentation du padding */
  font-size: 18px; /* Augmentation de la taille de la police */
  font-weight: bold;
  background-color: #007bff; /* Couleur de fond principale */
  color: white;
  border: none;
  border-radius: 8px; /* Arrondi plus prononcé */
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease; /* Ajout de transitions */
}

.btn:hover {
  background-color: #0056b3;
  transform: translateY(-2px); /* Effet de levée au survol */
}

.alert {
  margin-top: 20px;
  padding: 12px; /* Augmentation du padding */
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
