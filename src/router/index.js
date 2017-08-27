import Vue from 'vue';
import Router from 'vue-router';

import Main from '@/components/Main';
import World from '@/components/World';
import ModalAuth from '@/components/ModalAuth';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
    },
    {
      path: '/world',
      name: 'World',
      component: World,
    },
    {
      path: '/auth',
      name: 'ModalAuth',
      component: ModalAuth,
    },
  ],
});
