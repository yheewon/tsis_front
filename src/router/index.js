import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/seat',
    name: 'Seat',
    props : true,
    component: () => import(/* webpackChunkName: "about" */ '../views/Seat.vue')
  },
  {
    path: '/reservation',
    name: 'Reservation',
    props : true,
    component: () => import(/* webpackChunkName: "about" */ '../views/Reservation.vue')
  },
  {
    path: '/ckreservation',
    name: 'CkReservation',
    props : true,
    component: () => import(/* webpackChunkName: "about" */ '../views/CheckReservation.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
