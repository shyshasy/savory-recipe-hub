import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import en from './locales/en.json';
import fr from './locales/fr.json';

const i18n = createI18n({
  locale: 'fr', 
  fallbackLocale: 'en', 
  messages: {
    en,
    fr
  }
});

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(i18n);
app.mount('#app');
