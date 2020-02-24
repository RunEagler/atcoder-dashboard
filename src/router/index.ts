import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Problem from '@/views/Problem.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/problems',
    name: 'Problems',
    component: Problem,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
