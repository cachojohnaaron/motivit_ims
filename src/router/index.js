import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    title:'Login Page',
    path: '/',
    name: 'login',
    component: () => import('./../views/Login.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('./../views/Dashboard')
  },
  
  
  {
    path: '/assets/all',
    name: 'assets',
    component: () => import('./../views/assets/Assets.vue')
  },
  {
    path: '/assets/deployed',
    name: 'assets-deployed',
    component: () => import('./../views/assets/Assets-Deployed.vue')
  },
  {
    path: '/assets/RTD',
    name: 'assets-RTD',
    component: () => import('./../views/assets/Assets-RTD.vue')
  },
  {
    path: '/assets/archived',
    name: 'assets-archived',
    component: () => import('./../views/assets/Assets-Archived.vue')
  },
  {
    path: '/accessories/all',
    name: 'accessories',
    component: () => import('./../views/accessories/Accessories.vue')
  },
  {
    path: '/accessories/deployed',
    name: 'accessories-deployed',
    component: () => import('./../views/accessories/Accessories-Deployed.vue')
  },
  {
    path: '/accessories/archived',
    name: 'accessories-archived',
    component: () => import('./../views/accessories/Accessories-Archived.vue')
  },
  {
    path: '/licenses/all',
    name: 'licenses',
    component: () => import('./../views/licenses/Licenses.vue')
  },
  
  {
    path: '/licenses/deployed',
    name: 'licenses-deployed',
    component: () => import('./../views/licenses/Licenses-Deployed.vue')
  },
  
 
  {
    path: '/licenses/returned',
    name: 'licenses-returned',
    component: () => import('./../views/licenses/Licenses-Returned.vue')
  },
  {
    path: '/licenses/archived',
    name: 'licenses-archived',
    component: () => import('./../views/licenses/Licenses-Archived.vue')
  },
  {
    path: '/users/employees',
    name: 'users-employees',
    component: () => import('./../views/users/Users-Employees.vue')
  },
 
  {
    path: '/users-employees/archived',
    name: 'employees-archived',
    component: () => import('./../views/users/Users-Employees-Archived.vue')
  },
  //{
   // path: '/users/admin',
   // name: 'users-admin',
    //component: () => import('./../views/users/Users-Admin.vue')
  //},
  //{
   // path: '/users',
   // name: 'users',
   // component: () => import('./../views/users/Users.vue')
  //},
  
   //admin settings
   {
    path: '/admin-profile',
    name: 'admin-profile',
    component: () => import('./../views/admin/profile.vue')
  },
  {
    path: '/manage-admins',
    name: 'manage-admins',
    component: () => import('./../views/admin/Manage-Admin.vue')
  },
  {
    path: '/admin-settings',
    name: 'admin-settings',
    component: () => import('./../views/admin/admin-settings.vue')
  },


  //reports
 
  {
    path: '/reports/assets',
    name: 'reports-assets',
    component: () => import('./../views/reports/Report-Assets.vue')
  },

  {
    path: '/reports/accessories',
    name: 'reports-accessories',
    component: () => import('./../views/reports/Report-Accessories.vue')
  },
  {
    path: '/reports/licenses',
    name: 'reports-licenses',
    component: () => import('./../views/reports/Report-Licenses.vue')
  },
  

  {
    path: '/logout',
    name: 'logout',
    component: () => import('./../views/Logout.vue')
  },
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
