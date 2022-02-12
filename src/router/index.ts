import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/NameSelectionView.vue')
    },
    {
      path: '/groups',
      name: 'group',
      component: () => import('../views/GroupView.vue')
    }
  ]
})

export default router
