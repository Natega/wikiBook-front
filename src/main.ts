import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
const CKEditor = require('@ckeditor/ckeditor5-vue');

Vue.use(CKEditor);
Vue.config.productionTip = false;

Vue.directive('focus', {
  // Quand l'élément lié est inséré dans le DOM...
  inserted: function(el) {
    // L'élément prend le focus

    el.focus();
  },
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
