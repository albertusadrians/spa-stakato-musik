import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from  '../views/Login.vue'
import Register from  '../views/Register.vue'
import Shop from  '../views/Shop.vue'
import Checkout from  '../views/Checkout.vue'
import History from  '../views/History.vue'

import * as firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        name: 'Home.Shop',
        component: Shop
      },
      {
        path: 'checkout',
        name: 'Home.Checkout',
        component: Checkout
      },
      {
        path: '/history',
        name: 'Home.History',
        component: History
      }
    ],
    redirect: {
      name: 'Home.Shop'
    },
    meta: {requiresAuth: true}
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }, 
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Membuat user tetap login
router.beforeEach((to,from,next)=>{
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  if(requiresAuth && !isAuthenticated){
    next("/login");
  } else {
    next();
  }
  if(to.name === "Login" && isAuthenticated){
    next({name: "Home.Shop"})
  }
})

export default router
