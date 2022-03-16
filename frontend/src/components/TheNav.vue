<script>
import { useRouter } from "vue-router"
import { useUserData } from "../../providers/userProvider"
import useLogout from "../composables/useLogout"

export default {
  setup() {
    const router = useRouter()
    const { getEmail } = useUserData()

    console.log("From Nav::", getEmail.value)

    const handleLogout = () => {
      useLogout()
      router.push({ name: "Login" })
    }

    return { getEmail, handleLogout }
  }
}
</script>

<template>
  <nav
    class="flex justify-between w-full p-6 bg-primary text-neutral font-heading"
  >
    <router-link to="/">
      <font-awesome icon="cloud"></font-awesome>
      <span class="ml-4">The Cloud Log</span>
    </router-link>
    <div class="space-x-4">
      <router-link to="/signup" v-if="!getEmail">Sign up</router-link>
      <template v-if="getEmail">
        <router-link to="/observations">My obs</router-link>
        <router-link to="/new-obs">New obs</router-link>
        <span @click="handleLogout" class="cursor-pointer">Logout</span>
      </template>
    </div>
  </nav>
</template>
