import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homeView',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/admin',
      name: 'adminView',
      component: () => import('@/views/Admin.vue'),
    },
    {
      path: '/progress',
      name: 'progressView',
      component: () => import('@/views/Progress.vue'),
    },
    {
      path: '/closed',
      name: 'ClosedView',
      component: () => import('@/views/Closed.vue'),
    },
  ],
})

export default router
