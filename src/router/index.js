import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import AddRecipe from '../components/AddRecipe.vue';
import RecipeList from '../components/RecipeList.vue';
import RecipeDetails from '../components/RecipeDetails.vue';
import EditRecipe from '../components/EditRecipe.vue'; 

const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/add-recipe', component: AddRecipe, name: 'add-recipe' },
  { path: '/recipe-list', component: RecipeList, name: 'recipe-list' },
  { path: '/recipe-details/:id', component: RecipeDetails, name: 'recipe-details', props: true },
  { path: '/edit-recipe/:id', component: EditRecipe, name: 'edit-recipe', props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
