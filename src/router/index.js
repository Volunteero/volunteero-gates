import Vue from 'vue';
import Router from 'vue-router';
// // Debug
// import HelloWorld from '@/components/HelloWorld';
// Landing
import Landing from '@/components/landing/Landing';
// Auth Routes
import Login from '@/components/auth/login/Login';
import Register from '@/components/auth/register/Register';
// Discover Route
import Discover from '@/components/discover/Discover';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Landing,
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
    {
      path: '/discover',
      name: 'Discover',
      component: Discover,
    },
    // redundant
    // {
    //   path: '/debug/helloworld',
    //   name: 'HelloWorld',
    //   component: HelloWorld,
    // },
  ],
});
