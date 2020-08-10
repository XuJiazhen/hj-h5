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
    redirect: '/owner/home',
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
      {
        path: 'recommend',
        name: 'Recommend',
        component: () => import('@/views/owner/recommend/index.vue'),
        meta: { title: '推荐' },
      },
      {
        path: 'my',
        name: 'My',
        component: () => import('@/views/owner/my/index.vue'),
        meta: { title: '我的' },
      },
      {
        path: 'client',
        name: 'Client',
        component: () => import('@/views/owner/client/index.vue'),
        meta: { title: '客户' },
      },
      {
        path: 'clinch',
        name: 'Clinch',
        component: () => import('@/views/owner/clinch/index.vue'),
        meta: { title: '成交' },
      },
      {
        path: 'message',
        name: 'Message',
        component: () => import('@/views/owner/message/index.vue'),
        meta: { title: '消息' },
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
