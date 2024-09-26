<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary border-bottom border-warning border-3">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">{{ $t("RecetteApp") }}</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/">{{ $t("home") }}</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/add-recipe">{{ $t("add_recipe") }}</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/recipe-list">{{ $t("recipe_list") }}</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/category-list">{{ $t("category_list") }}</router-link>
            </li>
          </ul>

          <!-- Bouton pour changer de langue complètement à droite -->
          <select
            class="form-select ms-auto"
            @change="changeLanguage($event)"
            style="width: 80px;"
          >
            <option value="fr" :selected="$i18n.locale === 'fr'">fr</option>
            <option value="en" :selected="$i18n.locale === 'en'">en</option>
          </select>
        </div>
      </div>
    </nav>
    <div class="container mt-4">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    changeLanguage(event) {
      const newLang = event.target.value;
      this.$i18n.locale = newLang; // Changer la langue active
    },
  },
};
</script>

<style scoped>
/* Style personnalisé pour l'application */
body {
  background-color: #f0f8ff; /* Couleur de fond vive et fraîche */
  font-family: "Arial", sans-serif; /* Police moderne et propre */
}
</style>
