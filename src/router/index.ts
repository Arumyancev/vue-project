import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/today',
      name: 'today',
      component: () => import('../views/TodayView.vue'),
    },
    {
      path: '/completed',
      name: 'completed',
      component: () => import('../views/CompletedView.vue'),
    },
  ],
})

export default router
