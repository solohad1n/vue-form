import { createRouter, createWebHistory } from 'vue-router'
import fillingForm from '../views/fillingForm.vue'
import sendForn from '../views/sendForm.vue'

const routes = [
  {
    path: '/',
    name: 'fillingForm',
    component: fillingForm
  },
  {
    path: '/send',
    name: 'sendForn',
    component: sendForn
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
