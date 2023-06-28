import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '',name:'panel', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name:'login',component: () => import('@/features/authentication/pages/AuthLogin.vue') }],
  },
  {
    path: '/test',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name:'test',component: () => import('@/features/authentication/pages/TestRequest.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
