import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/login/Login';
import Register from '@/components/register/Register';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/auth/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/auth/register',
      name: 'Register',
      component: Register,
    },
  ],
});
