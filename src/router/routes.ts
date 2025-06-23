import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: 'projects', component: () => import('pages/ProjectsPage.vue') }
    ]
  },

  {
    path: '/project/:slug',
    name: 'ProjectDetail',
    component: () => import('pages/ProjectDetailPage.vue'),
    props: true
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
