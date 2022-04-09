import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import Login from "../views/Login.vue"
import Signup from "../views/Signup.vue"
import MyObservations from "../views/MyObservations.vue"
import NewObservation from "../views/NewObservation.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/observations",
    name: "MyObservations",
    component: MyObservations,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/new-obs",
    name: "NewObservation",
    component: NewObservation,
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Route Guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!window.localStorage.getItem("access-token")) {
      return next("/login")
    } else {
      return next()
    }
  } else {
    next()
  }
})

export default router
