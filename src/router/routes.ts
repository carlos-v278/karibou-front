import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '',name:'dwelling', component: () => import('src/features/dwelling/pages/IndexPage.vue') }],
  },
  {
    path: '/buildings',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',name:'all_advertisements', component: () => import('@/features/advertisements/pages/AdvertisementsIndex.vue') },
      { path: ':id/annonces',name:'buidling_advertisements', component: () => import('@/features/advertisements/pages/BuildingAdvertisements.vue') }
    ],
  },
  {
    path: '/messages',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',name:'all_conversations', component: () => import('@/features/messaging/pages/MessagingIndex.vue') },
    ],
  },

  {
    path: '/connexion',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name:'login',component: () => import('@/features/authentication/pages/AuthLogin.vue') }],
  },
  {
    path: '/deconnexion',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name:'logout',component: () => import('@/features/authentication/pages/AuthLogout.vue') }],
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
