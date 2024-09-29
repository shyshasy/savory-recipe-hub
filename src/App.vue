<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary border-bottom border-warning border-3 shadow-sm">
      <div class="container-fluid">
        <a class="navbar-brand fw-bold" href="#">{{ $t("RecetteApp") }}</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">
                <i class="fas fa-home"></i> {{ $t("home") }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/add-recipe">
                <i class="fas fa-plus-circle"></i> {{ $t("add_recipe") }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/recipe-list">
                <i class="fas fa-list"></i> {{ $t("recipe_list") }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/category-list">
                <i class="fas fa-tags"></i> {{ $t("category_list") }}
              </router-link>
            </li>
          </ul>

          <select
            class="form-select ms-3"
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
      this.$i18n.locale = newLang; 
    },
  },
};
</script>

<style scoped>
/* Style personnalisé pour l'application */
body {
  background-color: #f0f8ff;
  font-family: "Arial", sans-serif; 
}

.navbar {
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  border-radius: 0.5rem; /* Arrondir les coins de la navbar */
}

.navbar:hover {
  background-color: #0056b3; /* Couleur au survol de la navbar */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Ombre au survol */
}

.nav-link {
  transition: color 0.3s ease, transform 0.2s ease;
  padding: 0.5rem 1rem; /* Ajout de padding pour les liens */
}

.nav-link:hover {
  color: #ffc107; /* Couleur au survol des liens */
  transform: scale(1.05); /* Légère augmentation de la taille au survol */
}

.form-select {
  background-color: #fff; /* Couleur de fond du sélecteur */
  border: 1px solid #007bff; /* Bordure colorée */
  border-radius: 0.25rem; /* Arrondir les coins du sélecteur */
}

.form-select:focus {
  border-color: #ffc107; /* Bordure au focus */
  box-shadow: 0 0 5px rgba(255, 193, 7, 0.5); /* Ombre au focus */
}

.nav-link i {
  margin-right: 0.5rem; /* Espacement entre l'icône et le texte */
}
</style>
