import Vue from 'vue';
import VueCookie from 'vue-cookie';
import App from './App';
import router from './router';


Vue.config.productionTip = false;

Vue.use(VueCookie);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
