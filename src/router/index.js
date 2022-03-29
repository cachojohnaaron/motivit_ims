import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('./../views/Dashboard')
  },
  {
    path: '/',
    name: 'login',
    component: () => import('./../views/Login.vue')
  },
  {
    path: '/assets',
    name: 'assets',
    component: () => import('./../views/Assets.vue')
  },
  {
    path: '/accessories',
    name: 'accessories',
    component: () => import('./../views/Accessories.vue')
  },
  {
    path: '/licenses',
    name: 'licenses',
    component: () => import('./../views/Licenses.vue')
  },
  {
    path: '/people-employees',
    name: 'people-employees',
    component: () => import('./../views/People-Employees.vue')
  },
  {
    path: '/people-admin',
    name: 'people-admin',
    component: () => import('./../views/People-Admin.vue')
  },
  {
    path: '/people',
    name: 'people',
    component: () => import('./../views/People.vue')
  },
  {
    path: '/reports-all',
    name: 'reports-all',
    component: () => import('./../views/Reports-All.vue')
  },
  {
    path: '/reports-deployed',
    name: 'reports-deployed',
    component: () => import('./../views/Reports-Deployed.vue')
  },
  {
    path: '/assets/deployed',
    name: 'assets-deployed',
    component: () => import('./../views/Assets-Deployed.vue')
  },
  {
    path: '/accessories/deployed',
    name: 'accessories-deployed',
    component: () => import('./../views/Accessories-Deployed.vue')
  },
  {
    path: '/assets/RTD',
    name: 'assets-RTD',
    component: () => import('./../views/Assets-RTD.vue')
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
