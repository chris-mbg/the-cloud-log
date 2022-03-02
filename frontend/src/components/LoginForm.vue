<script>
import CloudButton from "../components/ui/CloudButton.vue"

export default {
  components: { CloudButton }
}
</script>

<template>
  <form class="text-center">
    <input
      type="email"
      required
      placeholder="Email"
      class="block mx-auto my-2 rounded"
    />
    <input
      type="password"
      required
      placeholder="Password"
      class="block mx-auto my-2 rounded"
    />
    <cloud-button class="mx-auto">Login</cloud-button>
    <p class="my-4 text-sm">
      Not registered?
      <router-link to="/signup" class="underline">Sign up here</router-link>
    </p>
  </form>
</template>
