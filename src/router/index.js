import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/Home.vue')
  },
  {
    path: '/account/list',
    name: 'GameUserManager',
    component: () => import ('@/components/GameUserManager.vue')
  },
  {
    path: '/permissions',
    name: 'Permissions',
    component: () => import ('@/components/Permissions.vue')
  },
  {
    path: '/roles',
    name: 'Roles',
    component: () => import ('@/components/Roles.vue')
  },

]

const router = new VueRouter({
  routes
})

export default router
