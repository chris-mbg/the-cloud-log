import { createRouter, createWebHistory } from "vue-router"
import Test from "../views/Test.vue"
import Home from "../views/Home.vue"
import Signup from "../views/Signup.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup
  },
  {
    path: "/test",
    name: "Test",
    component: Test
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
