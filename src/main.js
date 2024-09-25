import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importez les styles de Bootstrap
import 'bootstrap'; // Importez les composants JavaScript de Bootstrap si nécess

import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    welcome: 'Welcome',
    hello: 'Hello World!',
    goodbye: 'Goodbye',
  },
  fr: {
    welcome: 'Bienvenue',
    hello: 'Bonjour le monde !',
    goodbye: 'Au revoir',
  },
};

const i18n = createI18n({
  locale: 'en', 
  fallbackLocale: 'en', 
  messages, 
});

export default i18n;


const app = createApp(App);

app.use(router);
app.use(createPinia());
app.mount('#app');
