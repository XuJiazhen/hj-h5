import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
    },
  },
  {
    path: '/report',
    name: 'Report',
    component: () => import('@/views/Report.vue'),
    meta: {
      title: '推荐',
    },
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/User.vue'),
    meta: {
      title: '我的',
    },
  },
  {
    path: '/validate',
    name: 'Validate',
    component: () => import('@/views/Validate.vue'),
    meta: {
      title: '验证',
    },
  },
  {
    path: '/owner',
    name: 'Owner',
    component: () => import('@/views/owner/index.vue'),
    meta: {
      title: '客户',
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/owner/home/index.vue'),
        meta: { title: '首页' },
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
