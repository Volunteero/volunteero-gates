import Vue from 'vue';
import VueSwal from 'vue-swal';
import App from './App';
import router from './router';

Vue.use(VueSwal);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
