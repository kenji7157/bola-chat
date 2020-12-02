import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';
import App from './App.vue';
import { createRouter } from '@/router';
import { createStore } from '@/store';
import vuetify from './plugins/vuetify';
import '@/firebase/firebase';

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(Router);

const store = createStore();
const router = createRouter(store);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
