<script>
import CloudButton from "../components/ui/CloudButton.vue"

export default {
  components: { CloudButton }
}
</script>

<template>
  <h1 class="my-6 text-lg text-center text-primary">
    Sign up to start register observations
  </h1>
  <form class="my-4 text-center">
    <input
      type="email"
      required
      placeholder="Email"
      class="block mx-auto my-2 rounded"
    />
    <input
      type="text"
      required
      placeholder="Username"
      class="block mx-auto my-2 rounded"
    />
    <input
      type="password"
      required
      placeholder="Password"
      class="block mx-auto my-2 rounded"
    />
    <p>Location information...</p>
    <cloud-button class="mx-auto">Sign up</cloud-button>
  </form>
</template>
