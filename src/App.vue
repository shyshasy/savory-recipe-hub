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
              <router-link 
                class="nav-link" 
                to="/" 
                exact-active-class="active" 
                active-class="active"
              >
                <i class="fas fa-home"></i> {{ $t("home") }}
              </router-link>
            </li>
            <!-- <li class="nav-item">
              <router-link class="nav-link" to="/add-recipe">
                <i class="fas fa-plus-circle"></i> {{ $t("add_recipe") }}
              </router-link>
            </li> -->
            <li class="nav-item">
              <router-link 
                class="nav-link" 
                to="/recipe-list" 
                exact-active-class="active" 
                active-class="active"
              >
                <i class="fas fa-list"></i> {{ $t("recipe_list") }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link 
                class="nav-link" 
                to="/category-list" 
                exact-active-class="active" 
                active-class="active"
              >
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
/* Customized style for the application */
body {
  background-color: #e9f7fa; /* Softer background color for a more relaxed feel */
  font-family: "Arial", sans-serif; 
  margin: 0; /* Remove default margin */
  padding: 0; /* Remove default padding */
}

.navbar {
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  border-radius: 0.5rem; /* Rounded corners for the navbar */
}

.navbar:hover {
  background-color: #004085; /* Darker color on navbar hover */
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3); /* Stronger shadow on hover */
}

.nav-link {
  transition: color 0.3s ease, transform 0.2s ease;
  padding: 0.5rem 1rem; /* Padding for links */
  border-radius: 0.25rem; /* Rounded corners for links */
}

.nav-link:hover {
  color: #ffdd57; /* Bright yellow color on link hover */
  transform: scale(1.05); /* Slight scale effect on hover */
  background-color: rgba(255, 255, 255, 0.1); /* Subtle background on hover */
}

.nav-link.active {
  color: #ffc107; /* Active link color */
  background-color: rgba(255, 255, 255, 0.1); /* Background for active link */
}

.form-select {
  background-color: #fff; /* Background color for the select */
  border: 1px solid #007bff; /* Colored border */
  border-radius: 0.25rem; /* Rounded corners for the select */
}

.form-select:focus {
  border-color: #ffc107; /* Border color on focus */
  box-shadow: 0 0 5px rgba(255, 193, 7, 0.5); /* Shadow on focus */
}

.nav-link i {
  margin-right: 0.5rem; /* Space between icon and text */
}
</style>
