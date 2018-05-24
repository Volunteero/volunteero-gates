import Vue from 'vue';
import Router from 'vue-router';
// // Debug
// import HelloWorld from '@/components/HelloWorld';
// Landing
import Landing from '@/components/landing/Landing';
// Auth Routes
import AuthBase from '@/components/auth/AuthBase';
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
      path: '/join',
      name: 'Join',
      component: AuthBase,
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
