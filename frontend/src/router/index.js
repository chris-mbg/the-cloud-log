import { createRouter, createWebHistory } from "vue-router"
import Test from "../views/Test.vue"
import Home from "../views/Home.vue"
import Login from "../views/Login.vue"
import Signup from "../views/Signup.vue"

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
    path: "/test",
    name: "Test",
    component: Test,
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
