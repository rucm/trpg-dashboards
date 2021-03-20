import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/Index.vue')
  },
  {
    path: '/statusboard',
    name: 'StatusBoardForm',
    component: () => import('../views/statusBoard/Index.vue')
  },
  {
    path: '/statusboard/:roomId',
    name: 'StatusBoardEditor',
    component: () => import('../views/statusBoard/Editor.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  routes: routes
});

export default router;
