import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homeView',
      component: () => import('@/views/ViewAll.vue'),
    },
    {
      path: '/myadmin',
      name: 'adminView',
      component: () => import('@/views/Admin.vue'),
    },
    {
      path: '/open',
      name: 'openView',
      component: () => import('@/views/OpenFad.vue'),
    },
    {
      path: '/progress',
      name: 'progressView',
      component: () => import('@/views/ProgressFad.vue'),
    },
    {
      path: '/closed',
      name: 'ClosedView',
      component: () => import('@/views/ClosedFad.vue'),
    },
    {
      path: '/closed/statistic',
      name: 'ClosedViewStat',
      component: () => import('@/views/ClosedFadStat.vue'),
    },
  ],
})

export default router
