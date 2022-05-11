<script>
import { defineComponent } from "vue"
import { useRouter } from "vue-router"
import { useUserData } from "../providers/userProvider"
import useLogout from "../composables/useLogout"

export default defineComponent({
  setup() {
    const router = useRouter()

    const { getEmail, updateEmail, updateLocation, updateUsername } =
      useUserData()

    const handleLogout = () => {
      useLogout()

      updateEmail(null)
      updateUsername(null)
      updateLocation(null)
      router.push({ name: "Login" })
    }

    return { getEmail, handleLogout }
  }
})
</script>

<template>
  <nav
    class="flex justify-between w-full p-6 bg-primary text-neutral font-heading"
  >
    <router-link to="/">
      <font-awesome icon="cloud"></font-awesome>
      <span class="hidden ml-4 md:inline">The Cloud Log</span>
    </router-link>
    <div class="space-x-4">
      <router-link
        to="/signup"
        v-if="!getEmail && $route.path !== '/signup'"
        class="p-2 hover:border-b"
        >Sign up</router-link
      >
      <router-link
        to="/"
        v-if="!getEmail && $route.path === '/signup'"
        class="p-2 hover:border-b"
        >Login</router-link
      >
      <template v-if="getEmail">
        <router-link to="/observations" class="p-2 hover:border-b"
          >My obs</router-link
        >
        <router-link to="/new-obs" class="p-2 hover:border-b"
          >New obs</router-link
        >
        <span @click="handleLogout" class="p-2 cursor-pointer hover:border-b"
          >Logout</span
        >
      </template>
    </div>
  </nav>
</template>
