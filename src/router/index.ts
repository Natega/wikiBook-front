import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../pages/Home.vue';
import ListBook from '../pages/ListBook.vue';
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/book/id/:id',
    name: 'BookById',
    component: Home,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue'),
  },
  {
    path: '/book/all',
    name: 'Books',
    component: ListBook,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
