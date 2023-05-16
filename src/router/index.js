import { createRouter, createWebHistory } from 'vue-router'
import Counter from '../views/counter.vue'

const routes = [
  {
    path: '/',
    name: 'counter',
    component: Counter
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
