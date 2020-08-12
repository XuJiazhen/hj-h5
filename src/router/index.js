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
        name: 'OwnerHome',
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
        name: 'OwnerMy',
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
  {
    path: '/consultant',
    name: 'Consultant',
    redirect: '/consultant/home',
    component: () => import('@/views/consultant/index.vue'),
    meta: {
      title: '置业顾问',
    },
    children: [
      {
        path: 'home',
        name: 'ConsultantHome',
        component: () => import('@/views/consultant/home/index.vue'),
        meta: { title: '首页' },
      },
      {
        path: 'my',
        name: 'ConsultantMy',
        component: () => import('@/views/consultant/my/index.vue'),
        meta: { title: '我的' },
      },
      {
        path: 'reported',
        name: 'Reported',
        component: () => import('@/views/consultant/reported/index.vue'),
        meta: { title: '已报备' },
      },
      {
        path: 'detail/:id',
        name: 'Detail',
        component: () => import('@/views/consultant/detail/index.vue'),
        meta: { title: '客户详情' },
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
