import Vue from 'vue'
import VueRouter from 'vue-router'
import UserHomeView from '../views/UserHomeView.vue'
import ManagerView from '../views/ManagerView.vue'
import LoginView from '../views/LoginView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'UserHomeView',
    component: UserHomeView
  },
  {
    path: '/manager',
    name: 'ManagerView',
    component: ManagerView
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
]

const router = new VueRouter({
  routes
})

export default router
