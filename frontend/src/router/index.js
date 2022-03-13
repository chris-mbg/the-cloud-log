import { createRouter, createWebHistory } from "vue-router"
import Test from "../views/Test.vue"
import Home from "../views/Home.vue"
import Login from "../views/Login.vue"
import Signup from "../views/Signup.vue"
// import { useUserData } from "../../providers/userProvider"

// ! Not usable
// const { getEmail } = useUserData()
// console.log("From router  ", getEmail)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
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

router.beforeEach((to, from) => {
  if (!getEmail && (to.name !== "Login" || to.name !== "Signup")) {
    return { name: "Login" }
  }
})

export default router
