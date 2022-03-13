<script>
import { useUserData } from "../../providers/userProvider"

export default {
  setup() {
    const { getEmail } = useUserData()

    console.log("From Nav::", getEmail.value)

    return { getEmail }
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
        <router-link to="/logout">Logout</router-link>
      </template>
    </div>
  </nav>
</template>
